/**
 * author:苏晓
 * 功能：redux中store组件
 * 创建时间：2019-06-02
 */

import {createStore} from 'redux'
import reducer from './Reducer.js';

const store = createStore(reducer);

export default store;