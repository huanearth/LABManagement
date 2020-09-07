import React from 'react';
import {Button, Col, DatePicker, Input, message, Modal, Row, Select, Table} from "antd";
import ApiUtil from "../../utils/apiUtils";
import Config from "../../utils/config";

export default class ComputerManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowAddComputerModel:false,
            isShowComputerUpdateModel:false,
            addComputerList:{computerModel:'小米',code:'1', system:'linux', owner:'苏晓', RAM:'8G', ROM:'500G', summary:'java'},
            computerList: [],
            pagination: {...Config.defaultPagination},
            updateComputerList:{},
        };
        this.updateComputerList = {};
        this.setClassName = this.setClassName.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleComputerDelete = this.handleComputerDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleUpdateItemInfoChange = this.handleUpdateItemInfoChange.bind(this);
    }

    render(){
        const computerColumns =
            [{title: '型号', dataIndex: 'computerModel', width: '15%', align: 'center',},
                {title: '编号', dataIndex: 'code', width: '10%', align: 'center'},
                {title: '操作系统', dataIndex: 'system', width: '15%', align: 'center'},
                {title: '使用者', dataIndex: 'owner', width: '10%', align: 'center',},
                {title: '内存', dataIndex: 'ram', width: '10%', align: 'center',},
                {title: '硬盘大小', dataIndex: 'rom', width: '10%', align: 'center',},
                {title: '备注', dataIndex: 'summary', width: '15%', align: 'center',},
                {title: '操作', dataIndex: '', width: '15%', align: 'center',
                    render: (data)=>{
                        return(
                            <span>
                                <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                                   onClick={()=>{
                                       this.setState({
                                           isShowComputerUpdateModel:true,
                                           updateComputerList:{...data},
                                       });
                                       this.updateComputerList = {...data};
                                   }}
                                />
                                <i title='删除' className="fa fa-trash" aria-hidden="true" onClick={()=>{this.handleComputerDelete(data.id)}}/>
                            </span>
                        )
                    }
                }];
        return(
            <div>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}} onClick={()=>this.setState({isShowAddComputerModel:!this.state.isShowAddComputerModel})}>
                            {this.state.isShowAddComputerModel? '取消' : '新增电脑'}
                        </Button>
                    </Col>
                    {this.state.isShowAddComputerModel?
                        <div>
                            <Col span={20}>
                                <Row className='addComputer' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>编号</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addComputerList.code}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'code')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>操作系统</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addComputerList.system}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'system')}}
                                        />
                                    </Col>
                                    <Col span={3}>
                                        <span>使用者(选填)</span>
                                    </Col>
                                    <Col span={2}>
                                        <Input value={this.state.addComputerList.owner}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'owner')}}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>内存</span>
                                    </Col>
                                    <Col span={2}>
                                        <Input value={this.state.addComputerList.RAM}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'RAM')}}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>硬盘</span>
                                    </Col>
                                    <Col span={2}>
                                        <Input value={this.state.addComputerList.ROM}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'ROM')}}/>
                                    </Col>
                                </Row>
                                <Row className='addComputer' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>型号</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addComputerList.computerModel}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'computerModel')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>备注</span>
                                    </Col>
                                    <Col span={16}>
                                        <Input value={this.state.addComputerList.summary}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'summary')}}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <Row>
                                    <Button style={{backgroundColor: '#6699cc', color:'white'}} onClick={()=>{this.handleAddItemSubmit()}}>提交</Button>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                                onClick={()=>
                                                    this.setState({
                                                        addComputerList:{computerModel:'小米', system:'linux', owner:'苏晓', RAM:'8G', ROM:'500G', summary:'java'},
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
                    <Table columns={computerColumns}
                           dataSource={this.state.computerList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey='computerTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getComputersByParams({currentPage:pagination.current, pageSize:pagination.pageSize});
                           }}
                    />
                </Row>
                <Modal
                    title="修改电脑信息"
                    visible={this.state.isShowComputerUpdateModel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleUpdateSubmit}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({updateComputerList:{...this.updateComputerList}})}}>重置</Button>,
                    ]}
                >
                    <Row className='addServer' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>型号:</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateComputerList.computerModel}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'computerModel')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addServer' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>编号:</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateComputerList.code}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'code')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addServer' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>操作系统:</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateComputerList.system}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'system')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addServer' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>使用者(选填):</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateComputerList.owner}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'owner')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addServer' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>硬盘大小:</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateComputerList.rom}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'ROM')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addServer' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>内存大小:</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateComputerList.ram}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'RAM')}}
                            />
                        </Col>
                    </Row>
                    <Row className='addServer' style={{display:'flex'}}>
                        <Col span={8}>
                            <span>备注:</span>
                        </Col>
                        <Col span={16}>
                            <Input value={this.state.updateComputerList.summary}
                                   onChange={(event)=>{this.handleUpdateItemInfoChange(event.target.value, 'summary')}}
                            />
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getComputersByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
    }

    getComputersByParams(params){
        ApiUtil.getComputerByPage({...params}, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        computerList: data.result,
                    });
                }else {
                    message.error('电脑列表获取有误！')
                }
            }else {
                message.error('电脑列表获取失败！')
            }
        })
    }


    handleAddItemSubmit(){
        let params = {...this.state.addComputerList};
        if(params.computerModel === '' || params.system === '' || params.RAM === '' || params.ROM === '' || params.summary === '' || params.code === ''){
            message.warning('请完善电脑信息！')
        }else {
            params.ram = params.RAM;
            params.rom = params.ROM;
            ApiUtil.addNewComputer(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('电脑添加成功！');
                        this.getComputersByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowAddComputerModel:false,
                        })
                    }else {
                        message.error('电脑添加有误！')
                    }
                }else {
                    message.error('电脑添加失败！')
                }
            });
        }
    }

    handleUpdateSubmit(){
        let params = {...this.state.updateComputerList};
        if(params.computerModel === '' || params.system === '' || params.RAM === '' || params.ROM === '' || params.summary === '' || params.code === ''){
            message.warning('请完善电脑信息！')
        }else {
            ApiUtil.updateComputer(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        this.getComputersByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowComputerUpdateModel:false,
                        })
                    }else {
                        message.error('电脑修改有误！')
                    }
                }else {
                    message.error('电脑修改失败！')
                }
            });
        }
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleAddItemInfoChange(value, type){
        let addComputerList = this.state.addComputerList;
        switch (type) {
            case 'computerModel':
                addComputerList.computerModel = value;
                break;
            case 'code':
                addComputerList.code = value;
                break;
            case 'summary':
                addComputerList.summary = value;
                break;
            case 'system':
                addComputerList.system = value;
                break;
            case 'owner':
                addComputerList.owner = value
                break;
            case 'RAM':
                addComputerList.RAM = value;
                break;
            case 'ROM':
                addComputerList.ROM = value;
                break;
            default:
                break;
        }
        this.setState({
            addComputerList:addComputerList,
        })
    }

    handleUpdateItemInfoChange(value, type){
        let updateComputerList = this.state.updateComputerList;
        switch (type) {
            case 'computerModel':
                updateComputerList.computerModel = value;
                break;
            case 'code':
                updateComputerList.code = value;
                break;
            case 'summary':
                updateComputerList.summary = value;
                break;
            case 'system':
                updateComputerList.system = value;
                break;
            case 'owner':
                updateComputerList.owner = value
                break;
            case 'RAM':
                updateComputerList.ram = value;
                break;
            case 'ROM':
                updateComputerList.rom = value;
                break;
            default:
                break;
        }
        this.setState({
            updateComputerList:updateComputerList,
        })
    }

    handleComputerDelete(id){
        ApiUtil.deleteComputer(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    message.success('电脑删除成功！');
                    this.getComputersByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                }else {
                    message.error('电脑删除有误！')
                }
            }else {
                message.error('电脑删除失败！')
            }
        });
    }

    handleCancel(){
        this.setState({
            isShowComputerUpdateModel: false,
        });
    }
}