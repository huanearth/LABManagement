/**
* author:苏晓
* 功能：布局架构设计组件
* 创建时间：2019-03-05
*/
import React from "react";
import { Row, Col, Icon, Badge, Dropdown, Menu, message} from 'antd';
import CommonUtils from "../utils/commonUtils";
import FundManage from './fund-manage/fundManage'
import FacilityManage from './facility-manage/facilityManage'
import SystemManage from './system-manage/systemManage'
import FileManage from './fileManage/fileManage'
import TimeModel from './timeModel'
import './mainPage.css'
import ApiUtil from "../utils/apiUtils";
import PersonalManage from "./personal-manage/personalManage";
import store from "./redux/Store";
import {Actions} from "./redux/Actions";

export default class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentPage: 'fundsManage',
            todoList:[],
        };

        this.currentPageChange = this.currentPageChange.bind(this);
        this.handleStudentRegister = this.handleStudentRegister.bind(this);
        this.getAllApplication = this.getAllApplication.bind(this);
    }


    render(){
        let menu =
            <Menu id='backlogTask'>
                {this.state.todoList.length === 0?
                    <Menu.Item key={0}>
                        <Row type="flex" justify="center" align="middle">注册列表为空</Row>
                    </Menu.Item>
                    :
                    <Menu.Item key={0}>
                        <Row type="flex" justify="center" align="middle">
                            <Col span={8}>
                                姓名
                            </Col>
                            <Col span={12}>
                                注册角色
                            </Col>
                            <Col span={4}>
                                操作
                            </Col>
                        </Row>

                    </Menu.Item>}
                {
                    this.state.todoList.map((item, index)=>
                        <Menu.Item key={index+1}>
                            <Row type="flex" justify="center" align="middle">
                                <Col span={8}>
                                    <span >{item.name}</span>
                                </Col>
                                <Col span={12}>
                                    <span >{item.role.roleName}</span>
                                </Col>
                                <Col span={2} style={{textAlign: 'center', display: 'flex', color:'green', fontSize:'20px'}}>
                                    <Icon title='同意' type="check" onClick={()=>this.handleStudentRegister(item, 'agree')} />
                                </Col>
                                <Col span={2} style={{textAlign: 'center', display: 'flex', color:'red', fontSize:'20px'}}>
                                    <Icon title='拒绝' type="close" onClick={()=>this.handleStudentRegister(item, 'refuse')}/>
                                </Col>
                            </Row>

                        </Menu.Item>
                    )
                }
            </Menu>;
        return(
            <div style={{width:'100vw'}}>
                <Row className='titleBar'>
                    <Col span={2}
                         className={this.state.currentPage === 'fundsManage'? 'activePage' : 'negativePage'}
                         onClick={this.currentPageChange}
                         id='fundsManage'
                    >
                        <span id='fundsManage'>经费管理</span>
                    </Col>
                    <Col span={2}
                         className={this.state.currentPage === 'facilityManage'? 'activePage' : 'negativePage'}
                         onClick={this.currentPageChange}
                         id='facilityManage'
                    >
                        <span id='facilityManage'>设备管理</span>
                    </Col>
                    <Col span={2}
                         className={this.state.currentPage === 'fileManage'? 'activePage' : 'negativePage'}
                         onClick={this.currentPageChange}
                         id='fileManage'
                    >
                        <span id='fileManage'>文件管理</span>
                    </Col>
                    <Col span={2}
                         className={this.state.currentPage === 'systemManage'? 'activePage' : 'negativePage'}
                         onClick={this.currentPageChange}
                         id='systemManage'
                    >
                        <span id='systemManage'>系统管理</span>
                    </Col>
                    <Col span={2}
                         className={this.state.currentPage === 'personalManage'? 'activePage' : 'negativePage'}
                         onClick={this.currentPageChange}
                         id='personalManage'
                    >
                        <span id='personalManage'>周计划管理</span>
                    </Col>

                    <Col span={4}>
                    </Col>
                    <Col span={4} style={{textAlign:'right', padding:'inherit'}}>
                        <TimeModel/>
                    </Col>
                    <Col span={1} style={{textAlign:'right', padding:'inherit'}}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Badge count={this.state.todoList.length} showZero={false}>
                                <Icon type="message" title='注册申请列表' theme="outlined" style={{fontSize:'25px'}} />
                            </Badge>
                        </Dropdown>
                    </Col>
                    <Col span={4} style={{padding:'inherit'}}>
                        <span>欢迎</span>{store.getState().userInfo.name}<span>登录！</span>
                    </Col>
                    <Col span={1} className='quitIcon' onClick={()=>this.props.userQuit()}>
                        <i className="fa fa-power-off" aria-hidden="true">退出</i>
                    </Col>
                </Row>
                <Row>
                    {this.state.currentPage === 'fundsManage'?
                        <FundManage/> : null
                    }
                    {this.state.currentPage === 'facilityManage'?
                        <FacilityManage/>: null
                    }
                    {this.state.currentPage === 'fileManage'?
                        <FileManage/> : null
                    }
                    {this.state.currentPage === 'systemManage'?
                        <SystemManage/> : null
                    }
                    {this.state.currentPage === 'personalManage'?
                        <PersonalManage/> : null
                    }
                </Row>
            </div>
        )

    }

    currentPageChange(e){
        this.setState({
            currentPage: e.target.id,
        })
    }

    componentDidMount(){
        this.getAllApplication();
    }

    handleStudentRegister(item, action){
        ApiUtil.agreeRegisterNewUser({...item, applicantState: action==='agree'? '已通过' : '已拒绝'}, (error, data)=>{
            if(!error){
                if(data.status !== '200'){
                    message.error(data.message)
                }else {
                    this.getAllApplication();
                }
            }else {
                message.error('通过请求失败！')
            }
        })
    }

    getAllApplication(){
        ApiUtil.getAllApplication((error, data)=>{
            if(!error){
                if(data.message !== 'backup' || data.status !== '200'){
                    message.error('获取申请列表有误!')
                }else {
                    this.setState({
                        todoList:data.result,
                    })
                }
            }else {
                message.error('获取申请列表失败！')
            }
        })
    }
}