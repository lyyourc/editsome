import { Node } from '..'
import isNodeActive from '../../utils/isNodeActive'
import toggleWrap from '../../commands/toggleWrap';
import { wrappingInputRule } from 'prosemirror-inputrules';

export default function blockquoteNode(): Node {
  return {
    type: 'node',
    name: 'blockquote',
    schema: {
      content: 'block+',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'blockquote' }],
      toDOM: () => ['blockquote', 0],
    },

    command({ schema, view }) {
      const type = schema.nodes.blockquote

      return {
        active: () => isNodeActive({ type, state: view.state }),
        run: () => {
          return toggleWrap(type)(view.state, view.dispatch)
        },
      }
    },

    keymaps({ schema }) {
      return {
        'Mod->': toggleWrap(schema.nodes.blockquote),
      }
    },

    inputRules({ schema }) {
      return [
        wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote)
      ]
    }
  }
}
