import { wrapInList, liftListItem } from 'prosemirror-schema-list'
import isNodeActive from '../utils/isNodeActive'
import { NodeType } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'

export default function toggleList(type: NodeType, itemType: NodeType) {
  return (
    state: EditorState,
    dispatch?: (tr: Transaction) => void
  ): boolean => {
    const active = isNodeActive({ state, type })

    if (active) {
      return liftListItem(itemType)(state, dispatch)
    }

    return wrapInList(type)(state, dispatch)
  }
}
