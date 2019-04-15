import { MarkSpec, MarkType } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { CommandCallback } from '.'

export default function(
  type: MarkType,
  attrs?: { [key: string]: any }
): CommandCallback {
  return (state, dispatch) => {
    const { from, to } = state.selection

    if (dispatch) {
      return dispatch(state.tr.addMark(from, to, type.create(attrs)))
    }
  }
}
