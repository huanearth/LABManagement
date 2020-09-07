/**
* author:苏晓
* 功能：系统管理组件
* 创建时间：2019-03-09
*/
import React from 'react';
import { Row, Col} from 'antd';
import RoleManage from './roleManage';
import PeopleManage from './peopleManage';
import FunctionManage from './functionManage';

import './systemManage.css'




export default class SystemManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentMode:'personnelManage',
        };

        this.currentModeChange = this.currentModeChange.bind(this);
    }

    render(){
        return(
            <div>
                <Row style={{height:'81vh'}}>
                    <Col span={4} style={{height:'100%',paddingRight:'20px', backgroundColor:'rgba(0,0,0,0.1)'}}>
                        <Row onClick={this.currentModeChange} id='personnelManage' className={this.state.currentMode==='personnelManage'? 'subTitleActive' : 'subTitle'}>
                            <span id='personnelManage'>人员管理</span>
                        </Row>
                        <Row onClick={this.currentModeChange} id='roleManage' className={this.state.currentMode==='roleManage'?  'subTitleActive': 'subTitle'}>
                            <span id='roleManage'>角色管理</span>
                        </Row>
                        <Row onClick={this.currentModeChange} id='functionManage' className={this.state.currentMode==='functionManage'?  'subTitleActive': 'subTitle'}>
                            <span id='functionManage'>权限管理</span>
                        </Row>
                    </Col>
                    <Col span={20} style={{height:'100%', paddingTop:'25px'}}>
                        {this.state.currentMode === 'roleManage'?
                            <RoleManage/> : null
                        }
                        {this.state.currentMode === 'personnelManage'?
                            <PeopleManage/> : null
                        }
                        {this.state.currentMode === 'functionManage'?
                            <FunctionManage/> : null
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