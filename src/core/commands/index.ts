import { HeadingCommandOptions } from '../extensions/nodes/heading'

export interface Command<O = any> {
  active: (options?: O) => boolean
  run: (options?: O) => any
}

export type Commands = {
  bold: Command
  heading: Command<{ level: number }>
}
