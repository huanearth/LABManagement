/*
* author:苏晓
* 功能：登录组件
* 创建时间：2019-03-03
* */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col, message} from 'antd';
import 'antd/dist/antd.css';
import CommonUtils from "../utils/commonUtils";
import ApiUtil from "../utils/apiUtils";
import store from "./redux/Store";
import {Actions} from "./redux/Actions";

const Login = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                userName:'',
                password:'',
            }
        }

        render(){
            const { getFieldDecorator } = this.props.form;
            return(
                <Row style={{height: "87vh",width:'100vw', background:"url(style/images/background.png) center 0px no-repeat", backgroundSize:'cover'}}>
                    <Col span={16}>

                    </Col>
                    <Col span={8}>
                        <Form className="login-form" style={{width:'300px', top:'30%', position:'fixed'}}>
                            <Form.Item style={{marginBottom:'24px'}}>
                                {getFieldDecorator('studentId', {
                                    rules: [{ required: true, message: 'Please input your studentId!' }],
                                    initialValue: this.state.userName,
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.4)' }} />} placeholder="用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item style={{marginBottom:'24px'}}>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                    initialValue: this.state.password,
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.4)' }} />} type="password" placeholder="密码" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                    })
                                    (<div>
                                        <Checkbox >记住密码(保留7天)</Checkbox>
                                        <span style={{color:'black'}} onClick={()=>{this.handleRegister()}}>
                                            <a>立即注册</a>
                                        </span>
                                    </div>)
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{this.handleSubmit()}}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            )
        }

        componentWillMount(){
            let userName = CommonUtils.getCookie('lab538ManageUserName');
            let password = CommonUtils.getCookie(userName);
            this.state.userName = userName;
            this.state.password = password;
        }

        handleSubmit(){
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let params = {studentID:values.studentId, password: values.password};
                    ApiUtil.userLogin(params, (error, result)=>{
                        if(!error){
                            if(result.message !== 'success' || result.status !== '200'){
                                message.error(result.message);
                            }else {
                                let studentId = values.studentId;
                                if(values.remember){
                                    let password = values.password;
                                    CommonUtils.setCookie('lab538ManageUserName', studentId, 7);
                                    CommonUtils.setCookie(studentId, password, 7);
                                }else {
                                    CommonUtils.setCookie('lab538ManageUserName', studentId, 7);
                                }
                                let functionsList = [];
                                result.result[0].role.functionRights.forEach((item)=>{functionsList.push(item.name)});
                                result.result[0].role.functionsList = functionsList;
                                store.dispatch(Actions.setUserInfo(result.result[0]));
                                this.props.userLogin();
                            }
                        }else {
                            message.error('登录失败！');
                        }
                    });
                }
            });
        }

        handleRegister(){
            this.props.userRegister()
        }
    }
);

export default Login;