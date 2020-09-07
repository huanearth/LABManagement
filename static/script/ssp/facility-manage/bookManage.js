/**
* author:苏晓
* 功能：图书管理组件
* 创建时间：2019-04-10
*/
import React from 'react';
import {Button, Col, Row, Table, Input, Modal, DatePicker, message} from "antd";
import moment from "moment";
import Config from "../../utils/config";
import ApiUtil from "../../utils/apiUtils";

const { TextArea } = Input;

export default class BookManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowSummary: false,
            summary:'',
            keyword:'',
            booksList:[],
            pagination: {...Config.defaultPagination},
            isShowAddBookModel:false,
            isShowEditModel:false,
            addBookList:{bookName:'大论文', publishDate:moment(), author:'苏晓', purchaseDate:moment(), buyer:'苏晓', summary:'java'},
            editBookData:[],
        };

        this.getBooksByParams = this.getBooksByParams.bind(this);
        this.setClassName = this.setClassName.bind(this);
        this.handleAddItemInfoChange = this.handleAddItemInfoChange.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
        this.handleUpdateBook = this.handleUpdateBook.bind(this);

    }

    render(){
        const bookColumns =
            [{title: '书名', dataIndex: 'bookName', width: '20%', align: 'center',},
            {title: '出版日期', dataIndex: 'publishDate', width: '20%', align: 'center', defaultSortOrder: 'descend', sorter: (a, b) => {return(a.publishDate>b.publishDate? 1:-1)}},
            {title: '作者', dataIndex: 'author', width: '15%', align: 'center',},
            {title: '购买日期', dataIndex: 'purchaseDate', width: '20%', align: 'center',},
            {title: '购买人', dataIndex: 'buyer', width: '10%', align: 'center',},
            {title: '操作', dataIndex: '', width: '15%', align: 'center',
                render: (data)=>{
                    return(
                        <span>
                            <i title='查看详情' className="fa fa-file-text" aria-hidden="true" style={{paddingRight:'10px'}}
                               onClick={()=>{this.setState({isShowSummary:true, summary:data.summary})}}/>
                            <i title='修改' className="fa fa-edit" aria-hidden="true" style={{paddingRight:'10px'}}
                                onClick={()=>{
                                    let bookData = {...data};
                                    bookData.purchaseDate = moment(data.purchaseDate);
                                    bookData.publishDate = moment(data.publishDate);
                                    this.setState({
                                        isShowEditModel:true,
                                        editBookData:bookData})
                                }}/>
                            <i title='删除' className="fa fa-trash" aria-hidden="true"
                            onClick={()=>{this.handleDeleteBook(data.id)}}/>
                        </span>
                    )
                }
            }];
        return(
            <div>
                <Row className='searchZone' style={{display:'flex'}}>
                    <Col span={2}>书名</Col>
                    <Col span={8}>
                        <Input value={this.state.keyword} onChange={(event)=>{this.setState({keyword:event.target.value})}}/>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#6699cc', color:'white'}}
                                onClick={()=>{
                                    let params = {
                                        currentPage:Config.defaultPagination.current,
                                        pageSize:Config.defaultPagination.pageSize,
                                        bookName: this.state.keyword,
                                    };
                                    this.getBooksByParams(params);
                                }}
                        >
                            查询
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button style={{backgroundColor: '#EFA718', color:'white'}} onClick={()=>{this.setState({keyword:'',})}}>重置</Button>
                    </Col>
                </Row>
                <Row style={{margin:'10px'}}>
                    <Col span={2}>
                        <Button style={{backgroundColor:'rgb(102, 153, 204)', color:'white'}} onClick={()=>this.setState({isShowAddBookModel:!this.state.isShowAddBookModel})}>
                        {this.state.isShowAddBookModel? '取消' : '新增图书'}
                    </Button>
                    </Col>
                    {this.state.isShowAddBookModel?
                        <div>
                            <Col span={20}>
                                <Row className='addBook' style={{display:'flex'}}>
                                    <Col span={2}>
                                        <span>书名</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addBookList.bookName}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'bookName')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>作者</span>
                                    </Col>
                                    <Col span={3}>
                                        <Input value={this.state.addBookList.author}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'author')}}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <span>出版日期</span>
                                    </Col>
                                    <Col span={3}>
                                        <DatePicker onChange={(value)=>{this.handleAddItemInfoChange(value, 'publishDate')}}
                                                    value={this.state.addBookList.publishDate}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>购买日期</span>
                                    </Col>
                                    <Col span={3}>
                                        <DatePicker onChange={(value)=>{this.handleAddItemInfoChange(value, 'purchaseDate')}}
                                                    value={this.state.addBookList.purchaseDate}/>
                                    </Col>
                                    <Col span={2}>
                                        <span>购买人</span>
                                    </Col>
                                    <Col span={2}>
                                        <Input value={this.state.addBookList.buyer}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'buyer')}}
                                        />
                                    </Col>
                                </Row>
                                <Row className='addBook' style={{display:'flex', marginTop:'5px'}}>
                                    <Col span={2}>
                                        <span>摘要</span>
                                    </Col>
                                    <Col span={22}>
                                        <Input value={this.state.addBookList.summary}
                                               onChange={(event)=>{this.handleAddItemInfoChange(event.target.value, 'summary')}}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <Row>
                                    <Button style={{backgroundColor: '#6699cc', color:'white'}} onClick={()=>{this.handleAddItemSubmit()}}>提交</Button>
                                </Row>
                                <Row>
                                    <Button style={{backgroundColor: '#EFA718', color:'white'}}
                                            onClick={()=>
                                                this.setState({
                                                    addBookList:{bookName:'大论文', publishDate:moment(), author:'苏晓', purchaseDate:moment(), buyer:'苏晓', summary:'java'},
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
                    <Table columns={bookColumns}
                           dataSource={this.state.booksList}
                           size={"middle"}
                           rowClassName={this.setClassName}
                           rowKey="booksTable"
                           className='booksTable'
                           pagination={this.state.pagination}
                           onChange={(pagination) => {
                               const pager = {...this.state.pagination};
                               pager.current = pagination.current;
                               this.setState({
                                   pagination: pager,
                               });
                               this.getBooksByParams({currentPage:pagination.current, pageSize:pagination.pageSize});
                           }}
                    />
                </Row>
                <Modal
                    title="摘要"
                    visible={this.state.isShowSummary}
                    onCancel={()=>{this.setState({isShowSummary:false})}}
                    footer={false}
                >
                    {this.state.summary}
                </Modal>
                <Modal
                    title="修改图书"
                    visible={this.state.isShowEditModel}
                    onCancel={()=>{this.setState({isShowEditModel:false})}}
                    footer={[
                        <Button key="submit" type="primary" onClick={()=>{this.handleUpdateBook()}}>提交</Button>,
                        <Button key="reset" onClick={()=>{this.setState({isShowEditModel:false})}}>取消</Button>,
                    ]}
                >
                    <div id='updateBookModel'>
                        <Row >
                            <Col span={4}>
                                <span>书名</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.editBookData.bookName}
                                       onChange={(event)=>{this.handleEditBookInfoChange(event.target.value, 'bookName')}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={4}>
                                <span>作者</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.editBookData.author}
                                       onChange={(event)=>{this.handleEditBookInfoChange(event.target.value, 'author')}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={4}>
                                <span>出版日期</span>
                            </Col>
                            <Col span={20}>
                                <DatePicker onChange={(value)=>{this.handleEditBookInfoChange(value, 'publishDate')}}
                                            value={this.state.editBookData.publishDate} style={{width:'100%'}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={4}>
                                <span>购买日期</span>
                            </Col>
                            <Col span={20}>
                                <DatePicker onChange={(value)=>{this.handleEditBookInfoChange(value, 'purchaseDate')}}
                                            value={this.state.editBookData.purchaseDate} style={{width:'100%'}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={4}>
                                <span>购买人</span>
                            </Col>
                            <Col span={20}>
                                <Input value={this.state.editBookData.buyer}
                                       onChange={(event)=>{this.handleEditBookInfoChange(event.target.value, 'buyer')}}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={4}>
                                <span>简介</span>
                            </Col>
                            <Col span={20}>
                                <TextArea value={this.state.editBookData.summary}
                                       onChange={(event)=>{this.handleEditBookInfoChange(event.target.value, 'summary')}}/>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        this.getBooksByParams({currentPage:this.state.pagination.current, pageSize:this.state.pagination.pageSize})
    }

    getBooksByParams(params){
        console.log({...params});
        ApiUtil.getBookByPage({...params}, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.state.pagination.total = data.totalNum;
                    this.state.pagination.current = data.currentPage;
                    this.setState({
                        booksList: data.result,
                    });
                }else {
                    message.error('图书列表获取有误！')
                }
            }else {
                message.error('图书列表获取失败！')
            }
        })
    }

    handleAddItemSubmit(){
        let params = {...this.state.addBookList};
        params.purchaseDate = params.purchaseDate.format('YYYY-MM-DD');
        params.publishDate = params.publishDate.format('YYYY-MM-DD');
        ApiUtil.addNewBook(params, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getBooksByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                    this.setState({
                        isShowAddBookModel:false,
                    })
                }else {
                    message.error('图书添加有误！')
                }
            }else {
                message.error('图书添加失败！')
            }
        });
    }

    handleDeleteBook(id){
        ApiUtil.deleteBook(id, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getBooksByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                }else {
                    message.error('图书删除有误！')
                }
            }else {
                message.error('图书删除失败！')
            }
        });
    }

    handleUpdateBook(){
        let params = {...this.state.editBookData};
        params.purchaseDate = params.purchaseDate.format('YYYY-MM-DD');
        params.publishDate = params.publishDate.format('YYYY-MM-DD');
        ApiUtil.updateBook(params, (error, data)=>{
            if(!error){
                if(data.status === '200'){
                    this.getBooksByParams({currentPage:Config.defaultPagination.current, pageSize:Config.defaultPagination.pageSize});
                    this.setState({
                        isShowEditModel:false,
                        editBookData:[],
                    })
                }else {
                    message.error('图书修改有误！')
                }
            }else {
                message.error('图书修改失败！')
            }
        });
    }

    setClassName(record, index) {
        return (index % 2 === 0 ? 'oddRow' : 'evenRow')
    }

    handleAddItemInfoChange(value, type){
        let addBookList = this.state.addBookList;
        switch (type) {
            case 'bookName':
                addBookList.bookName = value;
                break;
            case 'publishDate':
                addBookList.publishDate = value;
                break;
            case 'author':
                addBookList.author = value
                break;
            case 'purchaseDate':
                addBookList.purchaseDate = value;
                break;
            case 'buyer':
                addBookList.buyer = value;
                break;
            case 'summary':
                addBookList.summary = value;
                break;
            default:
                break;
        }
        this.setState({
            addBookList:addBookList,
        })
    }

    handleEditBookInfoChange(value, type){
        let editBookData = this.state.editBookData;
        switch (type) {
            case 'bookName':
                editBookData.bookName = value;
                break;
            case 'publishDate':
                editBookData.publishDate = value;
                break;
            case 'author':
                editBookData.author = value
                break;
            case 'purchaseDate':
                editBookData.purchaseDate = value;
                break;
            case 'buyer':
                editBookData.buyer = value;
                break;
            case 'summary':
                editBookData.summary = value;
                break;
            default:
                break;
        }
        this.setState({
            editBookData:editBookData,
        })
    }
}