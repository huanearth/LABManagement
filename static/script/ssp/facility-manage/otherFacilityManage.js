import React from 'react';
import Config from "../../utils/config";
import moment from "moment";
import ApiUtil from "../../utils/apiUtils";
import {message, Row, Col, Table, Button, Input, Modal, DatePicker} from "antd";


export default class OtherFacilityManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            facilityModel:'',
            organization:'',
            isShowAddOtherFacilityModel:false,
            isShowOtherFacilityUpdateModel:false,
            otherFacilityList: [],
            pagination: {...Config.defaultPagination},
            updateOtherFacilityList:{},
            addOtherFacilityList:{facilityModel:'', code:'', startTime:moment(), organization:'', summary: ''},
        };

        this.updateOtherFacilityList = {};
        this.setClassName = this.setClassName.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAddItemSubmit = this.handleAddItemSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleUpdateItemInfoChange = this.handleUpdateItemInfoChange.bind(this);
        this.getOtherFacilityByPage = this.getOtherFacilityByPage.bind(this);
        this.handleOtherFacilityDelete = this.handleOtherFacilityDelete.bind(this);

    }

    render(){
        const otherFacilityColumns =
            [{title: '型号', dataIndex: 'facilityModel', width: '10%', align: 'center',},
                {title: '编号', dataIndex: 'code', width: '15%', align: 'center'},
                {title: '入室时间', dataIndex: 'startTime', width: '10%', align: 'center',
                    render:(data)=>{return moment(parseInt(data)).format("YYYY-MM-DD")}
                },
                {title: '所属机构', dataIndex: 'organization', width: '10%', align: 'center',},
                {title: '说明', dataIndex: 'summary', width: '40%', align: 'center',},
                {title: '操作', dataIndex: '', width: '15%', align: 'center',
                    render: (data)=>{
                        return(
                            <span>
                                <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                                   onClick={()=>{
                                       let updateOtherFacilityList = {...data};
                                       updateOtherFacilityList.startTime = moment(parseInt(updateOtherFacilityList.startTime));
                                       this.setState({
                                           isShowOtherFacilityUpdateModel:true,
                                           updateOtherFacilityList:{...updateOtherFacilityList},
                                       });
                                       this.updateOtherFacilityList = {...updateOtherFacilityList};
                                   }}
                                />
                                <i title='删除' className="fa fa-trash" aria-hidden="true" onClick={()=>{this.handleOtherFacilityDelete(data.id)}}/>
                            </span>
                        )
                    }
                }];
        return(
            <div>
                <Row className='searchZone' style={{display:'flex'}}>
                    <Col span={2}>型号</Col>
                    <Col span={4}>
                        <Input value={this.state.facilityModel} onChange={(event)=>{this.setState({facilityModel:event.target.value})}}/>
                    </Col>
                    <Col span={2}>所属机构</Col>
                    <Col span={4}>
                        <Input value={this.state.organization} onChange={(event)=>{this.setState({organization:event.target.value})}}/>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#6699cc', color:'white'}}
                                onClick={()=>{
                                    let params = {
                                        currentPage:Config.defaultPagination.current,
                                        pageSize:Config.defaultPagination.pageSize,
                                        facilityModel: this.state.facilityModel,
                                        organization: this.state.organization,
                                    };
                                    this.getOtherFacilityByPage(params);
                                }}
                        >
                            查询
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#EFA718', color:'white'}} onClick={()=>{this.setState({facilityModel:'',organization:''})}}>重置</Button>
                    </Col>
                </Row>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}} onClick={()=>this.setState({isShowAddOtherFacilityModel:!this.state.isShowAddOtherFacilityModel})}>
                            {this.state.isShowAddOtherFacilityModel? '取消' : '新增设备'}
                        </Button>
                    </Col>
                    {this.state.isShowAddOtherFacilityModel?
                        <div>
                            <Col span={20}>
                                <Row className='addOtherFacility' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>型号</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input value={this.state.addOtherFacilityList.facilityModel}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'facilityModel')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>编号（选填）</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input value={this.state.addOtherFacilityList.code}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'code')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>入室时间</span>
                                    </Col>
                                    <Col span={4}>
                                        <DatePicker style={{width:'100%'}} value={this.state.addOtherFacilityList.startTime}
                                                    onChange={(value)=>{this.handleAddItemInfoChange(value, 'startTime')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>所属机构</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input value={this.state.addOtherFacilityList.organization}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'organization')}}/>
                                    </Col>
                                </Row>
                                <Row className='addOtherFacility' style={{display:'flex', paddingTop:'5px'}}>
                                    <Col span={2}>
                                        <span>说明</span>
                                    </Col>
                                    <Col span={22}>
                                        <Input value={this.state.addOtherFacilityList.summary}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'summary')}}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <Row style={{textAlign:'center'}}>
                                    <Button style={{backgroundColor: '#6699cc', color:'white'}} onClick={()=>{this.handleAddItemSubmit()}}>提交</Button>
                                </Row>
                                <Row style={{textAlign:'center'}}>
                                    <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                            onClick={()=>
                                                this.setState({
                                                    addOtherFacilityList:{facilityModel:'', code:'', startTime:'', organization:'', summary: ''},
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
                    <Table columns={otherFacilityColumns}
                           dataSource={this.state.otherFacilityList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey='otherFacilityTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getOtherFacilityByPage({currentPage:pagination.current, pageSize:pagination.pageSize});
                           }}
                    />
                </Row>
                <Modal
                    title="修改设备信息"
                    visible={this.state.isShowOtherFacilityUpdateModel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleUpdateSubmit}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({updateOtherFacilityList:{...this.updateOtherFacilityList}})}}>重置</Button>,
                    ]}
                >
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>型号</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateOtherFacilityList.facilityModel}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'facilityModel')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>编号</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateOtherFacilityList.code}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'code')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>入室时间</span>
                        </Col>
                        <Col span={16}>
                            <DatePicker style={{width:'100%'}} value={this.state.updateOtherFacilityList.startTime}
                                        onChange={(value)=>{this.handleUpdateItemInfoChange(value, 'startTime')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>所属机构</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateOtherFacilityList.organization}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'organization')}}/>
                        </Col>
                    </Row>
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>说明</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateOtherFacilityList.summary}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'summary')}}/>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getOtherFacilityByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleCancel(){
        this.setState({
            isShowOtherFacilityUpdateModel: false,
        });
    }

    handleAddItemSubmit(){
        let params = {...this.state.addOtherFacilityList};
        if(params.facilityModel === '' || params.startTime === '' || params.summary === '' || params.organization === ''){
            message.warning('请完善设备信息！')
        }else {
            params.startTime = params.startTime.valueOf();
            ApiUtil.addNewOtherFacility(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('设备添加成功！');
                        this.getOtherFacilityByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowAddOtherFacilityModel:false,
                            addOtherFacilityList:{facilityModel:'', code:'', startTime:'', organization:'', summary: ''},
                        })
                    }else {
                        message.error('设备添加有误！')
                    }
                }else {
                    message.error('设备添加失败！')
                }
            });
        }
    }

    handleUpdateSubmit(){
        let params = {...this.state.updateOtherFacilityList};
        if(params.facilityModel === '' || params.startTime === '' || params.summary === '' || params.organization === ''){
            message.warning('请完善设备信息！')
        }else {
            params.startTime = params.startTime.valueOf();
            ApiUtil.updateOtherFacility(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('设备添加成功！');
                        this.getOtherFacilityByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowOtherFacilityUpdateModel:false,
                            updateOtherFacilityList:{facilityModel:'', code:'', startTime:'', organization:'', summary: ''},
                        })
                    }else {
                        message.error('设备添加有误！')
                    }
                }else {
                    message.error('设备添加失败！')
                }
            });
        }
    }

    handleAddItemInfoChange(value, type){
        let addOtherFacilityList = this.state.addOtherFacilityList;
        switch (type) {
            case 'code':
                addOtherFacilityList.code = value;
                break;
            case 'summary':
                addOtherFacilityList.summary = value;
                break;
            case 'startTime':
                addOtherFacilityList.startTime = value;
                break;
            case 'facilityModel':
                addOtherFacilityList.facilityModel = value;
                break;
            case 'organization':
                addOtherFacilityList.organization = value;
                break;
            default:
                break;
        }
        this.setState({
            addOtherFacilityList:addOtherFacilityList,
        })
    }

    handleUpdateItemInfoChange(value, type){
        let updateOtherFacilityList = this.state.updateOtherFacilityList;
        switch (type) {
            case 'code':
                updateOtherFacilityList.code = value;
                break;
            case 'summary':
                updateOtherFacilityList.summary = value;
                break;
            case 'startTime':
                updateOtherFacilityList.startTime = value;
                break;
            case 'facilityModel':
                updateOtherFacilityList.facilityModel = value;
                break;
            case 'organization':
                updateOtherFacilityList.organization = value;
                break;
            default:
                break;
        }
        this.setState({
            updateOtherFacilityList:updateOtherFacilityList,
        })
    }

    getOtherFacilityByPage(params){
        ApiUtil.getOtherFacilityByPage(params, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        otherFacilityList: data.result,
                    });
                }else {
                    message.error('其他设备列表获取有误！')
                }
            }else {
                message.error('其他设备列表获取失败！')
            }
        });
    }

    handleOtherFacilityDelete(id){
        ApiUtil.deleteOtherFacility(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    message.success('其他设备删除成功！');
                    this.getOtherFacilityByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                }else {
                    message.error('其他设备删除有误！')
                }
            }else {
                message.error('其他设备删除失败！')
            }
        });
    }
}