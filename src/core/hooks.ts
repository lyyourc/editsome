import React, { useContext, useEffect, useRef, useState } from 'react' 
import { EditorContext } from './provider';
import { EditorView } from 'prosemirror-view'
import { Editor, EditorSchema } from '.'
import createCommands from './commands';

type EditorOption = {
  container: React.RefObject<HTMLElement>
  content: string
}

export function useEditor({ container, content }: EditorOption) {
  const [editorView, setEditorView] = useState<EditorView>(null! as EditorView)

  useEffect(() => {
    if (container.current == null) {
      return
    }

    console.log('[editor] render start')
    const view = Editor(container.current, content)
    setEditorView(view)
  }, [])

  return {
    editorView,
    commands: createCommands({ view: editorView, schema: EditorSchema })
  }
}

export function useEditorContext() {
  return useContext(EditorContext)
}
