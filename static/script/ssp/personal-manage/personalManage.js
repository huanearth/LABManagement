/**
 * author:苏晓
 * 功能：个人中心组件
 * 创建时间：2019-06-02
 */
import React from 'react';
import { Row, Col} from 'antd';
import InfoManage from './InfoManage';
import WeekPlanManage from './weekPlanManage';
import AddWeekPlan from './addWeekPlan';

import './personalManage.css'

export default class PersonalManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentMode:'weekPlanManage',
        };

        this.currentModeChange = this.currentModeChange.bind(this);
    }

    render(){
        return(
            <div>
                <Row style={{height:'81vh'}}>
                    <Col span={4} style={{height:'100%',paddingRight:'20px', backgroundColor:'rgba(0,0,0,0.1)'}}>
                        {/*<Row onClick={this.currentModeChange} id='infoManage' className={this.state.currentMode==='infoManage'?  'subTitleActive': 'subTitle'}>*/}
                            {/*<span id='infoManage'>信息管理</span>*/}
                        {/*</Row>*/}
                        <Row onClick={this.currentModeChange} id='weekPlanManage' className={this.state.currentMode==='weekPlanManage'? 'subTitleActive' : 'subTitle'}>
                            <span id='weekPlanManage'>周计划查询</span>
                        </Row>
                        <Row onClick={this.currentModeChange} id='addWeekPlan' className={this.state.currentMode==='addWeekPlan'? 'subTitleActive' : 'subTitle'}>
                            <span id='addWeekPlan'>添加周计划</span>
                        </Row>
                    </Col>
                    <Col span={20} style={{height:'100%', paddingTop:'25px'}}>
                        {/*{this.state.currentMode === 'infoManage'?*/}
                            {/*<InfoManage/> : null*/}
                        {/*}*/}
                        {this.state.currentMode === 'weekPlanManage'?
                            <WeekPlanManage/> : null
                        }
                        {this.state.currentMode === 'addWeekPlan'?
                            <AddWeekPlan currentModeChange={this.currentModeChange}/> : null
                        }
                    </Col>
                </Row>
            </div>
        )
    }

    currentModeChange(event){
        this.setState({
            currentMode: event.target.id,
        })
    }
}