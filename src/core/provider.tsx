import React, { createContext, FunctionComponent, useState } from 'react'
import { EditorView } from 'prosemirror-view'
import { Commands } from './commands';

type Context = {
  editorView: EditorView
  commands: Commands
}

export const EditorContext = createContext({} as Context)

const Provider: FunctionComponent<{ value: Context }> = function Provider({
  children,
  value,
}) {
  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

export default Provider
