/**
* author:苏晓
* 功能：添加成果组件
* 创建时间：2019-04-11
*/
import React from "react";
import {Input, Form, Select, DatePicker, Row, Col, Button, Upload, Icon, message, Progress} from "antd";
import ApiUtil from "../../utils/apiUtils";

const {TextArea} = Input;

const addAchievementsList = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state={
                fileList:[],
                progress:'',
                isShowProgress: false,
            };

            this.fileName = '';

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleFileChange = this.handleFileChange.bind(this);
            this.handleBeforeUpload = this.handleBeforeUpload.bind(this);
        }

        render(){
            const { getFieldDecorator } = this.props.form;
            //内容的布局格式
            const formItemLayout = {
                labelCol: {
                    xs: { span: 8 },
                    sm: { span: 8 },
                    lg: { span: 8 },
                    md: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 16 },
                    sm: { span: 16 },
                    lg: { span: 16 },
                    md: { span: 16 },
                },
            };
            //按钮的布局格式
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 24,
                        offset: 0,
                    },
                },
            };

            return(
                <div>
                    <Form {...formItemLayout} className='addAchievementsForm'>
                        <Form.Item
                            label="题目"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true, message: '请输入题目!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="类型"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('achievementsType', {
                                rules: [{
                                    required: true, message: '请选择成果类型!',
                                }],
                            })(
                                <Select>
                                    <option value='专利'>专利</option>
                                    <option value='小论文'>小论文</option>
                                    <option value='大论文'>大论文</option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="作者"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('author', {
                                rules: [{
                                    required: true, message: '请填写作者！',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="发表/受理日期"
                            hasFeedback={true}
                        >
                            {getFieldDecorator('publishDate', {
                                rules: [{
                                    required: true, message: '请选择发表或受理日期!',
                                }],
                            })(
                                <DatePicker style={{width:'100%'}}/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="摘要"
                        >
                            {getFieldDecorator('summary')(
                                <TextArea cols={3}/>
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Row>
                                <Col span={8}/>
                                <Col span={16}>
                                    <Row>
                                        <Upload
                                            action='/labmanage/api/lab538/am/fileLoad/singleUpload'
                                            fileList={this.state.fileList}
                                            onChange={this.handleFileChange}
                                            beforeUpload={this.handleBeforeUpload}
                                            onRemove={()=>{
                                                this.setState({
                                                    fileList:[],
                                                    isShowProgress:false,
                                                })
                                            }}
                                        >
                                            <Button style={{backgroundColor: '#6699cc', color:'white'}}>
                                                <span style={{display:'flex', alignItems:'center'}}><Icon type="upload" /> 选择文件</span>
                                            </Button>
                                            <span style={{color:'blue'}}>单文件上传，若上传多个文件请放到一个压缩包中上传（小于140兆）</span>
                                        </Upload>
                                    </Row>
                                    <Row>
                                        {this.state.isShowProgress? <Progress strokeWidth='2px' percent={this.state.progress} status={this.state.progress===100? '' : 'active'} /> : null}
                                    </Row>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Row style={{textAlign:'center'}}>
                                <Col span={16}>

                                </Col>
                                <Col span={4}>
                                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{this.handleSubmit()}}>
                                        提交
                                    </Button>
                                </Col>
                                <Col span={4}>

                                    <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                            onClick={()=>{
                                                this.setState({
                                                    fileList:[],
                                                    isShowProgress:false,
                                                });
                                                this.props.form.resetFields()
                                            }}
                                    >
                                        重置
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
            )
        }



        handleBeforeUpload(file){
            console.log(file);
            let isExist = true;
            if(file.size > 1024*1024*140) {
                isExist=false;
                message.warning('文件太大，无法上传！');
                return isExist;
            }
            ApiUtil.checkFileIsExist(file.name, (error, data)=>{
                if(!error){
                    if(data.status === '0'){
                        message.warning(data.message);
                        isExist = false;
                    }else if(data.status === '1'){
                        this.setState({
                            fileList:[file],
                            isShowProgress:true,
                            progress:0,
                        });
                    }
                }else {
                    message.error('检查文件是否存在失败！');
                    isExist = false;
                }
            });
            return isExist;
        }

        handleFileChange(info){
            if (info.file.status === 'uploading') {
                this.setState({progress:info.file.percent})
            }else if (info.file.status === 'done') {
                if(info.file.response.status === '200'){
                    this.fileName = info.file.response.message;
                    this.setState({progress:info.file.percent});
                    message.success('文件上传成功！');
                }else {
                    message.error(info.file.response.message)
                }
            } else if (info.file.status === 'error') {
                message.error('文件上传失败！')
            }
        }

        handleSubmit(){
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    if(this.fileName !== ''){
                        let params = {...values};
                        params.publishDate = params.publishDate.format('YYYY-MM-DD');
                        params.sourceUrl = this.fileName;
                        console.log(params);
                        ApiUtil.addNewAchievement(params, (error, data)=>{
                            if(!error){
                                if(data.status === '200'){
                                    this.fileName = '';
                                    this.props.addAchievementsSuccess();
                                }else {
                                    message.error(data.message)
                                }
                            }else {
                                message.error('成果添加失败！')
                            }
                        });
                    }else {
                        message.error('请先上传文件！')
                    }
                }
            });
        }
    }
);

export default addAchievementsList;