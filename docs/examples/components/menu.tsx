import React, { useState } from 'react'
import { useEditorContext, useEditor, Provider } from '../../../src/core'
import { MarkBuiltin, NodeBuiltin } from '../../../src/core/extensions'
import { Container } from '../styled/container';

export default function MenuEditor() {
  const content = `
    <p>Custom menu 🍱</p>
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
  const { view, commands, state, schema } = useEditorContext<
    NodeBuiltin,
    MarkBuiltin
  >()

  if (commands == null) {
    return null
  }

  const items = [
    {
      component: 'B',
      command: () => commands.bold.run(),
      active: commands.bold.active(),
    },
    {
      component: 'h1',
      command: () => commands.heading.run({ level: 1 }),
      active: commands.heading.active({ level: 1 }),
    },
    {
      component: 'ol',
      command: () => commands.orderedList.run(),
      active: commands.orderedList.active(),
    },
    {
      component: 'ul',
      command: () => commands.bulletList.run(),
      active: commands.bulletList.active(),
    },
    {
      component: 'quote',
      command: () => commands.blockquote.run(),
      active: commands.blockquote.active(),
    },
    {
      component: 'redo',
      command: () => commands.redo.run(),
      disabled: () => commands.redo.disabled!(),
    },
    {
      component: 'undo',
      command: () => commands.undo.run(),
      disabled: () => commands.undo.disabled!(),
    },
  ]

  return (
    <div>
      {items.map((item, i) => (
        <button
          key={i}
          disabled={item.disabled && item.disabled()}
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
