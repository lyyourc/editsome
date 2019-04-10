import { FatsoNode } from '..'

export default function docNode(): FatsoNode {
  return {
    type: 'node',
    name: 'doc',
    schema: {
      content: 'block+',
    },
  }
}
