import { FatsoMark } from '..'
import { toggleMark } from 'prosemirror-commands';
import isMarkActive from '../../utils/isMarkActive';

export default function linkMark(): FatsoMark {
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
        run: (attrs) => {
          toggleMark(type, attrs)(view.state, view.dispatch)
        }
      }
    }
  }
}
