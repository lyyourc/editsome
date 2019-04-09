import React, { useState, useEffect, useContext, useReducer } from 'react'
import Editor, { EditorOptions } from './editor'

export const FatsoContext = React.createContext({} as Editor)

interface FatsoProps {
  children: React.ReactNode
  container: React.RefObject<HTMLElement>
  content: EditorOptions['content']
}

export default function Fatso<N extends string, M extends string>({
  container,
  content,
  children,
}: FatsoProps) {
  const [editor, setEditor] = useState<Editor<N, M>>({}! as Editor<N, M>)

  useEffect(() => {
    if (container.current == null) {
      return
    }

    console.log('[editor] render start')
    const editor = new Editor<N, M>({
      el: container.current,
      content,
      onUpdate() {
        setEditor({ ...editor } as any)
      },
    })
    setEditor(editor)
  }, [])

  return (
    <FatsoContext.Provider value={editor}>{children}</FatsoContext.Provider>
  )
}

export function useEditorContext<N extends string, M extends string>() {
  return useContext<Editor<N, M>>(FatsoContext)
}
