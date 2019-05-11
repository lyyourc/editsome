import { Node } from '..'
import { chainCommands, exitCode } from 'prosemirror-commands'

export default function hardbreakNode(): Node {
  return {
    type: 'node',
    name: 'hardbreak',
    schema: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return ['br']
      },
    },
    keymaps({ schema }) {
      const type = schema.nodes.hardbreak

      const command = chainCommands(exitCode, (state, dispatch) => {
        if (dispatch) {
          dispatch(
            state.tr.replaceSelectionWith(type.create()).scrollIntoView()
          )
          return true
        }
        return false
      })

      return {
        'Mod-Enter': command,
        'Shift-Enter': command,
      }
    },
  }
}
