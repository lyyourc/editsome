import { MarkType } from "prosemirror-model";
import { CommandCallback } from ".";

export default function (type: MarkType): CommandCallback {
  return (state, dispatch) => {
    const { from, to } = state.selection

    if (dispatch) {
      return dispatch(state.tr.removeMark(from, to, type))
    }
  }
}
