import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import Fatso, { useEditorContext } from '..'
import { MarkBuiltin, NodeBuiltin } from '../extensions'

export default function CoreTest() {
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

  console.log(commands)

  const items = [
    { component: 'B', command: () => commands.strong() },
    // { component: 'h1', command: () => commands.heading({ level: 1 }) },
    // { component: 'h2', command: () => commands.heading({ level: 2 }) },
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

const Container = styled('div')``