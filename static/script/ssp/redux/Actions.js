/**
 * author:苏晓
 * 功能：redux中action行为组件
 * 创建时间：2019-06-02
 */

export const Actions = {

    setUserInfo: (userInfo)=>{
        return{
            type: 'setUserInfo',
            userInfo: userInfo
        }
    },
};