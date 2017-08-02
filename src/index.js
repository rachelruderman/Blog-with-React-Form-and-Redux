import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
//BrowserRouter says: I want react router to look at the entire url when deciding what to display on the screen. It's a piece of code that interacts with the history library

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component{
  render(){ return <div>Hello</div> }
}

class Goodbye extends React.Component{
  render(){ return <div>Goodbye</div> }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {/* <App /> */}
    <BrowserRouter>
      <div>
      {/* if a user goes to this path, i want to show this component */}
        <Route path='/hello' component={Hello}/>
        <Route path='/goodbye' component={Goodbye}/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
