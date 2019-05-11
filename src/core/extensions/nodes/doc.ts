import { Node } from '..'

export default function docNode(): Node {
  return {
    type: 'node',
    name: 'doc',
    schema: {
      content: 'block+',
    },
  }
}
