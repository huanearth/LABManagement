import React from 'react';
import {Button, Col, Row, Icon, Input, Select, message} from "antd";
import store from "../redux/Store";

export default class InfoManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:{...store.getState().userInfo},
        }

    }

    render(){
        let infoCard = <div>
            <Row className='userInfo'>
                <Col span={8}>

                </Col>
                <Col span={16}>
                    <Row>
                        <Col span={8}>
                            姓名：
                        </Col>
                        <Col span={16}>
                            {this.state.userInfo.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            性别：
                        </Col>
                        <Col span={16}>
                            {this.state.userInfo.gender}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>;
        return infoCard;
    }

}