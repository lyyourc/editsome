import React, { useState } from 'react'
import { useEditorContext, useEditor, Provider } from '../../../src/core'
import { MarkBuiltin, NodeBuiltin } from '../../../src/core/extensions'
import { Container } from '../styled/container';

export default function LinkEditor() {
  const content = `
    <p>
      Hello, I am <a href="http://foo.com">editsome</a>. ✌️
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
      component: 'link',
      command: () => commands.link.run({ href: 'http://foo.com' })
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
