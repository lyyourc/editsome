import { ProsemirrorNode } from '../../../typings/prosemirror'

export function setDomAttrs(node: ProsemirrorNode, element: Element) {
  Object.keys(node.attrs || {}).forEach(attr => {
    element.setAttribute(attr, node.attrs[attr])
  })
}
