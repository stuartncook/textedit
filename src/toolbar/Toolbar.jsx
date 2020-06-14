import React from 'react';
import UndoMenuButton from './UndoMenuButton';
import RedoMenuButton from './RedoMenuButton';

class Toolbar extends React.Component {
  render() {
    return (
      <div className="Toolbar">
        <UndoMenuButton
          editorState={this.props.editorState}
          dispatchTransaction={this.props.dispatchTransaction}
        />
        <RedoMenuButton
          editorState={this.props.editorState}
          dispatchTransaction={this.props.dispatchTransaction}
        />
      </div>
    ) 
  }

}

export default Toolbar;