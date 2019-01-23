import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.scss'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'PeopleDB'
        };

    }

    render() {
      return (
        <div className='header' >
         {this.state.title}
        </div>
      );
    }
  }
  
  export default App;
  

ReactDOM.render(<App />, document.getElementById('root'));
