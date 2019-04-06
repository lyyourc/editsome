import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser, NodeSpec, MarkSpec } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { exampleSetup } from 'prosemirror-example-setup'
import DocNode from './extensions/nodes/doc'
import TextNode from './extensions/nodes/text'
import ParagraphNode from './extensions/nodes/paragraph'
import { FatsoExtension, FatsoNode, FatsoMark } from './extensions'
import Strong from './extensions/marks/strong'

export type Commands<N extends string, M extends string> = {
  [name in N | M]: any
}

export type EditorOptions = {
  el: HTMLElement
  content: string
}

export default class Editor<N extends string = any, M extends string = any> {
  options: EditorOptions
  extensions: FatsoExtension[]
  schema: Schema<N, M>
  state: EditorState<Schema<N, M>>
  view: EditorView<Schema<N, M>>
  commands: Commands<N, M>

  constructor(options: EditorOptions) {
    this.options = options
    this.extensions = this.createExtensions()
    this.schema = this.createSchema()
    this.state = this.createState()
    this.view = this.createView()
    this.commands = this.createCommands()
  }

  createExtensions() {
    const extensions = [DocNode(), TextNode(), ParagraphNode(), Strong()]
    return extensions
  }

  createCommands() {
    return this.extensions.reduce(
      (commands, extension) => {
        if (extension.command) {
          return {
            ...commands,
            [extension.name]: () => {
              if (extension.command) {
                extension.command({ view: this.view, schema: this.schema })
              }
            },
          }
        }

        return commands
      },
      {} as any
    )
  }

  createSchema() {
    const nodes = this.extensions
      .filter(e => e.type === 'node')
      .reduce(
        (schemas, node) => {
          return {
            ...schemas,
            [node.name]: node.schema,
          }
        },
        {} as { [name in N]: NodeSpec }
      )

    const marks = this.extensions
      .filter(e => e.type === 'mark')
      .reduce(
        (schemas, extension) => {
          return {
            ...schemas,
            [extension.name]: extension.schema,
          }
        },
        {} as { [name in M]: MarkSpec }
      )

    return new Schema({
      nodes,
      marks,
    })
  }

  createState() {
    const { content } = this.options
    const contentElement = document.createElement('div')
    contentElement.innerHTML = content.trim()

    const state = EditorState.create({
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
