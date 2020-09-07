/**
* @author 苏晓
* 功能：系统底部组件
* 创建时间：2019-03-01
*/
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'

export default class Footer extends React.Component {

    render() {
        return (
            <Container fluid={true} style={{height: "5vh",padding:"0px"}}>
                <Row>
                    <Col>
                        <div style={{height: "5vh",backgroundColor: "#115290", display:'flex'}}>
                            <h5 style={{ textAlign: "center", color: "white",margin:"auto"}}>
                                天津大学lab538实验室版权所有
                            </h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }


}