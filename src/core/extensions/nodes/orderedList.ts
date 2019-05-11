import { Node } from '..'
import toggleList from '../../commands/toggleList';
import isNodeActive from '../../utils/isNodeActive';

export default function orderListNode(): Node {
  return {
    type: 'node',
    name: 'orderedList',
    // https://github.com/ProseMirror/prosemirror-schema-list/blob/master/src/schema-list.js#L11
    schema: {
      attrs: {
        order: {
          default: 1,
        },
      },
      content: 'listItem+',
      group: 'block',
      parseDOM: [
        {
          tag: 'ol',
          getAttrs: dom => {
            const start = (dom as Element).hasAttribute('start')
            return {
              order: start ? +start : 1,
            }
          },
        },
      ],
      toDOM: node =>
        node.attrs.order === 1
          ? ['ol', 0]
          : ['ol', { start: node.attrs.order }, 0],
    },

    command({ schema, view }) {
      const type = schema.nodes.orderedList

      return {
        active: () => {
          return isNodeActive({ type, state: view.state })
        },
        run: () => {
          toggleList(type, schema.nodes.listItem)(view.state, view.dispatch)
        },
      }
    },

  }
}
