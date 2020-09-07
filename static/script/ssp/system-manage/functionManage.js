/**
 * author:苏晓
 * 功能：权限管理组件
 * 创建时间：2019-06-28
 */
import React from 'react';
import {Button, Col, Input, message, Modal, Row, Table} from "antd";
import ApiUtil from "../../utils/apiUtils";
import store from "../redux/Store";


export default class FunctionManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            functionName:'',
            functionList:[],
            isShowAddFunction:false,
            isShowEditFunction:false,
            editFunctionList:{},
            remark:'',
        };

        this.setClassName = this.setClassName.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleEditItemInfoChange = this.handleEditItemInfoChange.bind(this);
        this.getAllFunctions = this.getAllFunctions.bind(this);
        this.deleteFunction = this.deleteFunction.bind(this);
        this.handleUpdateItemSubmit = this.handleUpdateItemSubmit.bind(this);
    }

    render(){
        const expenditureColumns =
            [
                {title: '权限名称', dataIndex: 'name', width: '30%', align: 'center',},
                {title: '说明', dataIndex: 'remark', width: '50%', align: 'center',},
                {title: '说明', dataIndex: '', width: '20%', align: 'center',
                    render: (data)=>{
                        return(
                            <span>
                                <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                                   onClick={()=>{
                                       if(store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1){
                                           this.setState({
                                               isShowEditFunction:true,
                                               editFunctionList:{...data},
                                           })
                                       }else {
                                           message.warning('您无权修改权限！')
                                       }
                                   }}/>
                                <i title='删除' className="fa fa-trash" aria-hidden="true"
                                   onClick={()=>{
                                       if(store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1){
                                           this.deleteFunction(data.id)
                                       }else {
                                           message.warning('您无权删除权限！')
                                       }
                                   }}
                                />
                            </span>
                        )
                    }
                }
            ];
        return(
            <div>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}}
                                onClick={()=>{
                                    if(store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1){
                                        this.setState({isShowAddFunction:!this.state.isShowAddFunction})
                                    }else {
                                        message.warning('您无权添加权限！')
                                    }
                                }}
                        >
                            {this.state.isShowAddFunction? '取消' : '新增权限'}
                        </Button>
                    </Col>
                    {this.state.isShowAddFunction?
                        <div>
                            <Col span={18}>
                                <Row className='addRole' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>权限名称</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input value={this.state.functionName}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'functionName')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>说明</span>
                                    </Col>
                                    <Col span={12}>
                                        <Input value={this.state.remark}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'remark')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <Button style={{backgroundColor: '#6699cc', color:'white'}} onClick={()=>{this.handleAddItemSubmit()}}>提交</Button>
                                    </Col>
                                    <Col span={2}>
                                        <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                                onClick={()=>
                                                    this.setState({
                                                        functionName:'',
                                                        remark:'',
                                                    })}
                                        >
                                            重置
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </div> : null
                    }
                </Row>
                <Row>
                    <Table columns={expenditureColumns}
                           dataSource={this.state.functionList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey="functionTable"
                           className='functionTable'
                           pagination={false}
                    />
                </Row>
                <Modal
                    title="修改权限信息"
                    visible={this.state.isShowEditFunction}
                    onCancel={()=>{this.handleCancel()}}
                    footer={[
                        <Button key="submit" type="primary"
                                onClick={()=>{
                                    this.handleUpdateItemSubmit()
                                }}
                        >
                            提交
                        </Button>,
                        <Button key="reset" onClick={()=>{this.handleCancel()}}>取消</Button>,
                    ]}
                >
                    <Row style={{paddingBottom:'20px'}}>
                        <Col span={6}>
                            权限名称：
                        </Col>
                        <Col span={18}>
                            <Input value={this.state.editFunctionList.name}
                                   onChange={(event)=>{this.handleEditItemInfoChange(event.target.value, 'functionName')}}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            说明：
                        </Col>
                        <Col span={18}>
                            <Input value={this.state.editFunctionList.remark}
                                   onChange={(event)=>{this.handleEditItemInfoChange(event.target.value, 'remark')}}
                            />
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getAllFunctions();
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleAddItemInfoChange(value, type){
        switch (type) {
            case 'functionName':
                this.setState({
                    functionName:value,
                });
                break;
            case 'remark':
                this.setState({
                    remark:value,
                });
                break;
            default:
                break;
        }
    }

    handleEditItemInfoChange(value, type){
        switch (type) {
            case 'functionName':
                this.state.editFunctionList.name = value;
                break;
            case 'remark':
                this.state.editFunctionList.remark = value;
                break;
            default:
                break;
        }
        this.setState({});
    }

    handleAddItemSubmit(){
        if(this.state.functionName === '' || this.state.remark === ''){
            message.warning('请完善权限信息！')
        }else {
            let params = {name:this.state.functionName, remark:this.state.remark};
            ApiUtil.addNewFunction(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        this.setState({
                            isShowAddFunction:false,
                        });
                        this.getAllFunctions();
                    }else {
                        message.error('权限添加有误！')
                    }
                }else {
                    message.error('权限添加失败！')
                }
            });
        }
    }

    handleUpdateItemSubmit(){
        if(this.state.editFunctionList.name === '' || this.state.editFunctionList.remark === ''){
            message.warning('请完善权限信息！')
        }else {
            let params = {id:this.state.editFunctionList.id, name:this.state.editFunctionList.name, remark:this.state.editFunctionList.remark};
            ApiUtil.updateFunction(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        this.setState({
                            isShowEditFunction:false,
                        });
                        this.getAllFunctions();
                    }else {
                        message.error('权限添加有误！')
                    }
                }else {
                    message.error('权限添加失败！')
                }
            });
        }
    }

    getAllFunctions(){
        ApiUtil.getAllFunction((error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.setState({
                        functionList:data.result,
                    });
                }else {
                    message.error('获取权限列表有误！')
                }
            }else {
                message.error('获取权限列表失败！')
            }
        })
    }

    deleteFunction(id){
        ApiUtil.deleteFunction(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getAllFunctions();
                }
                message.success(data.message);
            }else {
                message.error('用户删除失败！')
            }
        })
    }

    handleCancel(){
        this.setState({
            isShowEditFunction:false,
            editFunctionList:{},
            remark:'',
            functionName:'',
        });
    }

}