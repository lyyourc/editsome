import { Schema, NodeSpec } from "prosemirror-model";
import {Omit} from 'type-fest'

export type ExtensionType = 'node' | 'mark' | 'extension'

export interface FatsoNode {
  type: 'node'
  name: string
  schema: NodeSpec
}
