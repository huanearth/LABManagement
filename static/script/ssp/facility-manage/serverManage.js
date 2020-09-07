import React from 'react';
import {Button, Col, DatePicker, Row, Select, Table, Input, Modal, message} from "antd";
import ApiUtil from "../../utils/apiUtils";
import Config from "../../utils/config";
import moment from "moment";
import store from "../redux/Store";

const initialization = {deviceId:'1111111', brand:'戴尔', model:'2017Xwsad', cpuInfo:'1111', ROM:'1T', RAM:'16G', hostName:'服务器', userName: 'root', password:'123', rootPassword:'123', intranet:'192.168.1.1', extranetIP:'211.135.211.111', systemVersion:'ubuntu 16.6.4', currentSituation:'用于大绿色校园项目开发', timeIntoLab:moment()};

export default class ServerManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            serverList:[],
            isShowAddServerModel:false,
            isShowServerInfoModel:false,
            isShowServerUpdateModel:false,
            serverInfo:{},
            addServerList:{...initialization},
            updateServerList:{},
            pagination: {...Config.defaultPagination},
        };

        this.updateServerList = {};
        this.setClassName = this.setClassName.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleUpdateItemInfoChange = this.handleUpdateItemInfoChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdateModelCancel = this.handleUpdateModelCancel.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.getServersByParams = this.getServersByParams.bind(this);
        this.handleServerDelete = this.handleServerDelete.bind(this);
    }

    render(){
        const serverColumns =
            [{title: '设备编号', dataIndex: 'deviceId', width: '15%', align: 'center',},
                {title: '品牌', dataIndex: 'brand', width: '8%', align: 'center',},
                {title: '型号', dataIndex: 'model', width: '10%', align: 'center',},
                {title: '系统版本', dataIndex: 'systemVersion', width: '10%', align: 'center',},
                {title: '入柜时间', dataIndex: '', width: '10%', align: 'center', defaultSortOrder: 'descend', sorter: (a, b) => a.enrollmentYear - b.enrollmentYear,
                    render: (data)=>{return(moment(parseInt(data.timeIntoLab)).format('YYYY-MM-DD'))}
                },
                {title: '使用情况', dataIndex: 'currentSituation', width: '37%', align: 'center',},
                {title: '操作', dataIndex: '', width: '10%', align: 'center',
                    render: (data)=>{
                        return(
                            store.getState().userInfo.role.functionsList.indexOf('服务器管理') > -1?
                                <span>
                                    <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                                       onClick={()=>{
                                           let updateServerList = {...data};
                                          updateServerList.timeIntoLab = moment(parseInt(updateServerList.timeIntoLab));
                                           this.setState({
                                               isShowServerUpdateModel:true,
                                               updateServerList:updateServerList,
                                            });
                                           this.updateServerList = {...updateServerList};
                                       }}
                                    />
                                    <i title='详情' className="fa fa-file-text" aria-hidden="true" style={{paddingRight:'10px'}}
                                       onClick={()=>{this.setState({
                                           isShowServerInfoModel:true,
                                           serverInfo:data,
                                       })}}
                                    />
                                    <i title='删除' className="fa fa-trash" aria-hidden="true" onClick={()=>{this.handleServerDelete(data.id)}}/>
                                </span>
                                :
                                <span>
                                    <i title='详情' className="fa fa-file-text" aria-hidden="true" style={{paddingRight:'10px'}}
                                       onClick={()=>{this.setState({
                                           isShowServerInfoModel:true,
                                           serverInfo:data,
                                       })}}
                                    />
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
                                    if(store.getState().userInfo.role.functionsList.indexOf('服务器管理') > -1){
                                        this.setState({isShowAddServerModel:true})
                                    }else {
                                        message.warning('您无权添加服务器！')
                                    }
                                }}>
                            新增服务器
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Table columns={serverColumns}
                           dataSource={this.state.serverList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey='serverTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getServersByParams({currentPage:pagination.current, pageSize:pagination.pageSize});
                           }}
                    />
                </Row>
                <Modal
                    title="添加服务器"
                    visible={this.state.isShowAddServerModel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleAddSubmit}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({addServerList:{...initialization}})}}>重置</Button>,
                    ]}
                >
                    <div>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>设备编号:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.deviceId}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'deviceId')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>品牌:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.brand}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'brand')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>型号:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.model}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'model')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>处理器信息:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.cpuInfo}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'cpuInfo')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>硬盘大小:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.ROM}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'ROM')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>内存大小:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.RAM}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'RAM')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>主机名:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.hostName}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'hostName')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>用户名:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.userName}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'userName')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>用户名密码:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.password}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'password')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>root密码:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.rootPassword}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'rootPassword')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>内网IP:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.intranet}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'intranet')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>外网IP:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.extranetIP}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'extranetIP')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>系统版本:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.addServerList.systemVersion}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'systemVersion')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>入柜时间:</span>
                            </Col>
                            <Col span={8}>
                                <DatePicker style={{width:'100%'}} value={this.state.addServerList.timeIntoLab}
                                            onChange={(value)=>{this.handleAddItemInfoChange(value, 'timeIntoLab')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>使用情况:</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.addServerList.currentSituation}
                                       onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'currentSituation')}}
                                />
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <Modal
                    title="服务器详情"
                    visible={this.state.isShowServerInfoModel}
                    onCancel={()=>{this.handleInfoModelCancel()}}
                    footer={false}
                >
                    <div id='serverDetails'>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>设备编号:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.deviceId}
                            </Col>
                            <Col span={4}>
                                <span>品牌:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.brand}
                            </Col>
                        </Row>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>型号:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.model}
                            </Col>
                            <Col span={4}>
                                <span>处理器信息:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.cpuInfo}
                            </Col>
                        </Row>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>硬盘大小:</span>
                            </Col>
                            <Col span={8}>
                               {this.state.serverInfo.rom}
                            </Col>
                            <Col span={4}>
                                <span>内存大小:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.ram}
                            </Col>
                        </Row>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>主机名:</span>
                            </Col>
                            <Col span={8}>
                               {this.state.serverInfo.hostName}
                            </Col>
                            <Col span={4}>
                                <span>用户名:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.userName}
                            </Col>
                        </Row>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>用户密码:</span>
                            </Col>
                            <Col span={8}>
                                {store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1? this.state.serverInfo.password : '******'}
                            </Col>
                            <Col span={4}>
                                <span>root密码:</span>
                            </Col>
                            <Col span={8}>
                                {store.getState().userInfo.role.functionsList.indexOf('系统管理') > -1? this.state.serverInfo.rootPassword : '******'}
                            </Col>
                        </Row>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>内网IP:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.intranet}
                            </Col>
                            <Col span={4}>
                                <span>外网IP:</span>
                            </Col>
                            <Col span={8}>
                                {this.state.serverInfo.extranetIP}
                            </Col>
                        </Row>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>系统版本:</span>
                            </Col>
                            <Col span={8}>
                               {this.state.serverInfo.systemVersion}
                            </Col>
                            <Col span={4}>
                                <span>入柜时间:</span>
                            </Col>
                            <Col span={8}>
                                {moment(parseInt(this.state.serverInfo.timeIntoLab)).format('YYYY-MM-DD')}
                            </Col>
                        </Row>
                        <Row className='serverInfo' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>使用情况:</span>
                            </Col>
                            <Col span={20}>
                               {this.state.serverInfo.currentSituation}
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <Modal
                    title="修改服务器信息"
                    visible={this.state.isShowServerUpdateModel}
                    onCancel={this.handleUpdateModelCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleUpdateSubmit}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({updateServerList:{...this.updateServerList}})}}>重置</Button>,
                    ]}
                >
                    <div>
                        <Row className='updateServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>设备编号:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.deviceId}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'deviceId')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>品牌:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.brand}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'brand')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>型号:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.model}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'model')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>处理器信息:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.cpuInfo}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'cpuInfo')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>硬盘大小:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.rom}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'ROM')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>内存大小:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.ram}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'RAM')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>主机名:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.hostName}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'hostName')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>用户名:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.userName}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'userName')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>用户名密码:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.password}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'password')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>root密码:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.rootPassword}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'rootPassword')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>内网IP:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.intranet}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'intranet')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>外网IP:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.extranetIP}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'extranetIP')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>系统版本:</span>
                            </Col>
                            <Col span={8}>
                                <Input value={this.state.updateServerList.systemVersion}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'systemVersion')}}
                                />
                            </Col>
                            <Col span={4}>
                                <span>入柜时间:</span>
                            </Col>
                            <Col span={8}>
                                <DatePicker style={{width:'100%'}} value={this.state.updateServerList.timeIntoLab}
                                            onChange={(value)=>{this.handleUpdateItemInfoChange(value, 'timeIntoLab')}}
                                />
                            </Col>
                        </Row>
                        <Row className='addServer' style={{display:'flex'}}>
                            <Col span={4}>
                                <span>使用情况:</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.updateServerList.currentSituation}
                                       onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'currentSituation')}}
                                />
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getServersByParams({currentPage:this.state.pagination.current, pageSize:this.state.pagination.pageSize})
    }

    getServersByParams(params){
        ApiUtil.getServerByPage({...params}, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        serverList: data.result,
                    });
                }else {
                    message.error('服务器列表获取有误！')
                }
            }else {
                message.error('服务器列表获取失败！')
            }
        })
    }


    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleUpdateItemInfoChange(value, type){
        let updateServerList = this.state.updateServerList;
        switch (type) {
            case 'deviceId':
                updateServerList.deviceId = value;
                break;
            case 'brand':
                updateServerList.brand = value;
                break;
            case 'model':
                updateServerList.model = value;
                break;
            case 'cpuInfo':
                updateServerList.cpuInfo = value;
                break;
            case 'ROM':
                updateServerList.rom = value;
                break;
            case 'RAM':
                updateServerList.ram = value;
                break;
            case 'hostName':
                updateServerList.hostName = value;
                break;
            case 'userName':
                updateServerList.userName = value;
                break;
            case 'password':
                updateServerList.password = value;
                break;
            case 'rootPassword':
                updateServerList.rootPassword = value;
                break;
            case 'intranet':
                updateServerList.intranet = value;
                break;
            case 'extranetIP':
                updateServerList.extranetIP = value;
                break;
            case 'systemVersion':
                updateServerList.systemVersion = value;
                break;
            case 'currentSituation':
                updateServerList.currentSituation = value;
                break;
            case 'timeIntoLab':
                updateServerList.timeIntoLab = value;
                break;
            default:
                break;
        }
        this.setState({
            updateServerList:updateServerList,
        })
    }

    handleAddItemInfoChange(value, type){
        let addServerList = this.state.addServerList;
        switch (type) {
            case 'deviceId':
                addServerList.deviceId = value;
                break;
            case 'brand':
                addServerList.brand = value;
                break;
            case 'model':
                addServerList.model = value;
                break;
            case 'cpuInfo':
                addServerList.cpuInfo = value;
                break;
            case 'ROM':
                addServerList.ROM = value;
                break;
            case 'RAM':
                addServerList.RAM = value;
                break;
            case 'hostName':
                addServerList.hostName = value;
                break;
            case 'userName':
                addServerList.userName = value;
                break;
            case 'password':
                addServerList.password = value;
                break;
            case 'rootPassword':
                addServerList.rootPassword = value;
                break;
            case 'intranet':
                addServerList.intranet = value;
                break;
            case 'extranetIP':
                addServerList.extranetIP = value;
                break;
            case 'systemVersion':
                addServerList.systemVersion = value;
                break;
            case 'currentSituation':
                addServerList.currentSituation = value;
                break;
            case 'timeIntoLab':
                addServerList.timeIntoLab = value;
                break;
            default:
                break;
        }
        this.setState({
            addPeopleList:addServerList,
        })
    }

    handleServerDelete(id){
        ApiUtil.deleteServer(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getServersByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                }else {
                    message.error('服务器删除有误！')
                }
            }else {
                message.error('服务器删除失败！')
            }
        });
    }

    handleAddSubmit(){
        let params = {...this.state.addServerList};
        if(params.deviceId === '' || params.brand === '' || params.model === '' || params.cpuInfo === '' || params.ROM === '' || params.RAM === '' || params.hostName === '' ||
            params.password === '' || params.rootPassword === '' || params.intranet === '' || params.extranetIP === '' || params.systemVersion === '' ||
            params.currentSituation === '' || params.timeIntoLab === '' || params.userName === ''){
            message.warning('请完善服务器信息！')
        }else {
            params.ram = params.RAM;
            params.rom = params.ROM;
            params.timeIntoLab = params.timeIntoLab.valueOf();
            ApiUtil.addNewServer(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        this.getServersByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowAddServerModel:false,
                        })
                    }else {
                        message.error('服务器添加有误！')
                    }
                }else {
                    message.error('服务器添加失败！')
                }
            });
        }
    }

    handleUpdateSubmit(){
        let params = {...this.state.updateServerList};
        if(params.deviceId === '' || params.brand === '' || params.model === '' || params.cpuInfo === '' || params.ram === '' || params.rom === '' || params.hostName === '' ||
            params.password === '' || params.rootPassword === '' || params.intranet === '' || params.extranetIP === '' || params.systemVersion === '' ||
            params.currentSituation === '' || params.timeIntoLab === '' || params.userName === ''){
            message.warning('请完善服务器信息！')
        }else {
            params.timeIntoLab = params.timeIntoLab.valueOf();
            ApiUtil.updateServer(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        this.getServersByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowServerUpdateModel:false,
                            updateServerList:{},
                        });
                        this.updateServerList = {};
                    }else {
                        message.error('服务器修改有误！')
                    }
                }else {
                    message.error('服务器修改失败！')
                }
            });
        }
    }

    handleCancel(){
        this.setState({
            isShowAddServerModel: false,
        });
    }

    handleInfoModelCancel(){
        this.setState({
            isShowServerInfoModel: false,
        });
    }

    handleUpdateModelCancel(){
        this.setState({
            isShowServerUpdateModel: false,
        });
    }


}