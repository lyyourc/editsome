import { Mark } from '..'
import { toggleMark } from 'prosemirror-commands'
import isMarkActive from '../../utils/isMarkActive'
import { Plugin, TextSelection } from 'prosemirror-state'
import getMarkRange from '../../utils/getMarkRange'
import updateMark from '../../commands/updateMark'
import removeMark from '../../commands/removeMark'

export default function linkMark(): Mark {
  return {
    type: 'mark',
    name: 'link',
    schema: {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs(dom) {
            return {
              href: (dom as Element).getAttribute('href'),
              title: (dom as Element).getAttribute('title'),
            }
          },
        },
      ],
      toDOM(node) {
        return ['a', node.attrs, 0]
      },
    },

    command({ view, schema }) {
      const type = schema.marks.link

      return {
        active: () => isMarkActive({ type, state: view.state }),
        run: attrs => {
          if (attrs) {
            return updateMark(type, attrs)(view.state, view.dispatch)
          }

          return removeMark(type)(view.state, view.dispatch)
        },
      }
    },

    plugins() {
      return [
        new Plugin({
          props: {
            // handleDOMEvents: {
            //   mouseover: (view, event) => {
            //     const coordinates = view.posAtCoords({
            //       left: (event as MouseEvent).clientX,
            //       top: (event as MouseEvent).clientY,
            //     })
            //     console.log(coordinates, event.target)
            //     return true
            //   },
            // },
            handleClick(view, pos) {
              const { schema, doc, tr } = view.state
              const range = getMarkRange(doc.resolve(pos), schema.marks.link)

              if (!range) {
                return false
              }

              const $start = doc.resolve(range.from)
              const $end = doc.resolve(range.to)
              const transaction = tr.setSelection(
                new TextSelection($start, $end)
              )

              view.dispatch(transaction)
              return true
            },
          },
        }),
      ]
    },
  }
}
