import { Plugin } from 'prosemirror-state'
import Editor from '../editor';

export type Tooltip = {
  top: number
  left: number
  visible: boolean
}

export default function toolTipPlugin(editor: Editor) {
  return new Plugin({
    view(editorView) {
      return {
        update(view, lastState) {
          const state = view.state

          // Don't do anything if the document/selection didn't change
          if (
            lastState &&
            lastState.doc.eq(state.doc) &&
            lastState.selection.eq(state.selection)
          ) {
            return
          }

          // Hide the tooltip if the selection is empty
          if (state.selection.empty) {
            editor.setTooltipProps({ visible: false })
            return
          }

          // Otherwise, reposition it and update its content
          const { from, to } = state.selection
          // These are in screen coordinates
          const start = view.coordsAtPos(from)
          const end = view.coordsAtPos(to)

          // Find a center-ish x position from the selection endpoints (when
          // crossing lines, end may be more to the left)
          const left = Math.max((start.left + end.left) / 2, start.left + 3)

          editor.setTooltipProps({
            visible: true,
            top: start.top,
            left,
          })
        },
        
        destroy() {},
      }
    },
  })
}
