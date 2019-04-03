import { FatsoNode } from '..'

export default function DocNode(): FatsoNode {
  return {
    type: 'node',
    name: 'doc',
    schema: {
      content: 'block+',
    },
  }
}
