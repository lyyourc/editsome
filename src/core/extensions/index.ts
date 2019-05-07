import { Schema, NodeSpec, MarkSpec } from 'prosemirror-model'
import Editor from '../editor'
import { InputRule } from 'prosemirror-inputrules'
import { FatsoCommand } from '../commands'
import { Plugin } from 'prosemirror-state'
import ReactNodeView from '../utils/reactNodeView';

export type ExtensionType = 'node' | 'mark' | 'extension'
export type NodeBuiltin = 'doc' | 'paragraph' | 'text' | 'heading'
export type MarkBuiltin = 'strong' | 'link'

export interface FatsoExtension<Spec = NodeSpec | MarkSpec> {
  type: ExtensionType
  name: string
  schema?: Spec

  nodeView?: typeof ReactNodeView

  plugins?: () => Plugin[]

  command?: (props: {
    view: Editor['view']
    schema: Editor['schema']
  }) => FatsoCommand

  commands?: (props: {
    view: Editor['view']
    schema: Editor['schema']
  }) => { [key: string]: FatsoCommand }

  keymaps?: (props: {
    schema: Editor['schema']
  }) => { [key: string]: (options: any) => any }

  inputRules?: (props: { schema: Editor['schema'] }) => InputRule[]
}

export interface FatsoNode extends FatsoExtension<NodeSpec> {
  type: 'node'
}

export interface FatsoMark extends FatsoExtension<MarkSpec> {
  type: 'mark'
}
