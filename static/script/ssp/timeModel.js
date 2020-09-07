/**
* author:苏晓
* 功能：实时时间组件
* 创建时间：2019-03-08
*/
import React from 'react';
import moment from "moment";

//放到main.js中的话会一直渲染main.js及其以下的组件，所以单独拿出来
export default class TimeModel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        }

    }

    render(){
        return(
            <span>{this.state.currentTime}</span>
        )
    }

    componentDidMount(){
        setInterval(()=>{this.setState({currentTime:moment().format('YYYY-MM-DD HH:mm:ss')})}, 1000);
    }
}