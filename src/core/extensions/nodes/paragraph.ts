import { FatsoNode } from '..'

export default function paragraphNode(): FatsoNode {
  return {
    type: 'node',
    name: 'paragraph',

    schema: {
      group: 'block',
      content: 'text*',
      toDOM() {
        return ['p', 0]
      },
      parseDOM: [{ tag: 'p' }],
    },
  }
}
