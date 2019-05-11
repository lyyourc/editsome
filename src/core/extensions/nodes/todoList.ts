import { Node } from '..'
import { wrapInList, splitListItem } from 'prosemirror-schema-list'

export default function todoListNode(): Node {
  return {
    type: 'node',
    name: 'todoList',
    schema: {
      content: 'todoItem+',
      group: 'block',
      toDOM: () => {
        return [
          'ul',
          {
            'data-type': 'todo-list',
          },
          0,
        ]
      },
      parseDOM: [
        {
          priority: 51, // Needs higher priority than other nodes that use a "ul" tag
          tag: '[data-type="todo-list"]',
        },
      ],
    },
    command: ({ schema, view }) => {
      const type = schema.nodes.todoList

      return {
        active: () => false,
        run: () => {
          return wrapInList(type)(view.state, view.dispatch)
        },
      }
    },
    keymaps({ schema }) {
      return {
        'Enter': splitListItem(schema.nodes.todoItem)
      }
    }
  }
}
