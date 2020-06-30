import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter} from 'react-router-dom'

// redux-related imports
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);







//====================================
// JUS TESTING THE Spread syntax operator or the "Rest operator"
// let myObj = {
//   name: 'omerson',
//   age: 28,
//   healed: true,
//   rich: 'yes'
// }

// let funct = ({rich,...spreadArg })  => {
//   console.log('spreadArg: ',spreadArg)
//   console.log('rich: ', rich)
// }

// funct(myObj)

