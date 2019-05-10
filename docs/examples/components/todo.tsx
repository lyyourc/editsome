import React, { useState } from 'react'
import { useEditorContext, useEditor, Provider } from '../../../src/core'
import { MarkBuiltin, NodeBuiltin } from '../../../src/core/extensions'
import { Container } from '../styled/container'

export default function TodoEditor() {
  const content = `
    <ul data-type="todo-list">
      <li class="todo-item" data-done="true">
        <input type="checkbox" class="todo-checkbox" checked>
        <div class="todo-content">
          <p>Learning editsome 👍</p>
        </div>
      </li>

      <li class="todo-item" data-done="false">
        <input type="checkbox" class="todo-checkbox">
        <div class="todo-content">
        <p>After 5 mins...</p>
        </div>
      </li>
    </ul>

    <p>Giving up editsome 😭</p>
  `
  const { editor, containerRef } = useEditor({ content })

  return (
    <Provider value={editor}>
      <Menu />
      <Container ref={containerRef} />
    </Provider>
  )
}

function Menu() {
  const { view, commands } = useEditorContext<NodeBuiltin, MarkBuiltin>()

  if (commands == null) {
    return null
  }

  const items = [
    {
      component: 'todo list',
      command: () => commands.todoList.run(),
      active: commands.todoList.active(),
    },
  ]

  return (
    <div>
      {items.map((item, i) => (
        <button
          key={i}
          style={{ background: item.active ? '#ccc' : 'transparent' }}
          onMouseDown={e => {
            e.preventDefault()
            view.focus()
            item.command()
          }}
        >
          {item.component}
        </button>
      ))}
    </div>
  )
}
