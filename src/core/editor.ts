import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser, NodeSpec, MarkSpec } from 'prosemirror-model'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import DocNode from './extensions/nodes/doc'
import TextNode from './extensions/nodes/text'
import ParagraphNode from './extensions/nodes/paragraph'
import { FatsoExtension, FatsoNode, FatsoMark } from './extensions'
import Strong from './extensions/marks/bold'
import HeadingNode, { HeadingCommandOptions } from './extensions/nodes/heading'
import { Commands } from './commands'

export type EditorOptions = {
  el: HTMLElement
  content: string
  onUpdate?: () => any
}

export default class Editor<N extends string = any, M extends string = any> {
  options: EditorOptions
  extensions: FatsoExtension[]
  schema: Schema<N, M>
  state: EditorState<Schema<N, M>>
  view: EditorView<Schema<N, M>>
  commands: Commands

  constructor(options: EditorOptions) {
    this.options = options
    this.extensions = this.createExtensions()
    this.schema = this.createSchema()
    this.state = this.createState()
    this.view = this.createView()
    this.commands = this.createCommands()
  }

  createKeymaps() {
    const { schema } = this

    return this.extensions
      .filter(extension => extension.keymaps)
      .map(extension => {
        return keymap(extension.keymaps!({ schema }))
      })
  }

  createExtensions() {
    const extensions = [
      DocNode(),
      TextNode(),
      ParagraphNode(),
      HeadingNode(),
      Strong(),
    ]
    return extensions
  }

  createCommands() {
    return this.extensions.reduce(
      (commands, extension) => {
        if (!extension.command) {
          return commands
        }

        return {
          ...commands,
          [extension.name]: extension.command({
            view: this.view,
            schema: this.schema,
          }),
        }
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
      schema: this.schema,
      doc: DOMParser.fromSchema(this.schema).parse(contentElement),
      plugins: [...this.createKeymaps(), keymap(baseKeymap)],
    })
    return state
  }

  createView() {
    const { state, options } = this
    const { el, onUpdate } = options

    const view = new EditorView(el, {
      state,
      dispatchTransaction: transaction => {
        this.state = this.state.apply(transaction)
        view.updateState(this.state)

        if (onUpdate) {
          onUpdate()
        }
      },
    })

    return view
  }
}
