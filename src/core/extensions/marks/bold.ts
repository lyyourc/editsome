import { FatsoMark } from '..'
import { toggleMark, setBlockType } from 'prosemirror-commands'
import isMarkActive from '../../utils/isMarkActive';

export default function boldMark(): FatsoMark {
  return {
    type: 'mark',
    name: 'bold',
    schema: {
      toDOM() {
        return ['strong', 0]
      },
      parseDOM: [
        {
          tag: 'strong',
        },
      ],
    },
    command({ view, schema }) {
      return {
        active: () => {
          return isMarkActive({ type: schema.marks.bold, state: view.state })
        },
        run: () => {
          return toggleMark(schema.marks.bold)(view.state, view.dispatch)
        }
      }
    },

    keymaps({ schema }) {
      return {
        'Mod-b': toggleMark(schema.marks.bold),
        'Mod-B': toggleMark(schema.marks.bold),
      }
    },
  }
}
