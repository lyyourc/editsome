import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import Fatso, { useEditorContext } from '..'
import { MarkBuiltin, NodeBuiltin } from '../extensions'

export default function EditorTest() {
  const editorRef = useRef(null)

  return (
    <Fatso container={editorRef} content={'foo'}>
      <Menu />
      <Container>
        <div ref={editorRef} />
      </Container>
    </Fatso>
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

const Container = styled('div')`
  li {
    padding: 0;
    > p {
      margin: 0;
    }
  }
`
