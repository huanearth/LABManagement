/**
* author:苏晓
* 功能：文件管理主界面组件
* 创建时间：2019-04-10
*/
import React from 'react';
import {Button, Col, DatePicker, Row, Select, Table, Input} from "antd";
import AchievementList from './achievementList';
import AddAchievement from './addAchievement';
import OtherFilesList from './otherFilesList';

import './fileManage.css'
import store from "../redux/Store";


export default class FileManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentMode:'achievementsManage',
        }

        this.currentModeChange = this.currentModeChange.bind(this);
        this.addAchievementsSuccess = this.addAchievementsSuccess.bind(this);
    }

    render(){
        return(
            <div>
                {store.getState().userInfo.role.functionsList.indexOf('文件管理') > -1?
                    <Row style={{height:'81vh'}}>
                        <Col span={4} style={{height:'100%',paddingRight:'20px', backgroundColor:'rgba(0,0,0,0.1)'}}>
                            <Row onClick={this.currentModeChange} id='achievementsManage' className={this.state.currentMode==='achievementsManage'?  'subTitleActive': 'subTitle'}>
                                <span id='achievementsManage'>成果管理</span>
                            </Row>
                            <Row onClick={this.currentModeChange} id='addAchievements' className={this.state.currentMode==='addAchievements'? 'subTitleActive' : 'subTitle'}>
                                <span id='addAchievements'>添加成果</span>
                            </Row>
                            <Row onClick={this.currentModeChange} id='otherFilesList' className={this.state.currentMode==='otherFilesList'? 'subTitleActive' : 'subTitle'}>
                                <span id='otherFilesList'>其他文件</span>
                            </Row>
                        </Col>
                        <Col span={20} style={{height:'100%', paddingTop:'25px'}}>
                            {this.state.currentMode === 'achievementsManage'?
                                <AchievementList /> : null
                            }
                            {this.state.currentMode === 'addAchievements'?
                                <AddAchievement addAchievementsSuccess={this.addAchievementsSuccess} /> : null
                            }
                            {this.state.currentMode === 'otherFilesList'?
                                <OtherFilesList /> : null
                            }
                        </Col>
                    </Row>
                    :
                    <h5>您无权查看此内容</h5>
                }

            </div>
        )
    }

    currentModeChange(event){
        this.setState({
            currentMode: event.target.id,
        })
    }

    addAchievementsSuccess(){
        this.setState({
            currentMode: 'achievementsManage',
        })
    }
}