import { Node } from '..'
import isNodeActive from '../../utils/isNodeActive';
import toggleList from '../../commands/toggleList';

export default function bulletListNode(): Node {
  return {
    type: 'node',
    name: 'bulletList',
    // https://github.com/ProseMirror/prosemirror-schema-list/blob/master/src/schema-list.js#L11
    schema: {
      content: 'listItem+',
      group: 'block',
      parseDOM: [{ tag: 'ul' }],
      toDOM: () => ['ul', 0],
    },

    command({ schema, view }) {
      const type = schema.nodes.bulletList 

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
