/**
* author:苏晓
* 功能：人员管理组件
* 创建时间：2019-03-10
*/
import React from 'react';
import {Button, Col, DatePicker, Row, Select, Table, Input, message, Modal} from "antd";
import ApiUtil from "../../utils/apiUtils";
import CommonUtils from "../../utils/commonUtils";
import store from "../redux/Store";

export default class PeopleManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            peopleList:[],
            isShowAddPeopleModel:false,
            isShowUpdatePeopleModel:false,
            addPeopleList:{name:'', gender:'男', enrollmentYear:'',  studentID:'', phoneNumber:'', email:'', password:'', roleId:''},
            updatePeopleList:{},
            roleList:[],
        };

        this.setClassName = this.setClassName.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleUpdatePeopleChange = this.handleUpdatePeopleChange.bind(this);
        this.getRoleList = this.getRoleList.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render(){
        const peopleColumns =
            [{title: '姓名', dataIndex: 'name', width: '10%', align: 'center',},
             {title: '性别', dataIndex: 'gender', width: '10%', align: 'center',},
             {title: '学号', dataIndex: 'studentID', width: '15%', align: 'center',},
             {title: '角色', dataIndex: 'role.roleName', width: '15%', align: 'center',},
             {title: '入学年份', dataIndex: 'enrollmentYear', width: '10%', align: 'center', defaultSortOrder: 'descend', sorter: (a, b) => a.enrollmentYear - b.enrollmentYear,},
             {title: '手机号码', dataIndex: 'phoneNumber', width: '15%', align: 'center',},
             {title: '邮箱', dataIndex: 'email', width: '15%', align: 'center',},
             {title: '操作', dataIndex: '', width: '10%', align: 'center',
                render: (data)=>{
                    return(
                        <span>
                            <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                               onClick={()=>{
                                   if(store.getState().userInfo.role.functionsList.indexOf('人员管理') > -1){
                                       data.roleId = data.role.id;
                                       console.log(data);
                                       this.setState({
                                           updatePeopleList:{...data},
                                           isShowUpdatePeopleModel:true,
                                       });
                                   }else {
                                       message.warning('您无权修改人员！')
                                   }

                               }}/>
                            <i title='删除' className="fa fa-trash" aria-hidden="true"
                               onClick={()=>{
                                   if(store.getState().userInfo.role.functionsList.indexOf('人员管理') > -1){
                                       this.deleteUser(data.id)
                                   }else {
                                       message.warning('您无权删除人员！')
                                   }
                               }}/>
                        </span>
                    )
                }
             }];

        return(
            <div>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}}
                                onClick={()=>{
                                    store.getState().userInfo.role.functionsList.indexOf('人员管理') > -1?
                                        this.setState({
                                            isShowAddPeopleModel:!this.state.isShowAddPeopleModel
                                        }) : message.warning('您无权添加人员！')
                                    ;

                                }}
                        >
                            {this.state.isShowAddPeopleModel? '取消' : '新增人员'}
                        </Button>
                    </Col>
                    {this.state.isShowAddPeopleModel?
                        <div>
                            <Col span={20}>
                                <Row className='addExpenditure' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>姓名</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input value={this.state.addPeopleList.name}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'name')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>性别</span>
                                    </Col>
                                    <Col span={4}>
                                        <Select value={this.state.addPeopleList.gender}
                                                onChange={(value)=>{this.handleAddItemInfoChange(value, 'gender')}}
                                                style={{width:'100%'}}
                                        >
                                            <option value='男'>男</option>
                                            <option value='女'>女</option>
                                        </Select>
                                    </Col>
                                    <Col span={2}>
                                        <span>入学年份</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input value={this.state.addPeopleList.enrollmentYear}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'enrollmentYear')}}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>角色</span>
                                    </Col>
                                    <Col span={3}>
                                        <Select value={this.state.addPeopleList.roleId}
                                                onChange={(value)=>{this.handleAddItemInfoChange(value, 'role')}}
                                                style={{width:'100%'}}
                                        >
                                            {this.state.roleList.map((item)=>{
                                                return <option key={item.id} value={item.id}>{item.roleName}</option>
                                            })}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row className='addPeople' style={{display:'flex', marginTop:'5px'}}>
                                    <Col span={2}>
                                        <span>学号</span>
                                    </Col>
                                    <Col span={6}>
                                        <Input value={this.state.addPeopleList.studentID}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'studentId')}}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>电话</span>
                                    </Col>
                                    <Col span={5}>
                                        <Input value={this.state.addPeopleList.phoneNumber}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'phone')}}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>邮箱</span>
                                    </Col>
                                    <Col span={6}>
                                        <Input value={this.state.addPeopleList.email}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'email')}}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <Row>
                                    <Button style={{backgroundColor: '#6699cc', color:'white'}} onClick={()=>{this.handleAddItemSubmit()}}>提交</Button>
                                </Row>
                                <Row>
                                    <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                            onClick={()=>
                                                this.setState({
                                                    addPeopleList:{name:'', gender:'男', enrollmentYear:'',  studentID:'', phoneNumber:'', email:'', password:'', roleId:''},
                                                })}
                                    >
                                        重置
                                    </Button>
                                </Row>
                            </Col>
                        </div> : null
                    }
                </Row>
                <Row>
                    <Table columns={peopleColumns}
                           dataSource={this.state.peopleList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           pagination={false}
                           rowKey='peopleTable'
                    />
                </Row>
                <Modal
                    title="修改用户信息"
                    visible={this.state.isShowUpdatePeopleModel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary"
                                onClick={()=>{
                                    this.updateUser()
                                }}
                        >
                            提交
                        </Button>,
                        <Button key="reset" onClick={()=>{this.setState({isShowUpdatePeopleModel:false})}}>取消</Button>,
                    ]}
                >
                    <div id='updatePeopleModel'>
                        <Row >
                            <Col span={4}>
                                <span>学号</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.updatePeopleList.studentID}
                                       onChange={(event)=>{this.handleUpdatePeopleChange(event.target.value, 'studentId')}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={4}>
                                <span>姓名</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.updatePeopleList.name}
                                       onChange={(event)=>{this.handleUpdatePeopleChange(event.target.value, 'name')}}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <span>性别</span>
                            </Col>
                            <Col span={20}>
                                <Select value={this.state.updatePeopleList.gender}
                                        onChange={(value)=>{this.handleUpdatePeopleChange(value, 'gender')}}
                                        style={{width:'100%'}}
                                >
                                    <option value='男' key='man'>男</option>
                                    <option value='女' key='woman'>女</option>
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <span>入学年份</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.updatePeopleList.enrollmentYear}
                                       onChange={(event)=>{this.handleUpdatePeopleChange(event.target.value, 'enrollmentYear')}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <span>角色</span>
                            </Col>
                            <Col span={20}>
                                <Select value={this.state.updatePeopleList.roleId}
                                        onChange={(value)=>{this.handleUpdatePeopleChange(value, 'role')}}
                                        style={{width:'100%'}}
                                >
                                    {this.state.roleList.map((item)=>{
                                        return <option key={item.id} value={item.id}>{item.roleName}</option>
                                    })}
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <span>电话</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.updatePeopleList.phoneNumber}
                                       onChange={(event)=>{this.handleUpdatePeopleChange(event.target.value, 'phone')}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <span>邮箱</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.updatePeopleList.email}
                                       onChange={(event)=>{this.handleUpdatePeopleChange(event.target.value, 'email')}}/>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getUserList();
        this.getRoleList();

    }

    handleAddItemSubmit(){
        console.log(this.state.addPeopleList);
        ApiUtil.addNewUser(this.state.addPeopleList, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.setState({
                        isShowAddPeopleModel:false,
                    });
                    this.getUserList();
                }else {
                    message.error('用户添加有误！')
                }
            }else {
                message.error('用户添加失败！')
            }
        });
    }

    deleteUser(id){
        ApiUtil.deleteUser(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getUserList();
                }
                message.success(data.message);
            }else {
                message.error('用户删除失败！')
            }
        })
    }

    updateUser(){
        let updatePeopleList = {...this.state.updatePeopleList};
        delete updatePeopleList.password;
        delete updatePeopleList.role;
        ApiUtil.updataUser(updatePeopleList, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    message.success('用户修改成功！');
                    this.updatePeopleList = {};
                    this.setState({
                        isShowUpdatePeopleModel: false,
                        updatePeopleList:{},
                    });
                    this.getUserList();
                }else {
                    message.error('用户修改有误！');
                }
            }else {
                message.error('用户修改失败！')
            }
        });
        console.log(updatePeopleList)
    }

    handleCancel(){
        this.setState({
            isShowUpdatePeopleModel: false,
            updatePeopleList:{},
        });
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleAddItemInfoChange(value, type){
        let addPeopleList = this.state.addPeopleList;
        switch (type) {
            case 'name':
                addPeopleList.name = value;
                break;
            case 'gender':
                addPeopleList.gender = value;
                break;
            case 'enrollmentYear':
                addPeopleList.enrollmentYear = value
                break;
            case 'studentId':
                addPeopleList.studentID = value;
                addPeopleList.password = value;
                break;
            case 'role':
                addPeopleList.roleId = value;
                break;
            case 'phone':
                addPeopleList.phoneNumber = value;
                break;
            case 'email':
                addPeopleList.email = value;
                break;
            default:
                break;
        }
        this.setState({
            addPeopleList:addPeopleList,
        })
    }

    handleUpdatePeopleChange(value, type){
        let updatePeopleList = this.state.updatePeopleList;
        switch (type) {
            case 'name':
                updatePeopleList.name = value;
                break;
            case 'gender':
                updatePeopleList.gender = value;
                break;
            case 'enrollmentYear':
                updatePeopleList.enrollmentYear = value
                break;
            case 'studentId':
                updatePeopleList.studentID = value;
                break;
            case 'role':
                updatePeopleList.roleId = value;
                break;
            case 'phone':
                updatePeopleList.phoneNumber = value;
                break;
            case 'email':
                updatePeopleList.email = value;
                break;
            default:
                break;
        }
        this.setState({
            updatePeopleList:updatePeopleList,
        })
    }

    getUserList(){
        ApiUtil.getAllUsers((error, data)=>{
            if(!error){
                if(data.status === '200' && data.message === 'backup'){
                    this.setState({
                        peopleList: data.result,
                    })
                }else {
                    message.error(data.message)
                }
            }else {
                message.error('获取用户列表失败！')
            }
        });
    }

    getRoleList(){
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

}