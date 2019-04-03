import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { exampleSetup } from 'prosemirror-example-setup'
import createCommands, { Commands } from './commands';
import DocNode from './extensions/nodes/doc';
import TextNode from './extensions/nodes/text';
import ParagraphNode from './extensions/nodes/paragraph';

export type EditorOptions = {
  el: HTMLElement
  content: string
}

export interface IEditor {
  options: EditorOptions
  schema: Schema
  state: EditorState
  view: EditorView
  commands: Commands
  createSchema: () => Schema
  createState: () => EditorState
  createView: () => EditorView
} 

export default class Editor implements IEditor {
  options: EditorOptions
  schema: Schema
  state: EditorState
  view: EditorView
  commands: Commands

  constructor(options: EditorOptions) {
    this.options = options
    this.schema = this.createSchema()
    this.state = this.createState()
    this.view = this.createView()
    this.commands = createCommands({ view: this.view, schema: this.schema })
  }

  createSchema() {
    const nodes = [
      TextNode(),
      ParagraphNode(),
      DocNode(),
    ]
    const nodeSchemas = nodes.reduce((schemas, node) => {
      return {
        ...schemas,
        [node.name]: node.schema
      }
    }, {})

    return new Schema({
      nodes: nodeSchemas as any,
      // marks: schema.spec.marks,
    })
  }

  createState() {
    const { content } = this.options
    const contentElement = document.createElement('div')
    contentElement.innerHTML = content.trim()

    const state =  EditorState.create({
      // schema,
      doc: DOMParser.fromSchema(this.schema).parse(contentElement),
      // plugins: exampleSetup({schema: mySchema})
    })
    return state
  }

  createView() {
    const { state, options } = this
    const { el } = options

    const view = new EditorView(el, { state })
    return view
  }

} 
