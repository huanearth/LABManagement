/**
 * author:苏晓
 * 功能：显示器管理组件
 * 创建时间：2019-03-09
 */
import React from 'react';
import ApiUtil from "../../utils/apiUtils";
import Config from "../../utils/config";
import {message, Row, Col, Table, Button, Input, Modal} from "antd";


export default class ScreenManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowAddScreenModel:false,
            isShowScreenUpdateModel:false,
            screenList: [],
            pagination: {...Config.defaultPagination},
            updateScreenList:{},
            addScreenList:{displayModel:'', code:'', owner:'', summary: ''},
        };

        this.updateScreenList = {};
        this.setClassName = this.setClassName.bind(this);
        this.getScreenByPage = this.getScreenByPage.bind(this);
        this.handleScreenDelete = this.handleScreenDelete.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleUpdateItemInfoChange = this.handleUpdateItemInfoChange.bind(this);
        this.handleAddItemSubmit = this.handleAddItemSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    }

    render(){
        const screenColumns =
            [{title: '型号', dataIndex: 'displayModel', width: '15%', align: 'center',},
                {title: '编号', dataIndex: 'code', width: '15%', align: 'center'},
                {title: '使用者', dataIndex: 'owner', width: '15%', align: 'center',},
                {title: '说明', dataIndex: 'summary', width: '35%', align: 'center',},
                {title: '操作', dataIndex: '', width: '20%', align: 'center',
                    render: (data)=>{
                        return(
                            <span>
                                <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                                   onClick={()=>{
                                       this.setState({
                                           isShowScreenUpdateModel:true,
                                           updateScreenList:{...data},
                                       });
                                       this.updateScreenList = {...data};
                                   }}
                                />
                                <i title='删除' className="fa fa-trash" aria-hidden="true" onClick={()=>{this.handleScreenDelete(data.id)}}/>
                            </span>
                        )
                    }
                }];
        return(
            <div>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}} onClick={()=>this.setState({isShowAddScreenModel:!this.state.isShowAddScreenModel})}>
                            {this.state.isShowAddScreenModel? '取消' : '新增显示器'}
                        </Button>
                    </Col>
                    {this.state.isShowAddScreenModel?
                        <div>
                            <Col span={22}>
                                <Row className='addComputer' style={{display:'flex'}}>
                                    <Col span={1}>
                                        <span>型号</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addScreenList.displayModel}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'displayModel')}}
                                        />
                                    </Col>
                                    <Col span={1}>
                                        <span>编号</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addScreenList.code}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'code')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>使用者(选填)</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addScreenList.owner}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'owner')}}/>
                                    </Col>
                                    <Col span={1}>
                                        <span>说明</span>
                                    </Col>
                                    <Col span={6}>
                                        <Input value={this.state.addScreenList.summary}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'summary')}}/>
                                    </Col>
                                    <Col span={2}>
                                        <Button style={{backgroundColor: '#6699cc', color:'white'}} onClick={()=>{this.handleAddItemSubmit()}}>提交</Button>
                                    </Col>
                                    <Col span={2}>
                                        <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                                onClick={()=>
                                                    this.setState({
                                                        addScreenList:{displayModel:'', code:'', owner:'', summary: ''},
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
                    <Table columns={screenColumns}
                           dataSource={this.state.screenList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey='screenTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getScreenByPage({currentPage:pagination.current, pageSize:pagination.pageSize});
                           }}
                    />
                </Row>
                <Modal
                    title="修改显示器信息"
                    visible={this.state.isShowScreenUpdateModel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleUpdateSubmit}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({updateScreenList:{...this.updateScreenList}})}}>重置</Button>,
                    ]}
                >
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>型号</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateScreenList.displayModel}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'displayModel')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>编号</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateScreenList.code}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'code')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>使用者(选填)</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateScreenList.owner}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'owner')}}/>
                        </Col>
                    </Row>
                    <Row className='addScreen' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>说明</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateScreenList.summary}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'summary')}}/>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getScreenByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleCancel(){
        this.setState({
            isShowScreenUpdateModel: false,
        });
    }

    handleAddItemInfoChange(value, type){
        let addScreenList = this.state.addScreenList;
        switch (type) {
            case 'code':
                addScreenList.code = value;
                break;
            case 'summary':
                addScreenList.summary = value;
                break;
            case 'owner':
                addScreenList.owner = value;
                break;
            case 'displayModel':
                addScreenList.displayModel = value;
                break;
            default:
                break;
        }
        this.setState({
            addScreenList:addScreenList,
        })
    }

    handleUpdateItemInfoChange(value, type){
        let updateScreenList = this.state.updateScreenList;
        switch (type) {
            case 'code':
                updateScreenList.code = value;
                break;
            case 'summary':
                updateScreenList.summary = value;
                break;
            case 'owner':
                updateScreenList.owner = value;
                break;
            case 'displayModel':
                updateScreenList.displayModel = value;
                break;
            default:
                break;
        }
        this.setState({
            updateScreenList:updateScreenList,
        })
    }

    handleAddItemSubmit(){
        let params = {...this.state.addScreenList};
        if(params.displayModel === '' || params.summary === '' || params.code === ''){
            message.warning('请完善显示器信息！')
        }else {
            ApiUtil.addNewScreen(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('显示器添加成功！');
                        this.getScreenByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowAddScreenModel:false,
                            addScreenList:{displayModel:'', code:'', owner:'', summary: ''},
                        })
                    }else {
                        message.error('显示器添加有误！')
                    }
                }else {
                    message.error('显示器添加失败！')
                }
            });
        }
    }

    handleUpdateSubmit(){
        let params = {...this.state.updateScreenList};
        if(params.displayModel === '' || params.summary === '' || params.code === ''){
            message.warning('请完善显示器信息！')
        }else {
            ApiUtil.updateScreen(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('显示器修改成功！');
                        this.getScreenByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowScreenUpdateModel:false,
                        })
                    }else {
                        message.error('显示器修改有误！')
                    }
                }else {
                    message.error('显示器修改失败！')
                }
            });
        }
    }

    getScreenByPage(params){
        ApiUtil.getScreenByPage(params, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        screenList: data.result,
                    });
                }else {
                    message.error('显示器列表获取有误！')
                }
            }else {
                message.error('显示器列表获取失败！')
            }
        });
    }

    handleScreenDelete(id){
        ApiUtil.deleteScreen(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    message.success('显示器删除成功！');
                    this.getScreenByPage({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                }else {
                    message.error('显示器删除有误！')
                }
            }else {
                message.error('显示器删除失败！')
            }
        });
    }
}