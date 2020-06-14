import React from 'react';
import './App.css';
import RichTextEditor from './RichTextEditor'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <RichTextEditor />
        {/* <Toolbar func={this.output}/>
        <Mirror /> */}
      </div>
    )
  }
}

export default App;