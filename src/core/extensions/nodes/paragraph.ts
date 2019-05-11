import { Node } from '..'

export default function paragraphNode(): Node {
  return {
    type: 'node',
    name: 'paragraph',

    schema: {
      group: 'block',
      content: 'inline*',
      toDOM() {
        return ['p', 0]
      },
      parseDOM: [{ tag: 'p' }],
    },
  }
}
