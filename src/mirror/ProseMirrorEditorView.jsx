import React from 'react';
import {EditorView} from "prosemirror-view"

/**
 * This wraps ProseMirror's EditorView into React component.
 */
class ProseMirrorEditorView extends React.Component {
  _createEditorView = (element) => {
    if (element != null) {
      this._editorView = new EditorView(element, {
        state: this.props.editorState,
        dispatchTransaction: this.props.dispatchTransaction,
      });
    }
  };

  focus() {
    if (this._editorView) {
      this._editorView.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    // In case we receive new EditorState through props — we apply it to the
    // EditorView instance.
    if (this._editorView) {
      if (nextProps.editorState !== this.props.editorState) {
        this._editorView.updateState(nextProps.editorState);
      }
    }
  }

  componentWillUnmount() {
    if (this._editorView) {
      this._editorView.destroy();
    }
  }

  shouldComponentUpdate() {
    // Note that EditorView manages its DOM itself so we'd ratrher don't mess
    // with it.
    return false;
  }

  render() {
    // Render just an empty div which is then used as a container for an
    // EditorView instance.
    return <div id="mirror" ref={this._createEditorView} />;
  }
} export default ProseMirrorEditorView