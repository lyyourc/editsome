import { HeadingCommandOptions } from '../extensions/nodes/heading'
import { EditorState, Transaction } from 'prosemirror-state'

export interface FatsoCommand<O = any> {
  active: (options?: O) => boolean
  run: (options?: O) => any
}

export type FatsoCommands = {
  bold: FatsoCommand
  heading: FatsoCommand<{ level: number }>
  orderedList: FatsoCommand
  bulletList: FatsoCommand
  blockquote: FatsoCommand
}

export type CommandCallback = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void
) => boolean
