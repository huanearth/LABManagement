import React from 'react';
import {Button, Col, Row, Icon, Input, Select, message} from "antd";
import moment from "moment";
import ApiUtil from "../../utils/apiUtils";
import store from "../redux/Store";

export default class AddWeekPlan extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowAddPlan:false,
            planList:[{creatTime:moment().valueOf(), permission:'否', planContent:'', status:'待完成', summary:''}],
        };

        this.addNewPlan = this.addNewPlan.bind(this);
        this.handlePlanChange = this.handlePlanChange.bind(this);
        this.handlePlanItemRemove = this.handlePlanItemRemove.bind(this);
        this.handlePlanListSubmit = this.handlePlanListSubmit.bind(this);
    }

    render(){
        return(
            <div>
                <Row style={{margin:'10px'}}>

                </Row>
                <div>
                    <Row style={{width: '70%', left:'5%'}}>
                        <Col span={2}/>
                        <Col span={20}>
                            <Row>
                                <Col span={18} style={{textAlign:'center', fontSize:'20px', background:'#6699cc', color:'white'}}>计划内容</Col>
                                <Col span={3} style={{textAlign:'center', fontSize:'20px', background:'#6699cc', color:'white'}}>公开显示</Col>
                                <Col span={3} style={{textAlign:'center'}}>
                                    <Icon type="plus-circle" style={{fontSize:'20px'}} onClick={this.addNewPlan}/>
                                </Col>
                            </Row>
                            {this.state.planList.map((item, index)=>{
                                return(
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={18}>
                                            <Input value={this.state.planList[index].planContent}
                                                   style={{width:'98%',backgroundColor: index%2===0? '#d1e5e4' : '#a3d3d7'}}
                                                   onChange={(event)=>{this.handlePlanChange('planContent', event.target.value, index)}}/>
                                        </Col>
                                        <Col span={3} id='permission'>
                                            <Select value={this.state.planList[index].permission} style={{width:'100%'}}
                                                             onChange={(value)=>{
                                                                 this.handlePlanChange('permission', value, index)
                                                             }}>
                                            <Option key='yes' value="是">是</Option>
                                            <Option key='no' value="否">否</Option>
                                        </Select>
                                        </Col>
                                        <Col span={3} style={{textAlign:'center'}}>
                                            <Icon type="minus-circle" style={{fontSize:'20px'}}
                                                  onClick={()=>this.handlePlanItemRemove(index)}
                                            />
                                        </Col>
                                    </Row>
                                )
                            })}
                            <Row style={{marginTop:'10px'}}>
                                <Col span={12} style={{textAlign:'center'}}>
                                    <Button className='handleButton' style={{backgroundColor: '#40a9ff', color:'white'}}
                                            onClick={()=>{this.handlePlanListSubmit()}}>提交</Button>
                                </Col>
                                <Col span={12} style={{textAlign:'center'}}>
                                    <Button className='handleButton' style={{backgroundColor: '#EFA718', color:'white'}}
                                            onClick={()=>{
                                                this.setState({
                                                    planList:[{creatTime:moment().valueOf(), permission:'否', planContent:'', status:'待完成', summary:''}],
                                                })
                                            }}
                                    >重置</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    addNewPlan(){
        let planList = this.state.planList;
        planList.push({creatTime:moment().valueOf(), permission:'否', planContent:'', status:'待完成', summary:''});
        this.setState({planList:planList});
    }

    handlePlanChange(item, value, index){
        let planList = this.state.planList;
        switch (item) {
            case 'planContent':
                planList[index].planContent = value;
                break;
            case 'permission':
                planList[index].permission = value;
                break;
            default:
                return null;
        }
        this.setState({
            planList:planList,
        })
    }

    handlePlanItemRemove(index){
        this.state.planList.splice(index,1);
        this.setState({});
    }

    handlePlanListSubmit(){
        let planList = [...this.state.planList];
        let successList = [];
        let isSuccess = true;
        planList.forEach((item)=>{
            item.owner = store.getState().userInfo.name;
            ApiUtil.addNewWeekPlan(item,(error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        successList.push(data.result[0].id);
                    }else {
                        isSuccess = false;
                    }
                }else {
                    isSuccess = false;
                }
            })
        });
        if(isSuccess){
            message.success('周计划添加成功！');
            this.props.currentModeChange({target:{id:'weekPlanManage'}});
        }else {
            message.error('周计划添加失败！');
            successList.forEach(item=>{
                ApiUtil.deleteWeekPlan(item);
            })
        }
    }
}