import { Node } from '..'
import { setBlockType } from 'prosemirror-commands'
import isNodeActive from '../../utils/isNodeActive'
import { textblockTypeInputRule } from 'prosemirror-inputrules'
import toggleBlockType from '../../commands/toggleBlockType'

export type HeadingCommandOptions = {
  level: number
}

export default function headingNode(): Node {
  const options = {
    levels: [1, 2, 3, 4, 5, 6],
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
      const { heading: type, paragraph: toggleType } = schema.nodes
      // ⚠️: if 'view' changed, but state keeps old
      // ❌: const { state } = view
      // ✅: view.state

      return {
        active: attrs => {
          return isNodeActive({ type, attrs, state: view.state })
        },
        run: attrs => {
          return toggleBlockType({ type, toggleType, attrs })(
            view.state,
            view.dispatch
          )
        },
      }
    },

    keymaps({ schema }) {
      const { heading: type, paragraph: toggleType } = schema.nodes

      const maps = options.levels.reduce(
        (items, level) => ({
          ...items,
          ...{
            [`Mod-Alt-${level}`]: toggleBlockType({
              type,
              toggleType,
              attrs: { level },
            }),
          },
        }),
        {}
      )
      return maps
    },

    // https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/inputrules.js#L39
    inputRules({ schema }) {
      return [
        textblockTypeInputRule(
          new RegExp('^(#{1,' + options.levels.length + '})\\s$'),
          schema.nodes.heading,
          match => ({ level: match[1].length })
        ),
      ]
    },
  }
}
