import React, { useState } from 'react'
import { useEditor, Provider } from '../../../src/core'
import { Container } from '../styled/container';

export default function RichTextEditor() {
  const content = `
    <p>
      Hello, I am <a href="http://foo.com">foo</a>.
    </p>
    <ul data-type="todo-list">
      <li class="todo-item" data-done="false">
        <input type="checkbox" class="todo-checkbox">
        <div class="todo-content"><p>Hello, I am todo list.</p></div>
      </li>
    </ul>
    <p>
      This is an image <br />
    </p>
    <p>
      <img src="https://avatars1.githubusercontent.com/u/6823863?s=200&v=4" />
    </p>
  `
  const { editor, containerRef } = useEditor({ content })

  return (
    <Provider value={editor}>
      <Container ref={containerRef} />
    </Provider>
  )
}