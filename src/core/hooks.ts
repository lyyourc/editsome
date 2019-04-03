import React, { useContext, useEffect, useRef, useState } from 'react' 
import { EditorContext } from './provider';
import Editor, { EditorOptions } from '.'

type useEditorProps = {
  container: React.RefObject<HTMLElement>
  content: EditorOptions['content']
}

export function useEditor({ container, content }: useEditorProps) {
  const [editor, setEditor] = useState<Editor>({}! as Editor)

  useEffect(() => {
    if (container.current == null) {
      return
    }

    console.log('[editor] render start')
    const editor = new Editor({ el: container.current, content })
    setEditor(editor)
  }, [])

  return editor
}

export function useEditorContext() {
  return useContext(EditorContext)
}
