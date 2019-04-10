import { EditorState } from 'prosemirror-state'
import { Schema, NodeType } from 'prosemirror-model'
import { setBlockType } from 'prosemirror-commands';
import { findParentNodeOfType } from 'prosemirror-utils'

export default function isNodeActive<S extends Schema = any>({
  state,
  type,
  attrs,
}: {
  state: EditorState
  type: NodeType<S>
  attrs?: { [key: string]: any }
}): boolean {
  // https://github.com/scrumpy/tiptap/blob/master/packages/tiptap-utils/src/utils/nodeIsActive.js
  // https://github.com/ProseMirror/prosemirror-menu/blob/e289fa1280da2b9c602c1a1694fbda947d39bf7b/src/menu.js#L447
  const { selection } = state
  const { $from, to } = selection
  const parent = findParentNodeOfType(type)(selection)

  if (parent) {
    return parent.node.hasMarkup(type, attrs)
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs)
}