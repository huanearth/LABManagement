/**
 * author:苏晓
 * 功能：redux中reducer组件
 * 创建时间：2019-06-02
 */

import { combineReducers } from 'redux'

function userInfo(state = {}, action) {
    switch (action.type) {
        case 'setUserInfo':
            return action.userInfo;
        case 'resetAllInfo':
            return state;
        default:
            return state
    }
}

export default combineReducers({
    userInfo,
});