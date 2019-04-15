import { EditorState } from 'prosemirror-state'
import { Mark, MarkSpec, MarkType } from 'prosemirror-model'

// https://github.com/scrumpy/tiptap/blob/master/packages/tiptap-utils/src/utils/getMarkAttrs.js
export default function getMarkAttrs(state: EditorState, type: MarkType) {
  const { from, to } = state.selection
  let marks: Mark[] = []

  state.doc.nodesBetween(from, to, node => {
    marks = [...marks, ...node.marks]
  })

  const mark = marks.find(markItem => markItem.type.name === type.name)

  if (mark) {
    return mark.attrs
  }

  return {}
}
