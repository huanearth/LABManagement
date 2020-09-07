/**
* author:苏晓
* 功能：经费管理组件
* 创建时间：2019-04-10
*/
import React from 'react';
import {Button, Col, DatePicker, Row, Select, Table, Input, message} from "antd";
import moment from "moment";
import ApiUtil from "../../utils/apiUtils";
import Config from "../../utils/config";
import store from "../redux/Store"


const { RangePicker } = DatePicker;

export default class FundManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pagination: Config.defaultPagination,
            searchStartTime: null,
            searchEndTime: null,
            expenditureType:'',
            expenditureList:[],
            isShowAddExpenditure:false,
            surplusAmount:0,
            addExpenditureList:{expenditureType:'开发', remark:'开发需要', expendDate:moment(), consumptionAmount:'', surplusAmount:0},
            isFirstFundData:false,
        };

        this.setClassName = this.setClassName.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.getFundsByParams = this.getFundsByParams.bind(this);
        this.handleAddItemSubmit = this.handleAddItemSubmit.bind(this);
    }

    render(){
        function disabledDate(current) {
            return current < moment().startOf('day');
        }
        const expenditureColumns =
            [{title: '花费类型', dataIndex: 'consumptionType', width: '10%', align: 'center',},
                {title: '说明', dataIndex: 'consumptionInstructions', width: '30%', align: 'center',},
                {title: '消费日期', dataIndex: '', width: '30%', align: 'center', defaultSortOrder: 'descend', sorter: (a, b) => a.consumptionDate - b.consumptionDate,
                    render: (data)=>{
                        return moment(parseInt(data.consumptionDate)).format('YYYY-MM-DD');
                    }
                },
                {title: '消费金额', dataIndex: 'consumptionAmount', width: '15%', align: 'center', defaultSortOrder: 'descend', sorter: (a, b) => a.consumptionAmount - b.consumptionAmount,},
                {title: '剩余金额', dataIndex: 'balance', width: '15%', align: 'center',}];

        return(
            <div>
                <Row className='searchZone' style={{display:'flex'}}>
                    <Col span={2}>花费类型</Col>
                    <Col span={2}>
                        <Select value={this.state.expenditureType} onChange={(value)=>{this.setState({expenditureType: value})}} style={{width:'100%'}}>
                            <option value='开发'>开发</option>
                            <option value='日用品'>日用品</option>
                            <option value='活动'>活动</option>
                            <option value='聚餐'>聚餐</option>
                            <option value='礼物'>礼物</option>
                            <option value='进账'>进账</option>
                            <option value='其他'>其他</option>
                        </Select>
                    </Col>
                    <Col span={2}>时间范围</Col>
                    <Col span={6}>
                        <RangePicker
                            id='rangePicker'
                            format="YYYY-MM-DD"
                            showTime={{
                                defaultValue:[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                            }}
                            placeholder={['开始时间', '结束时间']}
                            value={[this.state.searchStartTime, this.state.searchEndTime]}
                            onChange={(value)=>{
                                //当清除时间是要把state中的时间赋值为null
                                if(value.length === 0){
                                    this.setState({
                                        searchEndTime:null,
                                        searchStartTime:null,
                                    })
                                }else {
                                    this.setState({
                                        searchEndTime:value[1],
                                        searchStartTime:value[0],
                                    })
                                }
                            }}
                            style={{width: "95%"}}
                        />
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#6699cc', color:'white'}}
                                onClick={()=>{
                                    let params = {currentPage:this.state.pagination.current, pageSize:this.state.pagination.pageSize}
                                    this.state.expenditureType !== ''? params.consumptionType = this.state.expenditureType : null;
                                    this.state.searchEndTime !== null? params.searchEndTime = this.state.searchEndTime.valueOf() : null;
                                    this.state.searchStartTime !== null? params.searchStartTime = this.state.searchStartTime.valueOf() : null;
                                    this.getFundsByParams(params);
                                }}
                        >
                            查询
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                onClick={()=>{
                                    this.setState({
                                        searchStartTime: null,
                                        searchEndTime: null,
                                        expenditureType:'',
                                    })}
                                }>重置</Button>
                    </Col>
                </Row>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}}
                                onClick={()=>{
                                    if(store.getState().userInfo.role.functionsList.indexOf('经费管理') > -1){
                                        this.setState({isShowAddExpenditure:!this.state.isShowAddExpenditure})
                                    }else {
                                        message.warning('您无权进行此操作！')
                                    }
                                }}
                        >
                            {this.state.isShowAddExpenditure? '取消' : '新增支出'}
                        </Button>
                    </Col>
                    {this.state.isShowAddExpenditure?
                        <div>
                            <Col span={16}>
                                <Row className='addExpenditure' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>类型</span>
                                    </Col>
                                    <Col span={4}>
                                        <Select value={this.state.addExpenditureList.expenditureType}
                                                onChange={(value)=>{this.handleAddItemInfoChange(value, 'type')}}
                                                style={{width:'100%'}}
                                        >
                                            <option value='开发'>开发</option>
                                            <option value='日用品'>日用品</option>
                                            <option value='活动'>活动</option>
                                            <option value='聚餐'>聚餐</option>
                                            <option value='礼物'>礼物</option>
                                            <option value='进账'>进账</option>
                                            <option value='其他'>其他</option>
                                        </Select>
                                    </Col>
                                    <Col span={2}>
                                        <span>日期</span>
                                    </Col>
                                    <Col span={4}>
                                        <DatePicker onChange={(value)=>{this.handleAddItemInfoChange(value, 'date')}}
                                                    value={this.state.addExpenditureList.expendDate}
                                                    disabledDate={disabledDate}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>收支金额</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input value={this.state.addExpenditureList.consumptionAmount}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'amount')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>余额</span>
                                    </Col>
                                    <Col span={3}>
                                        {this.state.isFirstFundData?
                                            <Input value={this.state.addExpenditureList.surplusAmount}
                                                   onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'surplusAmount')}}/>
                                            :
                                            this.state.addExpenditureList.surplusAmount
                                        }

                                    </Col>
                                </Row>
                                <Row className='addExpenditure' style={{display:'flex', marginTop:'5px'}}>
                                    <Col span={2}>
                                        <span>说明</span>
                                    </Col>
                                    <Col span={21}>
                                        <Input value={this.state.addExpenditureList.remark}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'remark')}}/>
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
                                                    addExpenditureList:{expenditureType:'开发', remark:'开发需要', expendDate:moment(), consumptionAmount:'', surplusAmount:this.state.surplusAmount},
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
                           dataSource={this.state.expenditureList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           className='fundsTable'
                           rowKey='fundsTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getFundsByParams({currentPage:pagination.current, pageSize:pagination.pageSize, sortName:'consumptionDate', sortOrder:'desc'});
                           }}
                    />
                </Row>
            </div>
        )
    }

    componentDidMount(){
        this.getFundsByParams({currentPage:this.state.pagination.current, pageSize:this.state.pagination.pageSize, sortName:'consumptionDate', sortOrder:'desc'});
    }

    getFundsByParams(params){
        ApiUtil.getFundsByParams({...params}, (error, data)=>{
            if(!error){
                let addExpenditureList = this.state.addExpenditureList;
                addExpenditureList.surplusAmount = data.result.length===0? 0 : data.result[0].balance;
                this.state.pagination.total = data.totalNum;
                this.state.pagination.current = data.currentPage;
                this.setState({
                    expenditureList:data.result,
                    //把余额存起来
                    surplusAmount: data.result.length===0? 0 : data.result[0].balance,
                    addExpenditureList:addExpenditureList,
                    isFirstFundData: data.result.length === 0,
                });
            }else {
                message.error('经费列表获取失败！')
            }
        })
    }

    handleAddItemSubmit(){
        let params = {
            consumptionType: this.state.addExpenditureList.expenditureType,
            consumptionInstructions: this.state.addExpenditureList.remark,
            consumptionDate: this.state.addExpenditureList.expendDate.valueOf(),
            consumptionAmount: this.state.addExpenditureList.consumptionAmount,
            balance: this.state.addExpenditureList.surplusAmount,
        };
        ApiUtil.addNewFunds(params, (error, data)=>{
            if(!error && data.status === '200'){
                message.success('经费添加成功！');
                this.setState({
                    isShowAddExpenditure:false,
                });
                this.getFundsByParams({currentPage:this.state.pagination.current, pageSize:this.state.pagination.pageSize, sortName:'consumptionDate', sortOrder:'desc'});
            }else {
                message.error('经费添加失败！')
            }
        });

    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleAddItemInfoChange(value, type){
        let addExpenditureList = this.state.addExpenditureList;
        switch (type) {
            case 'type':
                addExpenditureList.expenditureType = value;
                break;
            case 'date':
                addExpenditureList.expendDate = value;
                break;
            case 'amount':
                addExpenditureList.consumptionAmount = value;
                addExpenditureList.surplusAmount = parseFloat(this.state.surplusAmount) + parseFloat(value);
                break;
            case 'remark':
                addExpenditureList.remark = value;
                break;
            case 'surplusAmount':
                addExpenditureList.surplusAmount = value;
                break;
            default:
                break;
        }
        this.setState({
            addExpenditureList:addExpenditureList,
        })
    }

}