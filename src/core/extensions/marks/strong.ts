import { FatsoMark } from "..";
import { toggleMark, setBlockType } from 'prosemirror-commands'

export default function Strong(): FatsoMark {
  return {
    type: 'mark',
    name: 'strong',
    schema: {
      toDOM() {
        return ['strong', 0]
      }
    },
    command({ view, schema }) {
      return toggleMark(schema.marks.strong)(view.state, view.dispatch)
    },
  }
}
