import { FatsoNode } from '..'
import { splitListItem } from 'prosemirror-schema-list';

export default function listItemNode(): FatsoNode {
  return {
    type: 'node',
    name: 'listItem',
    schema: {
      content: 'paragraph block*',
      defining: true,
      draggable: false,
      parseDOM: [
        { tag: 'li' },
      ],
      toDOM: () => ['li', 0],
    },
    keymaps({ schema }) {
      return {
        'Enter': splitListItem(schema.nodes.listItem)
      }
    }
  }
}
