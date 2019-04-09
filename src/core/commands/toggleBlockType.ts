import { setBlockType } from 'prosemirror-commands'
import { EditorState, Transaction } from 'prosemirror-state';
import { Schema, NodeType } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

export default function toggleBlockType<S extends Schema = any>({ cmd, view, toggleType }: {
  cmd: (state: EditorState<S>, dispatch?: (tr: Transaction<S>) => void) => boolean;
  view: EditorView<S>
  toggleType: NodeType<S>
}) {
  const applicable = cmd(view.state)

  if (applicable) {
    cmd(view.state, view.dispatch)
  } else {
    setBlockType(toggleType)(view.state, view.dispatch)
  }
}
