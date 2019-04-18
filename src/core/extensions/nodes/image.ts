import { FatsoNode } from '..'

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
