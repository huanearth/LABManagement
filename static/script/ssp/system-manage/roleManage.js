/**
* author:苏晓
* 功能：角色管理组件
* 创建时间：2019-03-10
*/
import React from 'react';
import {Button, Col, Row, Table, Input, message, Select, Modal} from "antd";
import ApiUtil from "../../utils/apiUtils";
import store from "../redux/Store";

export default class RoleManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roleName:'',
            remark:'',
            roleFunctionList:'',
            roleList:[],
            functionList:[],
            isShowAddRole:false,
            isShowRoleUpdateModel:false,
            updateRoleList:{},
        };

        this.updateRoleList = {};
        this.functionIdNameMap = new Map();
        this.setClassName = this.setClassName.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleUpdateItemInfoChange = this.handleUpdateItemInfoChange.bind(this);
        this.getAllRole = this.getAllRole.bind(this);
        this.getAllFunctions = this.getAllFunctions.bind(this);
        this.handleRoleDelete = this.handleRoleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    }

    render(){
        let roleFunctionList = this.state.roleFunctionList.split(',')[0] === ''? [] : this.state.roleFunctionList.split(',');
        const expenditureColumns =
            [{title: '角色名称', dataIndex: 'roleName', width: '30%', align: 'center',} ,
             {title: '说明', dataIndex: 'remark', width: '30%', align: 'center',},
             {title: '权限列表', dataIndex: 'functionRights', width: '30%', align: 'center',
                render:(data)=>{
                    let functions = '';
                    data.forEach(item=>{functions = functions+item.name + ','});
                    return functions.slice(0, functions.length-1);
                }
             },
             {title: '操作', dataIndex: '', width: '10%', align: 'center',
                render:(data)=>{
                    return(
                        <span>
                            <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                               onClick={()=>{
                                   if(store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1){
                                       let updateOtherFacilityList = {...data};
                                       let functionsList = [];
                                       updateOtherFacilityList.functionRights.forEach(item=>{functionsList.push(item.name)});
                                       updateOtherFacilityList.functionRights = functionsList;
                                       this.setState({
                                           isShowRoleUpdateModel:true,
                                           updateRoleList:{...updateOtherFacilityList},
                                       });
                                       this.updateRoleList = {...updateOtherFacilityList};
                                   }else {
                                       message.warning('您无权修改角色信息！');
                                   }

                               }}
                            />
                            <i title='删除' className="fa fa-trash" aria-hidden="true"
                               onClick={()=>{
                                   if(store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1){
                                       this.handleRoleDelete(data.id)
                                   }else {
                                       message.warning('您无权删除角色！')
                                   }
                               }}/>
                        </span>
                    )
                }
             },
            ];

        return(
            <div>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}}
                                onClick={()=>{
                                    if(store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1){
                                        this.setState({isShowAddRole:!this.state.isShowAddRole})
                                    }else{
                                        message.warning('您无权添加角色！')
                                    }
                                }}
                        >
                            {this.state.isShowAddRole? '取消' : '新增角色'}
                        </Button>
                    </Col>
                    {this.state.isShowAddRole?
                        <div>
                            <Col span={18}>
                                <Row className='addRole' style={{display:'flex'}}>
                                    <Col span={3}>
                                        <span>角色名称</span>
                                    </Col>
                                    <Col span={5}>
                                        <Input value={this.state.roleName}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'roleName')}}
                                        />
                                    </Col>
                                    <Col span={3}>
                                        <span>说明</span>
                                    </Col>
                                    <Col span={13}>
                                        <Input value={this.state.remark}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'remark')}}
                                        />
                                    </Col>
                                </Row>
                                <Row className='addRole' style={{paddingTop:'5px'}}>
                                    <Col span={3}>
                                        权限列表
                                    </Col>
                                    <Col span={21}>
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="请选择权限"
                                            value={roleFunctionList}
                                            onChange={(value)=>{this.handleAddItemInfoChange(`${value}`, 'roleFunctionsList')}}
                                        >
                                            {this.state.functionList.map((item)=>
                                                <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                                            )}
                                        </Select>
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
                                                    roleName:'',
                                                    remark:'',
                                                    roleFunctionList:'',
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
                    <Table columns={expenditureColumns}
                           dataSource={this.state.roleList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey="roleTable"
                           className='roleTable'
                           pagination={false}
                    />
                </Row>
                <Modal
                    title="修改角色信息"
                    visible={this.state.isShowRoleUpdateModel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleUpdateSubmit}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({updateRoleList:{...this.updateRoleList}})}}>重置</Button>,
                    ]}
                >
                    <Row>
                        <Col span={8}>
                            <span>角色名称</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateRoleList.roleName}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'roleName')}}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <span>说明</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateRoleList.remark}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'remark')}}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            权限列表
                        </Col>
                        <Col span={16}>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择权限"
                                value={this.state.updateRoleList.functionRights}
                                onChange={(value)=>{this.handleUpdateItemInfoChange(`${value}`, 'functionRights')}}
                            >
                                {this.state.functionList.map((item)=>
                                    <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getAllRole();
        this.getAllFunctions();
    }

    handleAddItemSubmit(){
        if(this.state.roleName === '' || this.state.remark === '' || this.state.roleFunctionList === ''){
            message.warning('请完善角色信息！')
        }else {
            let functions = '';
            this.state.roleFunctionList.split(',').forEach(item=>{functions = functions + this.functionIdNameMap.get(item) + ','});
            let params = {roleName:this.state.roleName, remark:this.state.remark, functions:functions.slice(0, functions.length-1)};
            ApiUtil.addNewRole(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('角色添加成功！');
                        this.setState({
                            isShowAddRole:false,
                        });
                        this.getAllRole();
                    }else {
                        message.error('角色添加有误！')
                    }
                }else {
                    message.error('角色添加失败！')
                }
            })
        }
    }

    handleUpdateSubmit(){
        let updateRoleList = this.state.updateRoleList;
        if(updateRoleList.roleName === '' || updateRoleList.remark === '' || updateRoleList.roleFunctionList === []){
            message.warning('请完善角色信息！')
        }else {
            let functions = '';
            updateRoleList.functionRights.forEach(item=>{functions = functions + this.functionIdNameMap.get(item) + ','});
            let params = {id:updateRoleList.id, roleName:updateRoleList.roleName, remark:updateRoleList.remark, functions:functions.slice(0, functions.length-1)};
            ApiUtil.updateRole(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('角色修改成功！');
                        this.setState({
                            isShowRoleUpdateModel:false,
                        });
                        this.getAllRole();
                    }else {
                        message.error('角色修改有误！')
                    }
                }else {
                    message.error('角色修改失败！')
                }
            })
        }
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleAddItemInfoChange(value, type){
        switch (type) {
            case 'roleName':
                this.setState({
                    roleName:value,
                });
                break;
            case 'remark':
                this.setState({
                    remark:value,
                });
                break;
            case 'roleFunctionsList':
                this.setState({
                    roleFunctionList:value,
                });
                break;
            default:
                break;
        }
    }

    handleUpdateItemInfoChange(value, type){
        let updateRoleList = this.state.updateRoleList;
        switch (type) {
            case 'roleName':
                updateRoleList.roleName = value;
                break;
            case 'remark':
                updateRoleList.remark = value;
                break;
            case 'functionRights':
                updateRoleList.functionRights = value.split(',');
                break;
            default:
                break;
        }
        this.setState({
            updateRoleList:updateRoleList,
        })
    }

    handleRoleDelete(id){
        ApiUtil.deleteRole(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    message.success('角色删除成功！');
                    this.getAllRole();
                }else {
                    message.error('角色删除有误！')
                }
            }else {
                message.error('角色删除失败！')
            }
        });
    }

    getAllRole(){
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

    getAllFunctions(){
        ApiUtil.getAllFunction((error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.setState({
                        functionList:data.result,
                    });
                    data.result.forEach(item=>{
                        this.functionIdNameMap.set(item.name, item.id);
                    })
                }else {
                    message.error('获取权限列表有误！')
                }
            }else {
                message.error('获取权限列表失败！')
            }
        })
    }

    handleCancel(){
        this.setState({
            isShowRoleUpdateModel:false,
            updateRoleList:{},
        })
    }

}