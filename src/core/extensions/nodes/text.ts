import { Node } from '..'

export default function textNode(): Node {
  return {
    type: 'node',
    name: 'text',
    schema: {
      group: 'inline',
    },
  }
}
