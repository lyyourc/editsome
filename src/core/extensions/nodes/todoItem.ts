import { FatsoNode } from '..'
import { Plugin } from 'prosemirror-state'

// https://discuss.prosemirror.net/t/todo-list-improvements/1449
export default function todoItemNode(): FatsoNode {
  return {
    type: 'node',
    name: 'todoItem',
    schema: {
      content: 'paragraph block*',
      attrs: {
        done: { default: false },
      },
      toDOM: node => {
        const { done } = node.attrs
        const checkboxProps = {
          type: 'checkbox',
          class: 'todo-checkbox',
          checked: 'true',
        }
        if (done === false) {
          delete checkboxProps.checked
        }

        return [
          'li',
          { class: 'todo-item', 'data-done': done.toString() },
          ['input', checkboxProps],
          ['div', { class: 'todo-content' }, 0],
        ]
      },
      parseDOM: [{
        priority: 51, // Needs higher priority than other nodes that use a "li" tag
        tag: '[data-type="todo-item"]', getAttrs(dom) {
          if (dom instanceof HTMLElement) {
            return {
              done: dom.getAttribute('data-done') === 'true',
            }
          }
        },
      }],
    },
    plugins() {
      return [
        new Plugin({
          props: {
            handleClickOn(view, pos, node, nodePos, event) {
              const target = event.target as HTMLInputElement

              if (target.classList.contains('todo-checkbox')) {
                const tr = view.state.tr.setNodeMarkup(nodePos, undefined, {
                  done: !node.attrs.done,
                })
                view.dispatch(tr)
                return true
              }
              return true
            },
          },
        }),
      ]
    },
  }
}
