import { Schema, NodeSpec, MarkSpec } from 'prosemirror-model'
import Editor from '../editor'
import { Command } from '../commands';
import { InputRule } from 'prosemirror-inputrules';

export type ExtensionType = 'node' | 'mark' | 'extension'
export type NodeBuiltin = 'doc' | 'paragraph' | 'text' | 'heading'
export type MarkBuiltin = 'strong' | 'link'

export interface FatsoExtension<Spec = NodeSpec | MarkSpec> {
  type: ExtensionType
  name: string
  schema: Spec

  command?: (props: {
    view: Editor['view']
    schema: Editor['schema']
  }) => Command

  keymaps?: (props: {
    schema: Editor['schema']
  }) => { [key: string]: (options: any) => any }

  inputRules?: (props: {
    schema: Editor['schema']
  }) => InputRule[]
}

export interface FatsoNode extends FatsoExtension<NodeSpec> {
  type: 'node'
}

export interface FatsoMark extends FatsoExtension<MarkSpec> {
  type: 'mark'
}
