import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { exampleSetup } from 'prosemirror-example-setup'

export const EditorSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
})

export function Editor(el: HTMLElement, content: string) {
  const contentElement = document.createElement('div')
  contentElement.innerHTML = content.trim()

  const state =  EditorState.create({
    // schema,
    doc: DOMParser.fromSchema(EditorSchema).parse(contentElement),
    // plugins: exampleSetup({schema: mySchema})
  })

  const view = new EditorView(el, { state })

  return view
}
