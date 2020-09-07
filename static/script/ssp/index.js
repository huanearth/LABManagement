/**
* author:苏晓
* 功能：系统入口组件
* 创建时间：2019-03-01
*/
import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./mainPage";
import Login from "./login";
import RegistrationForm from "./register";
import Header from "./header";
import Footer from "./footer";
import { LocaleProvider, Row, message} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import ApiUtil from "../utils/apiUtils";
import store from "./redux/Store";
import {Actions} from "./redux/Actions";

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLogin:false,
            isRegister:false,
        };

        this.userQuit = this.userQuit.bind(this);
        this.userLogin = this.userLogin.bind(this);
        this.userRegister = this.userRegister.bind(this);

    }

    render(){
        return(
            <div>
                <Row>
                    <Header/>
                </Row>
                <Row  style={{height: "87vh", display:'flex'}}>
                    {this.state.isLogin?
                        <MainPage
                            userQuit={this.userQuit}
                        />
                        :
                        <div>
                            {this.state.isRegister?
                                <RegistrationForm
                                    userLogin={this.userLogin}
                                    userRegister={this.userRegister}
                                />
                                :
                                <Login
                                    userLogin={this.userLogin}
                                    userRegister={this.userRegister}
                                />
                            }
                        </div>

                    }
                </Row>
                <Row>
                    <Footer/>
                </Row>
            </div>
        )
    }
    componentDidMount(){
        ApiUtil.userIsLogin((error, data)=>{
            if(!error){
                if(data === '' || data === null){
                    message.warning('登陆过期，请重新登录！')
                }else {
                    let functionsList = [];
                    data.role.functionRights.forEach((item)=>{functionsList.push(item.name)});
                    data.role.functionsList = functionsList;
                    store.dispatch(Actions.setUserInfo(data));
                    this.setState({
                        isLogin:true,
                    })
                }
            }else {
                message.error('自动登录失败！')
            }
        })
    }

    userLogin(){
        this.setState({
            isLogin:true,
        })
    }

    userRegister(){
        this.setState({
            isRegister: !this.state.isRegister,
        })
    }

    userQuit(){
        this.setState({
            isLogin:false,
        })
    }

}


ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Index>
        </Index>
    </LocaleProvider>,
    document.getElementById("root")
);
