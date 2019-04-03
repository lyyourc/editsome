import React, { createContext, FunctionComponent, useState } from 'react'
import Editor from '.';

type Context = Editor & {}

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
