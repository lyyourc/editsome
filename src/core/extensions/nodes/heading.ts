import { FatsoNode } from '..'
import { setBlockType } from 'prosemirror-commands'

export type HeadingCommandOptions = {
  level: number
}

export default function HeadingNode(): FatsoNode {
  const options = {
    levels: [1, 2, 3, 4, 5, 6]
  }

  return {
    type: 'node',
    name: 'heading',
    schema: {
      attrs: { level: { default: 1 } },
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],
      toDOM(node) {
        return ['h' + node.attrs.level, 0]
      },
    },
    command({ schema, view }) {
      return ({ level }) =>
        setBlockType(schema.nodes.heading, { level })(view.state, view.dispatch)
    },
    keymaps({ schema }) {
      return options.levels.reduce((items, level) => ({
        ...items,
        ...{
          [`Shift-Ctrl-${level}`]: setBlockType(schema.nodes.heading, { level }),
        },
      }), {})
    }
  }
}
