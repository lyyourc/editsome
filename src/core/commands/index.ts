import { HeadingCommandOptions } from '../extensions/nodes/heading'
import { EditorState, Transaction } from 'prosemirror-state'

export interface FatsoCommand<O = any> {
  run: (options?: O) => any
  active: (options?: O) => boolean
  disabled?: (options?: O) => boolean
}

export type FatsoCommands = {
  bold: FatsoCommand
  heading: FatsoCommand<{ level: number }>
  orderedList: FatsoCommand
  bulletList: FatsoCommand
  blockquote: FatsoCommand
  undo: FatsoCommand
  redo: FatsoCommand
}

export type CommandCallback = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void
) => boolean
