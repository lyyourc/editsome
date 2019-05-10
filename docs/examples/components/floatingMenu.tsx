import React, { useRef } from 'react'
import { useEditorContext, useEditor, Provider } from '../../../src/core'
import getMarkAttrs from '../../../src/core/utils/getMarkAttrs';
import { Selection, TextSelection, Transaction } from 'prosemirror-state';
import { Container } from '../styled/container';

export default function FloatingMenuEditor() {
  const content = `
    <p>Floating Menu 🚁</p>
  `
  const { editor, containerRef } = useEditor({ content })

  return (
    <Provider value={editor}>
      <Container ref={containerRef} />
      <FloatingMenu />
    </Provider>
  )
}

function FloatingMenu() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { getTooltipProps, commands, view, state, schema } = useEditorContext()

  if (getTooltipProps == null) {
    return null
  }
  
  const { bottom, left, visible } = getTooltipProps()
  const isLinkActive = commands.link.active()
  const { href } = getMarkAttrs(state, schema.marks.link)

  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        left,
        display: visible ? 'block' : 'none',
        background: '#fff',
        border: '1px solid #ccc',
        padding: '2px 4px',
        minWidth: '88px',
      }}
    >
      {isLinkActive ? (
        <div>
          <input defaultValue={href} ref={inputRef} />
          <button onClick={() => {
            commands.link.run({ href: inputRef.current!.value })
            // hide the tooltip
            const { tr, selection } = view.state
            const { $head } = selection
            const transaction = tr.setSelection(new TextSelection($head, $head))
            view.dispatch(transaction)
            view.focus()
          }}>update</button>
        </div>
      ) : (
        <div>
          <button
            onMouseDown={e => {
              e.preventDefault()
              view.focus()
              commands.bold.run()
            }}
          >
            B
          </button>
          <button
            onMouseDown={e => {
              commands.link.run({ href: '' })
            }}
            style={{
              background: commands.link.active() ? '#ccc' : 'transparent',
            }}
          >
            Link
          </button>
        </div>
      )}
    </div>
  )
}
