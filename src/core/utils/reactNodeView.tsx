import React from 'react'
import ReactDOM from 'react-dom'
import { NodeView, EditorView, Decoration } from 'prosemirror-view'
import { Node as PMNode } from 'prosemirror-model'

export interface ReactNodeViewProps {
  node: PMNode
  view: EditorView
  getPos: () => number
  decorations: Decoration[]
  component: React.ComponentType<Omit<ReactNodeViewProps, 'component'>>
}

export default class ReactNodeView implements NodeView {
  dom: Element | null

  constructor({ component: Component, ...rest }: ReactNodeViewProps) {
    this.dom = document.createElement('div')
    ReactDOM.render(<Component {...rest} /> , this.dom)
  }

  stopEvent() {
    return true
  }
}

export function withProsemirrorNodeView(component: ReactNodeViewProps['component']) {
  return (
    node: PMNode,
    view: EditorView,
    getPos: () => number,
    decorations: Decoration[]
  ) => new ReactNodeView({ view, getPos, node, decorations, component })
}
