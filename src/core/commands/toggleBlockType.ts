import { setBlockType } from 'prosemirror-commands'
import isNodeActive from '../utils/isNodeActive'
import { NodeType } from 'prosemirror-model'
import { CommandCallback } from '.';

export default function toggleBlockType({
  type,
  toggleType,
  attrs,
}: {
  type: NodeType
  toggleType: NodeType
  attrs?: { [key: string]: any }
}): CommandCallback {
  return (state, dispatch): boolean => {
    const active = isNodeActive({ state, type, attrs })

    if (active) {
      return setBlockType(toggleType, attrs)(state, dispatch)
    }

    return setBlockType(type, attrs)(state, dispatch)
  }
}

