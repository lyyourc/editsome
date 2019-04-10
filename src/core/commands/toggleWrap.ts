import { wrapIn, lift } from 'prosemirror-commands'
import isNodeActive from '../utils/isNodeActive';
import { NodeType } from 'prosemirror-model';
import { CommandCallback } from '.';

export default function (type: NodeType): CommandCallback {
  return (state, dispatch) => {
    const active = isNodeActive({ type, state })

    if (active) {
      return lift(state, dispatch)
    }

    return wrapIn(type)(state, dispatch)
  }
}
