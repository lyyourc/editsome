import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  createRef,
} from 'react'
import Editor, { EditorOptions } from './editor'

export interface useEditorProps {
  content: EditorOptions['content']
}

export function useEditor({ content }: useEditorProps) {
  const [editor, setEditor] = useState<Editor>({}! as Editor)
  const containerRef = useRef<any>(null)

  useEffect(() => {
    // Or containerRef.current.append(editor.view.dom) ?
    if (containerRef.current == null) {
      return
    }

    console.log('[editor] render start')

    const editor = new Editor({
      el: containerRef.current,
      content,
      onUpdate() {
        // Todo
        setEditor({ ...editor } as any)
      },
    })

    setEditor(editor)
  }, [])

  return {
    editor,
    containerRef,
  }
}

export const FatsoContext = React.createContext({} as Editor)

export function Provider({
  value,
  children,
}: {
  value: Editor
  children: React.ReactNode
}) {
  return <FatsoContext.Provider value={value}>{children}</FatsoContext.Provider>
}

export function useEditorContext<N extends string, M extends string>() {
  return useContext<Editor<N, M>>(FatsoContext)
}
