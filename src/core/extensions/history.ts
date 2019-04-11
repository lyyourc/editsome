import { FatsoExtension } from '.'
import { history, undo, redo } from 'prosemirror-history'

export default function histroyExtension(): FatsoExtension {
  return {
    type: 'extension',
    name: 'histry',
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
