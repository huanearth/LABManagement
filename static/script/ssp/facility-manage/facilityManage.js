import React from 'react';
import ComputerManage from './computerManage';
import ScreenManage from './screenManage';
import ServerManage from './serverManage';
import OtherFacilityManage from './otherFacilityManage';
import BookManage from './bookManage';
import {Col, Row} from "antd";

import './facilityManage.css'

export default class FacilityManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentMode:'computerManage',
        };

        this.currentModeChange = this.currentModeChange.bind(this);
    }

    render(){
        return(
            <div>
                <Row style={{height:'81vh'}}>
                    <Col span={4} style={{height:'100%',paddingRight:'20px', backgroundColor:'rgba(0,0,0,0.1)'}}>
                        <Row onClick={this.currentModeChange} id='computerManage' className={this.state.currentMode==='computerManage'?  'subTitleActive': 'subTitle'}>
                            <span id='computerManage'>电脑设备</span>
                        </Row>
                        <Row onClick={this.currentModeChange} id='screenManage' className={this.state.currentMode==='screenManage'? 'subTitleActive' : 'subTitle'}>
                            <span id='screenManage'>显示器设备</span>
                        </Row>
                        <Row onClick={this.currentModeChange} id='serverManage' className={this.state.currentMode==='serverManage'? 'subTitleActive' : 'subTitle'}>
                            <span id='serverManage'>服务器设备</span>
                        </Row>
                        <Row onClick={this.currentModeChange} id='bookManage' className={this.state.currentMode==='bookManage'? 'subTitleActive' : 'subTitle'}>
                            <span id='bookManage'>图书设备</span>
                        </Row>
                        <Row onClick={this.currentModeChange} id='otherFacilityManage' className={this.state.currentMode==='otherFacilityManage'? 'subTitleActive' : 'subTitle'}>
                            <span id='otherFacilityManage'>其他设备</span>
                        </Row>
                    </Col>
                    <Col span={20} style={{height:'100%', paddingTop:'25px'}}>
                        {this.state.currentMode === 'computerManage'?
                            <ComputerManage/> : null
                        }
                        {this.state.currentMode === 'screenManage'?
                            <ScreenManage/> : null
                        }
                        {this.state.currentMode === 'serverManage'?
                            <ServerManage/> : null
                        }
                        {this.state.currentMode === 'otherFacilityManage'?
                            <OtherFacilityManage/> : null
                        }
                        {this.state.currentMode === 'bookManage'?
                            <BookManage/> : null
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