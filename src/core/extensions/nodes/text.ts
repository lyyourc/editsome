import { FatsoNode } from '..'

export default function textNode(): FatsoNode {
  return {
    type: 'node',
    name: 'text',
    schema: {
      group: 'inline',
    },
  }
}
