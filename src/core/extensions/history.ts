import { FatsoExtension } from '.'
import { history, undo, redo } from 'prosemirror-history'

export default function histroyExtension(): FatsoExtension {
  return {
    type: 'extension',
    name: 'histroy',

    commands({ view }) {
      return {
        undo: {
          active: () => false,
          disabled: () => !undo(view.state),
          run: () => undo(view.state, view.dispatch),
        },
        redo: {
          active: () => false,
          disabled: () => !redo(view.state),
          run: () => redo(view.state, view.dispatch),
        },
      }
    },

    keymaps() {
      return {
        'Mod-z': undo,
        'Mod-Shift-z': redo,
      }
    },

    plugins() {
      return [history()]
    },
  }
}
