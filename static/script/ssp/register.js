/**
* author:苏晓
* 功能：注册组件
* 创建时间：2019-03-04
*/
import React from 'react';
import { Form, Input, Radio, Button, Checkbox, Row, Col, Card, Icon, Select, message} from 'antd';
import 'antd/dist/antd.css';
import './register.css';
import ApiUtil from "../utils/apiUtils";

const RadioGroup = Radio.Group;

const Register = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                isShowRules:false,
                roleList:[],
            };

            this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.rulesIsChecked = this.rulesIsChecked.bind(this);
        }

        render(){
            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 8 },
                    sm: { span: 8 },
                    lg: { span: 8 },
                    md: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 16 },
                    sm: { span: 16 },
                    lg: { span: 16 },
                    md: { span: 16 },
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 24,
                        offset: 0,
                    },
                },
            };

            const genderOptions = [
                { label: '男', value: '男' },
                { label: '女', value: '女' },
            ];

            return(
                <div style={{height:'87vh', backgroundColor:'#a6d2e6'}}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className='registerForm'>
                        <Form.Item
                            label="学号"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('studentID', {
                                rules: [{
                                    required: true, message: '请输入学号!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入密码!',
                                }, {
                                    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,20})$', message:'密码必须是6-20位且同时包含数字和字母！'
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="确认密码"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('confirmPassword', {
                                rules: [{
                                    required: true, message: '请再次输入密码！',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="姓名"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    whitespace: true, message: '请不要包含空格！',
                                }, {
                                    required: true, message: '请输入姓名!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="注册角色"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('role', {
                                rules: [{
                                    required: true, message: '请选择角色！',
                                }],
                            })(
                                <Select >
                                    {this.state.roleList.map((item)=>{
                                        return <option value={item.id}>{item.roleName}</option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="性别"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('gender', {
                                initialValue:'男'
                            },{
                                rules: [{
                                    required: true, message: '请选择性别！',
                                }],
                            })(
                                <RadioGroup options={genderOptions} style={{width:'100%'}}/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="入学年份"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('enrollmentYear', {
                                rules: [{
                                    pattern: '^[1-9]\\d*$', message: '请输入数字！',
                                },{
                                    required: true, message: '请输入入学年份！',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: '邮箱格式有误！',
                                }, {
                                    required: true, message: '请输入邮箱！',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="联系方式"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入手机号码！' }],
                            })(
                                <Input style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout} style={{marginBottom:'0', textAlign:'center'}}>
                            <Row>
                                <Col span={12} style={{textAlign:'right'}}>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                    <Button onClick={()=>{this.props.userRegister()}}
                                            style={{marginLeft:'20px',backgroundColor:'#de4999',color:'white'}}
                                    >
                                        取消
                                    </Button>
                                </Col>
                                <Col span={2} style={{textAlign:'right'}}>
                                    {getFieldDecorator('agreeRules', {
                                        rules: [{ validator: this.rulesIsChecked, }],
                                    })(
                                        <Checkbox />
                                    )}
                                </Col>
                                <Col span={10} style={{textAlign:'left'}}>
                                    我同意lab538实验室<span style={{color:'#1890ff'}}><a onClick={()=>{this.setState({isShowRules:true})}} >条例规则</a></span>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                    {this.state.isShowRules?
                        <div>
                            <Card
                                title="lab538条例规则"
                                className='closeIcon'
                                extra={<Icon type="close" onClick={()=>{this.setState({isShowRules:false})}} className='icon'/>}
                            >
                                <p>走后锁门</p>
                                <p>放假断电</p>
                                <p>不准吸烟</p>
                            </Card>
                        </div> : null
                    }
                </div>
            )
        }

        componentDidMount(){
            ApiUtil.getAllRoles((error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        this.setState({
                            roleList:data.result,
                        });
                    }else {
                        message.error('获取角色列表有误！')
                    }
                }else {
                    message.error('获取角色列表失败！')
                }
            })
        }

        handleSubmit(e){
            e.preventDefault()
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let params = {};
                    params.applicantState = '待审核';
                    params.email = values.email;
                    params.enrollmentYear = values.enrollmentYear;
                    params.gender = values.gender;
                    params.password = values.password;
                    params.phoneNumber = values.phone;
                    params.roleId = values.role;
                    params.studentID = values.studentID;
                    params.name = values.name;
                    ApiUtil.registerNewUser(params, (error, result)=>{
                        if(!error){
                            if(result.message !== 'backup' || result.status !== '200'){
                                message.error(result.message);
                            }else {
                                this.props.userRegister()
                            }
                        }else {
                            message.error('注册失败！');
                        }
                    });
                }
            });
        }

        compareToFirstPassword(rule, value, callback){
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('两次输入的密码不一致！');
            } else {
                callback();
            }
        }

        rulesIsChecked(rule, value, callback){
            if (!value) {
                callback('请勾选lab538条例规则！');
            } else {
                callback();
            }
        }

    }
)

export default Register;