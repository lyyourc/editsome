import React from 'react'
import { FatsoNode } from '..'
import ReactNodeView, { ReactNodeViewRenderProps } from '../../utils/reactNodeView';

export default function imageNode(): FatsoNode {
  return {
    type: 'node',
    name: 'image',
    schema: {
      inline: true,
      attrs: {
        src: {},
        alt: {
          default: null,
        },
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: dom => {
            if (dom instanceof Element) {
              return {
                src: dom.getAttribute('src'),
                alt: dom.getAttribute('alt'),
              }
            }
          },
        },
      ],
      toDOM: node => ['img', node.attrs],
    },

    nodeView: class ImageNodeView extends ReactNodeView {
      render({ node }: ReactNodeViewRenderProps) {
        const { attrs } = node

        return (
          <img {...attrs} />
        )
      }
    },

    command({ view, schema }) {
      const type = schema.nodes.image

      return {
        active: () => false,
        run(attrs) {
          const { selection } = view.state
          const position = selection.head
          const node = type.create(attrs)
          const transaction = view.state.tr.insert(position, node)
          view.dispatch(transaction)
        },
      }
    },
  }
}
