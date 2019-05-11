import { HeadingCommandOptions } from '../extensions/nodes/heading'
import { EditorState, Transaction } from 'prosemirror-state'

export interface Command<O = any> {
  run: (options?: O) => any
  active: (options?: O) => boolean
  disabled?: (options?: O) => boolean
}

export type Commands = {
  bold: Command
  heading: Command<{ level: number }>
  orderedList: Command
  bulletList: Command
  todoList: Command
  blockquote: Command
  undo: Command
  redo: Command
  link: Command<{ href: string }>
  image: Command<{ src: string, alt?: string, }>
}

export type CommandCallback = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void
) => boolean | void
