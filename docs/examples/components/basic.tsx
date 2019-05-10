import React, { useState } from 'react'
import { useEditorContext, useEditor, Provider } from '../../../src/core'
import { Container } from '../styled/container';

export default function BasicEditor() {
  const content = `
    <p>Hi, editsome 🐮🍺</p>
  `
  const { editor, containerRef } = useEditor({ content })

  return (
    <Provider value={editor}>
      <Container ref={containerRef} />
    </Provider>
  )
}
