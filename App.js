import React from 'react';

import generateStore from './redux/index'
import { Provider } from 'react-redux'
import {Main} from './Main';
const store = generateStore();
const App=()=>{
  return (<Provider store={store}><Main/></Provider>);
}
export default  App;