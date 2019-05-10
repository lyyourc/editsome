import React, { useState } from 'react'
import { useEditorContext, useEditor, Provider } from '../../../src/core'
import { MarkBuiltin, NodeBuiltin } from '../../../src/core/extensions'
import { Container } from '../styled/container';

export default function ImageEditor() {
  const content = `
    <p>spice 🏞</p>
    <p>
      <img src="https://avatars1.githubusercontent.com/u/6823863?s=200&v=4" />
    </p>
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
      component: 'image',
      command: () => commands.image.run({ src: 'https://avatars1.githubusercontent.com/u/6823863?s=200&v=4'}),
    }
  ]

  return (
    <div>
      {items.map((item, i) => (
        <button
          key={i}
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
