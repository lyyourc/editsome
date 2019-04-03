import { FatsoNode } from '..'

export default function TextNode(): FatsoNode {
  return {
    type: 'node',
    name: 'text',
    schema: {
      group: 'inline',
    },
  }
}
