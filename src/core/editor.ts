import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser, NodeSpec, MarkSpec } from 'prosemirror-model'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import {
  inputRules,
  smartQuotes,
  emDash,
  ellipsis,
  InputRule,
} from 'prosemirror-inputrules'
import { FatsoExtension } from './extensions'
import { FatsoCommands } from './commands'
import blockquoteNode from './extensions/nodes/blockquote'
import docNode from './extensions/nodes/doc'
import textNode from './extensions/nodes/text'
import paragraphNode from './extensions/nodes/paragraph'
import headingNode from './extensions/nodes/heading'
import boldMark from './extensions/marks/bold'
import listItemNode from './extensions/nodes/listItem'
import orderListNode from './extensions/nodes/orderedList'
import bulletListNode from './extensions/nodes/bulletList'
import histroyExtension from './extensions/history'
import toolTipPlugin, { Tooltip } from './plugins/tooltip';

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
  commands: FatsoCommands
  tooltip: Tooltip = {
    left: 0,
    top: 0,
    visible: false,
  }

  constructor(options: EditorOptions) {
    this.options = options
    this.extensions = this.createExtensions()
    this.schema = this.createSchema()
    this.state = this.createState()
    this.view = this.createView()
    this.commands = this.createCommands()
  }

  createExtensions() {
    const extensions = [
      docNode(),
      textNode(),
      paragraphNode(),
      headingNode(),
      listItemNode(),
      orderListNode(),
      bulletListNode(),
      blockquoteNode(),
      boldMark(),
      histroyExtension(),
    ]
    return extensions
  }

  createCommands() {
    const { schema, view } = this
    return this.extensions.reduce(
      (allCommands, extension) => {
        let cmds: Partial<FatsoCommands> = {}

        if (extension.command) {
          cmds[extension.name as keyof FatsoCommands] = extension.command({
            view,
            schema,
          })
        }

        if (extension.commands) {
          cmds = { ...cmds, ...extension.commands({ schema, view }) }
        }

        return {
          ...allCommands,
          ...cmds,
        }
      },
      {} as FatsoCommands
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
      plugins: [
        ...this.createKeymaps(),
        keymap(baseKeymap),
        this.createInputRules(),
        ...this.createPlugins(),
      ],
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

  createInputRules(): Plugin {
    const rulesBuiltin = smartQuotes.concat(ellipsis, emDash)

    const rules = [
      ...rulesBuiltin,
      ...this.extensions.reduce(
        (rules, ext) => {
          if (ext.inputRules == null) {
            return rules
          }

          return [...rules, ...ext.inputRules({ schema: this.schema })]
        },
        [] as InputRule[]
      ),
    ]

    return inputRules({ rules })
  }

  createKeymaps(): Plugin[] {
    const { schema } = this

    return this.extensions
      .filter(extension => extension.keymaps)
      .map(extension => {
        return keymap(extension.keymaps!({ schema }))
      })
  }

  createPlugins(): Plugin[] {
    const builtinPlugins = [
      toolTipPlugin(this)
    ]

    return this.extensions.reduce(
      (allPlugins, ext) => {
        if (ext.plugins) {
          return [...allPlugins, ...(ext.plugins() || [])]
        }
        return allPlugins
      },
      builtinPlugins
    )
  }
  
  getTooltipProps = () => {
    const el = this.view.dom as HTMLElement
    const box = el.offsetParent!.getBoundingClientRect()
    const { left, top, visible } = this.tooltip

    return {
      left: left - box.left,
      bottom: box.bottom - top,
      visible,
    }
  }

  setTooltipProps(tooltip: Partial<Tooltip>) {
    this.tooltip = {
      ...this.tooltip,
      ...tooltip,
    }
  }
}
