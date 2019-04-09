import { EditorState } from 'prosemirror-state'
import { Schema, NodeType } from 'prosemirror-model'
import { setBlockType } from 'prosemirror-commands';

export default function isNodeActive<S extends Schema = any>({
  state,
  type,
  attrs,
}: {
  state: EditorState
  type: NodeType<S>
  attrs?: { [key: string]: any }
}): boolean {
  return !setBlockType(type, attrs)(state)
}