/**
* author:苏晓
* 功能：成果管理组件
* 创建时间：2019-04-10
*/
import React from 'react';
import {Button, Col, Row, Select, Table, Input, Modal, message} from "antd";
import ApiUtil from "../../utils/apiUtils";
import Config from "../../utils/config";

export default class AchievementsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pagination: {...Config.defaultPagination},
            achievementsType:'全部',
            keyword:'',
            author:'',
            achievementsList: [],
            isShowSummary: false,
            summary:'',
        };

        this.setClassName = this.setClassName.bind(this);
        this.getAchievementsByParams = this.getAchievementsByParams.bind(this);
        this.handleAchievementDelete = this.handleAchievementDelete.bind(this);
    }

    render(){
        const achievementsColumns =
            [{title: '题目', dataIndex: 'title', width: '30%', align: 'center',},
             {title: '成果类型', dataIndex: 'achievementsType', width: '10%', align: 'center',},
             {title: '发表/受理日期', dataIndex: 'publishDate', width: '30%', align: 'center', defaultSortOrder: 'descend', sorter: (a, b) => {return(a.publishDate>b.publishDate? 1:-1)}},
             {title: '作者', dataIndex: 'author', width: '15%', align: 'center',},
             {title: '操作', dataIndex: '', width: '15%', align: 'center',
                render: (data)=>{
                    return(
                        <span>
                            <a href={"http://" + Config.serverAddress + "/labmanage/api/lab538/am/fileLoad/receiveDownload?file=" + data.sourceUrl} download>
                                <i title='下载' className="fa fa-download" aria-hidden="true" style={{paddingRight:'10px', color:'black'}}/>
                            </a>
                            <i title='查看摘要' className="fa fa-file-text" aria-hidden="true" style={{paddingRight:'10px'}}
                               onClick={()=>{this.setState({isShowSummary:true, summary:data.summary})}}/>
                            <i title='删除' className="fa fa-trash" aria-hidden="true"
                                onClick={()=>{this.handleAchievementDelete(data.id)}}/>
                        </span>
                    )
                }
             }];

        return(
            <div>
                <Row className='searchZone' style={{display:'flex'}}>
                    <Col span={2}>成果类型</Col>
                    <Col span={2}>
                        <Select value={this.state.achievementsType} onChange={(value)=>{this.setState({achievementsType: value})}} style={{width:'100%'}}>
                            <option value='全部'>全部</option>
                            <option value='小论文'>小论文</option>
                            <option value='大论文'>大论文</option>
                            <option value='专利'>专利</option>
                        </Select>
                    </Col>
                    <Col span={2}>题目</Col>
                    <Col span={6}>
                        <Input value={this.state.keyword} onChange={(event)=>{this.setState({keyword:event.target.value})}}/>
                    </Col>
                    <Col span={2}>作者</Col>
                    <Col span={2}>
                        <Input value={this.state.author} onChange={(event)=>{this.setState({author:event.target.value})}}/>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#6699cc', color:'white'}}
                                onClick={()=>{
                                    let params = {
                                        currentPage:Config.defaultPagination.current,
                                        pageSize:Config.defaultPagination.pageSize,
                                        title:this.state.keyword,
                                        author:this.state.author,
                                    };
                                    params.achievementsType = this.state.achievementsType === '全部'?  '' :  this.state.achievementsType;
                                    this.getAchievementsByParams(params)
                                }}
                        >查询</Button>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                onClick={()=>{
                                    this.setState({
                                        achievementsType:'全部',
                                        keyword:'',
                                        author:'',
                                    })}
                                }>重置</Button>
                    </Col>
                </Row>
                <Row>
                    <Table columns={achievementsColumns}
                           dataSource={this.state.achievementsList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           className='achievementsTable'
                           rowKey="achievementsTable"
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getAchievementsByParams({currentPage:pagination.current, pageSize:pagination.pageSize});
                           }}
                    />
                </Row>
                <Modal
                    title="摘要"
                    visible={this.state.isShowSummary}
                    onCancel={()=>{this.setState({isShowSummary:false})}}
                    footer={false}
                >
                    {this.state.summary}
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getAchievementsByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize})
    }

    getAchievementsByParams(params){
        console.log(params);
        ApiUtil.getAchievementByPage({...params}, (error, data)=>{
            if(!error){
                if(data.status === '200' && data.message === 'backup'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        achievementsList: data.result,
                    })
                }else {
                    message.error(data.message)
                }
            }else {
                message.error('获取成果列表失败！')
            }
        });
    }

    handleAchievementDelete(id){
        ApiUtil.deleteAchievement(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getAchievementsByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize})
                }else {
                    message.error(data.message)
                }
            }else {
                message.error('成果删除失败！')
            }
        })
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }
}