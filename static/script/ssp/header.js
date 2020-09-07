/**
* author:苏晓
* 功能：系统顶部组件
* 创建时间：2019-03-02
*/
import React from 'react';
import {Col, Menu, Row} from 'antd';
import 'antd/dist/antd.css';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div style={{height: "8vh", background:'#115290', display:'flex'}}>
                <Row type="flex" justify="space-between" style={{margin:'auto', width:'100%'}}>
                    <Col span={6}>
                        <div style={{fontSize:'24px', color: "white",paddingLeft:'15px'}}>
                            <img src='style/images/logo.jpg' width='50px' style={{width:'50px', paddingLeft:'10px'}}/>Lab538综合管理系统
                        </div>
                    </Col>
                    <Col span={12}>

                    </Col>
                    <Col span={6} >

                    </Col>
                </Row>
            </div>
        )
    }
}