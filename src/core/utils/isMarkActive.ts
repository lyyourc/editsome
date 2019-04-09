import { EditorState } from 'prosemirror-state'
import { MarkType, Schema } from 'prosemirror-model'

// https://github.com/ProseMirror/prosemirror-menu/blob/master/src/menu.js#L447
export default function isMarkActive<S extends Schema = any>({
  state,
  type,
}: {
  state: EditorState
  type: MarkType<S>
}): boolean {
  const { from, $from, to, empty } = state.selection

  if (empty) {
    return type.isInSet(state.storedMarks || $from.marks()) != null
  } else {
    return state.doc.rangeHasMark(from, to, type)
  }
}
