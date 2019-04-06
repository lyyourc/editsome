import { FatsoMark } from '..'
import { toggleMark, setBlockType } from 'prosemirror-commands'

export default function BoldMark(): FatsoMark {
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
      return () => toggleMark(schema.marks.bold)(view.state, view.dispatch)
    },
  }
}
