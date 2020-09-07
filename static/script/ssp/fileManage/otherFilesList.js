/**
* author:苏晓
* 功能：其他文件管理组件
* 创建时间：2019-04-12
*/
import React from 'react';
import {Button, Col, DatePicker, Row, Select, Table, Input, Icon, Upload, message, Modal, Progress} from "antd";
import moment from "moment";
import Config from "../../utils/config";
import ApiUtil from "../../utils/apiUtils";
import CommonUtils from "../../utils/commonUtils";
import store from "../redux/Store";

export default class OtherFilesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pagination: {...Config.defaultPagination},
            uploaderToSearch:'0',
            keyword:'',
            fileList:[],
            uploadFileList:[],
            uploaderFinder:'',
            isShowAddFileModel:false,
            isShowEditModel:false,
            editOtherFileData:{},
            fileName:'',
            description:'',
            progress:'',
            isShowProgress: false,
        };

        this.fileName = '';

        this.setClassName = this.setClassName.bind(this);
        this.getOtherByParams = this.getOtherByParams.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleBeforeUpload = this.handleBeforeUpload.bind(this);
        this.handleAddFileSubmit = this.handleAddFileSubmit.bind(this);
        this.handleEditFileSubmit = this.handleEditFileSubmit.bind(this);
    }

    render(){
        const fileColumns =
            [{title: '文件名', dataIndex: 'fileName', width: '20%', align: 'center',},
             {title: '上传时间', dataIndex: 'upLoadDate', width: '10%', align: 'center', defaultSortOrder: 'descend', sorter: (a, b) => {return(a.uploadDate>b.uploadDate? 1:-1)}},
             {title: '上传人', dataIndex: 'uploader', width: '10%', align: 'center',},
             {title: '描述', dataIndex: 'description', width: '45%', align: 'center',},
             {title: '操作', dataIndex: '', width: '15%', align: 'center',
                render: (data)=>{
                    return(
                        <span>
                            <a href={"http://10.0.4.53:8557/labmanage/api/lab538/am/fileLoad/receiveDownload?file=" + data.sourceUrl} download>
                                <i title='下载' className="fa fa-download" aria-hidden="true" style={{paddingRight:'10px', color:'black'}}/>
                            </a>
                            <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                               onClick={()=>{
                                   this.setState({
                                       isShowEditModel:true,
                                       editOtherFileData:{...data},
                                   })
                               }}/>
                            <i title='删除' className="fa fa-trash" aria-hidden="true"
                               onClick={()=>{this.handleOtherFileDelete(data.id)}}/>
                        </span>
                    )}
                }];

        return(
            <div>
                <Row className='searchZone' style={{display:'flex'}}>
                    <Col span={2}>上传人</Col>
                    <Col span={2}>
                        <Input value={this.state.uploaderFinder} onChange={(event)=>{this.setState({uploaderFinder:event.target.value})}}/>
                    </Col>
                    <Col span={2}>文件名</Col>
                    <Col span={6}>
                        <Input value={this.state.keyword} onChange={(event)=>{this.setState({keyword:event.target.value})}}/>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#6699cc', color:'white'}}
                                onClick={()=>{
                                    let params = {
                                        currentPage:Config.defaultPagination.current,
                                        pageSize:Config.defaultPagination.pageSize,
                                        uploader: this.state.uploaderFinder,
                                        fileName: this.state.keyword,
                                    };
                                    this.getOtherByParams(params)
                                }}
                        >
                            查询
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                onClick={()=>{
                                    this.setState({
                                        uploaderToSearch:'0',
                                        keyword:'',
                                    })}
                                }>重置</Button>
                    </Col>
                </Row>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}} onClick={()=>this.setState({isShowAddFileModel:!this.state.isShowAddFileModel})}>
                            {this.state.isShowAddFileModel? '取消' : '添加文件'}
                        </Button>
                    </Col>
                    {this.state.isShowAddFileModel?
                        <div>
                            <Col span={20}>
                                <Row className='addFileModel' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>文件名</span>
                                    </Col>
                                    <Col span={6}>
                                        <Input value={this.state.fileName}
                                               onChange={(event)=>{this.setState({fileName: event.target.value})}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>说明</span>
                                    </Col>
                                    <Col span={14}>
                                        <Input value={this.state.description}
                                               onChange={(event)=>{this.setState({description: event.target.value})}}
                                        />
                                    </Col>
                                </Row>
                                <Row className='addFileModel' style={{display:'flex', marginTop:'5px'}}>
                                    <Col span={2}/>
                                    <Col span={22} style={{textAlign:'left'}}>
                                        <Row>
                                            <Upload
                                                action='/labmanage/api/lab538/am/fileLoad/singleUpload'
                                                fileList={this.state.uploadFileList}
                                                onChange={this.handleFileChange}
                                                beforeUpload={this.handleBeforeUpload}
                                                onRemove={()=>{
                                                    this.setState({
                                                        uploadFileList:[],
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
                            </Col>
                            <Col span={2}>
                                <Row>
                                    <Button style={{backgroundColor: '#6699cc', color:'white'}} onClick={()=>{this.handleAddFileSubmit()}}>提交</Button>
                                </Row>
                                <Row>
                                    <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                            onClick={()=>
                                                this.setState({
                                                    uploader:'0',
                                                    fileName:'',
                                                    description:'',
                                                    uploadFileList:[],
                                                    isShowProgress:false,
                                                })}
                                    >
                                        重置
                                    </Button>
                                </Row>
                            </Col>
                        </div> : null
                    }
                </Row>
                <Row>
                    <Table columns={fileColumns}
                           dataSource={this.state.fileList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey="fundsTable"
                           className='fundsTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getOtherByParams({currentPage:pagination.current, pageSize:pagination.pageSize});
                           }}
                    />
                </Row>
                <Modal
                    title="修改其他文件"
                    visible={this.state.isShowEditModel}
                    onCancel={()=>{this.setState({isShowEditModel:false})}}
                    footer={[
                        <Button key="submit" type="primary" onClick={()=>{this.handleEditFileSubmit()}}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({isShowEditModel:false})}}>取消</Button>,
                    ]}
                >
                    <div id='updateOtherFileModel'>
                        <Row >
                            <Col span={4}>
                                <span>文件名称</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.editOtherFileData.fileName}
                                       onChange={(event)=>{this.handleEditOtherFileInfoChange(event.target.value, 'fileName')}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={4}>
                                <span>说明</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.editOtherFileData.description}
                                       onChange={(event)=>{this.handleEditOtherFileInfoChange(event.target.value, 'description')}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Upload
                                action='/labmanage/api/lab538/am/fileLoad/singleUpload'
                                fileList={this.state.uploadFileList}
                                onChange={this.handleFileChange}
                                beforeUpload={this.handleBeforeUpload}
                                onRemove={()=>{
                                    this.setState({
                                        uploadFileList:[],
                                        isShowProgress:false,
                                    })
                                }}
                            >
                                <Button style={{backgroundColor: '#6699cc', color:'white'}}>
                                    <span style={{display:'flex', alignItems:'center'}}><Icon type="upload" /> 选择文件</span>
                                </Button>
                                <span style={{color:'blue'}}>若要修改原文件，重新上传即可</span>
                            </Upload>
                        </Row>
                        <Row>
                            {this.state.isShowProgress? <Progress strokeWidth='2px' percent={this.state.progress} status={this.state.progress===100? '' : 'active'} /> : null}
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getOtherByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize})
    }

    getOtherByParams(params){
        ApiUtil.getOtherFilesByPage({...params}, (error, data)=>{
            if(!error){
                if(data.status === '200' && data.message === 'backup'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        fileList: data.result,
                    })
                }else {
                    message.error(data.message)
                }
            }else {
                message.error('获取其他文件列表失败！')
            }
        });
    }

    handleOtherFileDelete(id){
        ApiUtil.deleteOtherFile(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getOtherByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize})
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
                        uploadFileList:[file],
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
    };

    handleFileChange(info){
        if (info.file.status === 'uploading') {
            this.setState({progress:info.file.percent})
        }else if (info.file.status === 'done') {
            if(info.file.response.status === '200'){
                this.setState({progress:info.file.percent});
                this.fileName = info.file.response.message;
                message.success('文件上传成功！');
            }
        } else if (info.file.status === 'error') {
            message.error('文件上传失败！')
        }
    }

    handleAddFileSubmit(){
        let params = {
            fileName:this.state.fileName,
            description:this.state.description,
            upLoadDate:new moment().format('YYYY-MM-DD'),
            uploader:store.getState().userInfo.name,
        };
        if(this.fileName !== ''){
            params.sourceUrl = this.fileName;
            ApiUtil.addNewOtherFile(params, (error, data)=>{
                if(!error){
                    if(data.status === '200'){
                        this.fileName = '';
                        this.getOtherByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                        this.setState({
                            isShowAddFileModel:false,
                            uploadFileList:[],
                            isShowProgress:false,
                            progress:0,
                        })
                        message.success('文件添加成功！')
                    }else {
                        message.error(data.message)
                    }
                }else {
                    message.error('数据添加失败！')
                }
            });
        }else {
            message.error('请先上传文件！')
        }
    }

    handleEditFileSubmit(){
        let params = {...this.state.editOtherFileData};
        let perFileName = params.sourceUrl;
        if(this.fileName !== ''){
            ApiUtil.deleteFileByFileName(perFileName, (error, data)=>{
                if(!error){
                    if(data.status === '1-删除成功'){
                        message.success('原文件删除成功！')
                    }else {
                        message.warning(data)
                    }
                }else {
                    message.error('原文件删除失败！')
                }
            });
        }
        params.sourceUrl = this.fileName===''? params.sourceUrl : this.fileName;
        ApiUtil.updateOtherFile(params, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.fileName = '';
                    this.getOtherByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                    this.setState({
                        isShowEditModel:false,
                        uploadFileList:[],
                        isShowProgress:false,
                        progress:0,
                    });
                    message.success('文件修改成功！')
                }else {
                    message.error(data.message)
                }
            }else {
                message.error('文件修改失败！')
            }
        });
    }

    handleEditOtherFileInfoChange(value, type){
        let editOtherFileData = this.state.editOtherFileData;
        switch (type) {
            case 'fileName':
                editOtherFileData.fileName = value;
                break;
            case 'description':
                editOtherFileData.description = value;
                break;
            default:
                break;
        }
        this.setState({
            editOtherFileData:editOtherFileData,
        })
    }
}