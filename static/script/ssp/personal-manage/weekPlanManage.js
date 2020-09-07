import React from 'react';
import {Button, Col, Row, Table, Icon, Input, Modal, DatePicker, message, Select} from "antd";
import moment from "moment";
import Config from "../../utils/config";
import ApiUtil from "../../utils/apiUtils";
import store from "../redux/Store";

const {WeekPicker } = DatePicker;
const {TextArea } = Input;

export default class WeekPlanManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchRange:'onlySelf',
            dateValue:moment().valueOf(),
            completeState:'',
            summary:'',
            summaryId:'',
            weekPlanList:[],
            pagination: {...Config.defaultPagination},
            isShowSummary:false,
        };

        this.setClassName = this.setClassName.bind(this);
        this.getWeekPlanByPage = this.getWeekPlanByPage.bind(this);
        this.deleteWeekPlan = this.deleteWeekPlan.bind(this);
    }

    render(){
        const weekPlanColumns =
            [{title: '计划内容', dataIndex: 'planContent', width: '30%', align: 'center',},
                {title: '创建时间', dataIndex: 'creatTime', width: '10%', align: 'center',
                    render: (data)=>{
                        return moment(parseInt(data)).format('YYYY-MM-DD');
                    }
                },
                {title: '任务所属人', dataIndex: 'owner', width: '10%', align: 'center', defaultSortOrder: 'descend'},
                {title: '公开', dataIndex: 'permission', width: '5%', align: 'center', defaultSortOrder: 'descend'},
                {title: '完成状态', dataIndex: 'status', width: '10%', align: 'center', defaultSortOrder: 'descend',
                    render: (data)=>{
                        return(
                            data==='已完成'?
                                <i className="fa fa-check-circle" aria-hidden="true" style={{color:'#25bb25', fontSize:'20px'}}/>
                                :
                                <i className="fa fa-times-circle" aria-hidden="true" style={{color:'#fd0505', fontSize:'20px'}}/>
                        )
                    }
                },
                {title: '总结', dataIndex: 'summary', width: '25%', align: 'center',
                    render: (data, record) => (
                        <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                            {data}
                        </div>
                    ),
                },
                {title: '操作', dataIndex: '', width: '10%', align: 'center',
                    render: (data)=>{
                        return(
                            <span>
                                {
                                    data.status === '待完成' && data.owner === store.getState().userInfo.name?
                                        <i title='完成计划' className="fa fa fa-check-circle" aria-hidden="true" style={{paddingRight:'10px'}}
                                           onClick={()=>{this.updateWeekPlan({id:data.id, status:'已完成'})}}
                                        /> : null
                                }
                                {
                                    data.owner === store.getState().userInfo.name?
                                        <span>
                                            <i title='填写总结' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                                               onClick={()=>{this.setState({isShowSummary:true, summaryId:data.id})}}
                                            />
                                            <i title='删除' className="fa fa-trash" aria-hidden="true" onClick={()=>{this.deleteWeekPlan(data.id)}}/>
                                        </span>
                                        : null
                                }
                            </span>
                        )
                    }
                }];

        return(
            <div>
                <Row className='searchZone' style={{display:'flex'}}>
                    <Col span={2}>查询范围</Col>
                    <Col span={4}>
                        <Select value={this.state.searchRange} style={{width:'100%'}}
                                onChange={(value)=>{this.setState({searchRange:value})}}>
                            <Option key='onlySelf' value="onlySelf">仅自己</Option>
                            <Option key='all' value="all">全部</Option>
                        </Select>
                    </Col>
                    <Col span={2}>时间</Col>
                    <Col span={4}>
                        <WeekPicker value={moment(parseInt(this.state.dateValue))} onChange={(value)=>{this.setState({dateValue:value.valueOf()})}} placeholder="请选择时间周" />
                    </Col>
                    <Col span={2}>完成状态</Col>
                    <Col span={4}>
                        <Select value={this.state.completeState} style={{width:'100%'}}
                                onChange={(value)=>{this.setState({completeState:value})}}>
                            <Option key='yes' value="已完成">已完成</Option>
                            <Option key='no' value="待完成">待完成</Option>
                        </Select>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#6699cc', color:'white'}}
                                onClick={()=>{
                                    let dateValue = this.state.dateValue;
                                    let params = {
                                        currentPage:this.state.pagination.current,
                                        pageSize:this.state.pagination.pageSize,
                                        searchStartTime: moment(parseInt(dateValue)).weekday(1).valueOf(),
                                        searchEndTime: moment(parseInt(dateValue)).weekday(7).valueOf(),
                                        status: this.state.completeState,
                                    };
                                    this.state.searchRange === 'onlySelf'? params.owner = store.getState().userInfo.name : params.permission = '是';
                                    this.getWeekPlanByPage(params);
                                }}
                        >
                            查询
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                onClick={()=>{
                                    this.setState({
                                        searchRange:'onlySelf',
                                        timeRange:'',
                                        completeState:''
                                    })}}
                        >重置</Button>
                    </Col>
                </Row>
                <Row>
                    <Table columns={weekPlanColumns}
                           dataSource={this.state.weekPlanList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           className='weekPlansTable'
                           rowKey='weekPlansTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               let params = {
                                   currentPage:pagination.current,
                                   pageSize:pagination.pageSize,
                                   searchStartTime: this.state.dateValue.weekday(1).valueOf(),
                                   searchEndTime: this.state.dateValue.weekday(7).valueOf(),
                                   status: this.state.completeState,
                               };
                               this.state.searchRange === 'onlySelf'? params.owner = store.getState().userInfo.name : params.permission = '是';
                               this.getWeekPlanByPage(params);
                           }}
                    />
                </Row>
                <Modal
                    title="计划小结"
                    visible={this.state.isShowSummary}
                    onCancel={()=>{this.setState({isShowSummary:false})}}
                    onOk={()=>{
                        this.updateWeekPlan({id:this.state.summaryId, summary:this.state.summary});
                        this.setState({isShowSummary:false})
                    }}
                    //footer={false}
                >
                    <TextArea value={this.state.summary} onChange={(event)=>{this.setState({summary:event.target.value})}} rows={4}/>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        let dateValue = this.state.dateValue;
        let params = {
            currentPage:Config.defaultPagination.current,
            pageSize:Config.defaultPagination.pageSize,
            owner:store.getState().userInfo.name,
            searchStartTime: moment(parseInt(dateValue)).weekday(1).valueOf(),
            searchEndTime: moment(parseInt(dateValue)).weekday(7).valueOf(),
            status: this.state.completeState,
        };
        this.getWeekPlanByPage(params);
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    getWeekPlanByPage(params){
        ApiUtil.getWeekPlanByPage(params, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        weekPlanList: data.result,
                    });
                }else {
                    message.error('周计划列表获取有误！')
                }
            }else {
                message.error('周计划列表获取失败！')
            }
        });
    }

    updateWeekPlan(params){
        ApiUtil.updateWeekPlan(params, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    let dateValue = this.state.dateValue;
                    let params = {
                        currentPage:this.state.pagination.current,
                        pageSize:this.state.pagination.pageSize,
                        searchStartTime: moment(parseInt(dateValue)).weekday(1).valueOf(),
                        searchEndTime: moment(parseInt(dateValue)).weekday(7).valueOf(),
                        status: this.state.completeState,
                    };
                    this.state.searchRange === 'onlySelf'? params.owner = store.getState().userInfo.name : params.permission = '是';
                    this.getWeekPlanByPage(params);
                }else {
                    message.error('周计划修改有误！')
                }
            }else {
                message.error('周计划修改失败！')
            }
        });
    }

    deleteWeekPlan(id){
        let isDelete = window.confirm('确认删除？');
        if(isDelete){
            ApiUtil.deleteWeekPlan(id,(error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        message.success('删除成功!');
                        let dateValue = this.state.dateValue;
                        let params = {
                            currentPage:this.state.pagination.current,
                            pageSize:this.state.pagination.pageSize,
                            searchStartTime: moment(parseInt(dateValue)).weekday(1).valueOf(),
                            searchEndTime: moment(parseInt(dateValue)).weekday(7).valueOf(),
                            status: this.state.completeState,
                        };
                        this.state.searchRange === 'onlySelf'? params.owner = store.getState().userInfo.name : params.permission = '是';
                        this.getWeekPlanByPage(params);
                    }else {
                        message.error('计划删除失败！')
                    }
                }else {
                    message.error('计划删除失败！')
                }
            })
        }
    }
}