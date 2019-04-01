import { toggleMark, setBlockType } from 'prosemirror-commands'
import { EditorView } from 'prosemirror-view'
import { Schema } from 'prosemirror-model'

export type Commands = {
  strong: () => any
  heading: ({ level }: { level: number}) => any
}

export default function createCommands({
  view,
  schema,
}: {
  view: EditorView
  schema: Schema
}): Commands {
  return {
    strong,
    heading: function({ level }) {
      setBlockType(schema.nodes.heading, { level })(view.state, view.dispatch)
    },
  }

  function strong() {
    toggleMark(schema.marks.strong)(view.state, view.dispatch)
  }
}
