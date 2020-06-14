import React from 'react';
import ProseMirrorEditorView from './mirror/ProseMirrorEditorView';
import Toolbar from './toolbar/Toolbar';
import {EditorState} from "prosemirror-state"
// import {schema} from "prosemirror-schema-basic"
import {schema, defaultMarkdownParser, defaultMarkdownSerializer} from "prosemirror-markdown"
import {Schema, DOMParser} from "prosemirror-model"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import 'prosemirror-view/style/prosemirror.css';
// import {undo, redo, history} from "prosemirror-history"
// import {keymap} from "prosemirror-keymap"
// import {baseKeymap} from "prosemirror-commands"
import './RichTextEditor.css'

import {Decoration, DecorationSet} from "prosemirror-view"
import { Plugin } from 'prosemirror-state'

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})



function placeholderPlugin(text) {
  return new Plugin({
    props: {
      decorations (state) {
        const doc = state.doc
  
        if (doc.childCount > 1 ||
          !doc.firstChild.isTextblock ||
          doc.firstChild.content.size > 0) return
  
        const placeHolder = document.createElement('div')
        placeHolder.classList.add('placeholder')
        placeHolder.textContent = text
  
        return DecorationSet.create(doc, [Decoration.widget(1, placeHolder)])
      }
    }
  })
}

export default class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    const plugins = exampleSetup({
      schema: mySchema,
      menuBar: false,
    })
    const placeholder = placeholderPlugin("Start typing here...")
    plugins.push(placeholder)
    this.state = {
      editorState: EditorState.create({
        schema: mySchema,
        plugins: plugins
      })
    }
    this.dispatchTransaction = this.dispatchTransaction.bind(this)
  }

  dispatchTransaction = (tx) => {
    console.log(tx.steps)
    const editorState = this.state.editorState.apply(tx);
    this.setState({editorState});
  };

  onEditorState = (editorState) => {
    this.setState({editorState});
  };

  render() {
    const {editorState} = this.state;
    return (
      <div>
        <Toolbar editorState={this.state.editorState} dispatchTransaction={this.dispatchTransaction} />
        <div className="editorview-wrapper">
          <ProseMirrorEditorView
            ref={this.onEditorView}
            editorState={editorState}
            onEditorState={this.onEditorState}
            dispatchTransaction={this.dispatchTransaction}
          />
        </div>
      </div>
    );
  }
}