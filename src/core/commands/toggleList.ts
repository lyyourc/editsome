import { wrapInList, liftListItem } from 'prosemirror-schema-list'
import isNodeActive from '../utils/isNodeActive'
import { NodeType } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { CommandCallback } from '.';

export default function toggleList(type: NodeType, itemType: NodeType): CommandCallback {
  return (state, dispatch): boolean => {
    const active = isNodeActive({ state, type })

    if (active) {
      return liftListItem(itemType)(state, dispatch)
    }

    return wrapInList(type)(state, dispatch)
  }
}
