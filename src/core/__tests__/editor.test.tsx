import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { useEditorContext, useEditor, Provider } from '..'
import { MarkBuiltin, NodeBuiltin } from '../extensions'
import getMarkAttrs from '../utils/getMarkAttrs';
import { Selection, TextSelection, Transaction } from 'prosemirror-state';

export default function EditorTest() {
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
      <Menu />
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

function Menu() {
  const { view, commands, state, schema } = useEditorContext<
    NodeBuiltin,
    MarkBuiltin
  >()

  if (commands == null) {
    return null
  }

  const items = [
    {
      component: 'B',
      command: () => commands.bold.run(),
      active: commands.bold.active(),
    },
    {
      component: 'h1',
      command: () => commands.heading.run({ level: 1 }),
      active: commands.heading.active({ level: 1 }),
    },
    {
      component: 'ol',
      command: () => commands.orderedList.run(),
      active: commands.orderedList.active(),
    },
    {
      component: 'ul',
      command: () => commands.bulletList.run(),
      active: commands.bulletList.active(),
    },
    {
      component: 'todo list',
      command: () => commands.todoList.run(),
      active: commands.todoList.active(),
    },
    {
      component: 'quote',
      command: () => commands.blockquote.run(),
      active: commands.blockquote.active(),
    },
    {
      component: 'redo',
      command: () => commands.redo.run(),
      disabled: () => commands.redo.disabled!(),
    },
    {
      component: 'undo',
      command: () => commands.undo.run(),
      disabled: () => commands.undo.disabled!(),
    },
    {
      component: 'image',
      command: () => commands.image.run({ src: 'https://avatars1.githubusercontent.com/u/6823863?s=200&v=4'}),
    }
  ]

  return (
    <div>
      {items.map((item, i) => (
        <button
          key={i}
          disabled={item.disabled && item.disabled()}
          style={{ background: item.active ? '#ccc' : 'transparent' }}
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

const Container = styled('div')`
  > [contenteditable='true'] {
    &:focus {
      outline: none;
    }
  }

  ul {
    padding: 0;
  }

  li {
    padding: 0;
    > p {
      margin: 0;
    }

    &.todo-item {
      display: flex;

      &[data-done=true] {
        text-decoration: line-through;
      }

      .todo-checkbox {
        height: 20px;
        display: inline-block;
      }

      .todo-content {
        p {
          margin: 0;
        }
      }
    }
  }

  blockquote {
    border-left: 2px solid #ccc;
    margin-left: 0;
    padding-left: 1em;
  }
`
