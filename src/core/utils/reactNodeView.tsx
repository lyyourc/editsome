import React from 'react'
import ReactDOM from 'react-dom'
import { NodeView, EditorView, Decoration } from 'prosemirror-view'
import { ProsemirrorNode } from '../../../typings/prosemirror'
import { setDomAttrs } from './setDomAttrs'

export type ReactNodeViewRenderProps = ReactNodeViewProps &
Pick<ReactNodeView, 'setAttrs' | 'contentDomRef'>

export interface ReactNodeViewProps {
  node: ProsemirrorNode
  view: EditorView
  getPos: () => number
  decorations: Decoration[]
}

export default class ReactNodeView implements NodeView {
  dom: Element | null
  contentDOM: Node | null
  node: ReactNodeViewProps['node']
  view: ReactNodeViewProps['view']
  decorations: ReactNodeViewProps['decorations']
  getPos: ReactNodeViewProps['getPos']
  contentDomRef: React.RefObject<any>

  constructor({ ...rest }: ReactNodeViewProps) {
    const { node, view, getPos, decorations } = rest
    this.node = node
    this.view = view
    this.getPos = getPos
    this.decorations = decorations

    this.dom = document.createElement('div')
    this.contentDOM = document.createElement('span')

    this.contentDomRef = React.createRef()

    this.renderView()
  }

  renderView = () => {
    const {
      node,
      view,
      getPos,
      decorations,
      contentDomRef,
      setAttrs,
      render: Component
    } = this

    if (Component == null || this.dom == null) {
      return null
    }

    ReactDOM.render(
      <Component
        {...{
          node,
          view,
          getPos,
          decorations,
          setAttrs,
          contentDomRef,
        }}
      />,
      this.dom,
      this.handleContentDOM,
    )
  }

  render(props: ReactNodeViewRenderProps): React.ReactElement | null {
    return null
  }

  handleContentDOM = () => {
    const contentDOM = this.contentDOM

    if (this.contentDomRef.current && contentDOM) {
      this.contentDomRef.current.appendChild(contentDOM)
    }
  }

  setAttrs = (attrs: Object) => {
    const transaction = this.view.state.tr.setNodeMarkup(
      this.getPos(),
      undefined,
      {
        ...this.node.attrs,
        ...attrs,
      }
    )
    this.view.dispatch(transaction)
  }

  update = (node: ProsemirrorNode, decorations: Decoration[]) => {
    if (node.type !== this.node.type) {
      return false
    }

    if (this.dom && !this.node.sameMarkup(node)) {
      setDomAttrs(node, this.dom)
    }

    this.node = node
    this.decorations = decorations
    this.renderView()

    return true
  }

  stopEvent = () => {
    return false
  }

  ignoreMutation = () => {
    return true
  }

  destroy = () => {
    ReactDOM.unmountComponentAtNode(this.dom!)
    this.dom = null
    this.contentDOM = null
  }
}

export function withProsemirrorNodeView(
  NodeView: typeof ReactNodeView
) {
  return (
    node: ProsemirrorNode,
    view: EditorView,
    getPos: () => number,
    decorations: Decoration[]
  ) => new NodeView({ view, getPos, node, decorations })
}
