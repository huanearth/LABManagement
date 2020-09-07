/**
 * author:苏晓
 * 功能：访问后台接口类
 * 创建时间：2019-03-05
 */
export default class ApiUtil {
    constructor() {
        this.state = {

        };
    }

    //注册接口
    static registerNewUser(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/applicant/register",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //查询全部角色
    static getAllRoles(cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/role/all",
            type: "get",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //添加角色
    static addNewRole(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/role/insert",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //添加角色
    static updateRole(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/role/update",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除角色
    static deleteRole(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/role/delete",
            type: "delete",
            data: JSON.stringify({id:id}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //同意或拒绝注册申请接口
    static agreeRegisterNewUser(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/applicant/reviewApplicant",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //获取所有注册后未同意的列表
    static getAllApplication(cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/applicant/all",
            type: "get",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //登录接口
    static userLogin(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/user/login",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //按条件查询经费
    static getFundsByParams(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/fm/fund",
            type: "get",
            data:{...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //增加经费
    static addNewFunds(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/fm/fund/insert",
            type: "post",
            data:JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取图书
    static getBookByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/book",
            type: "get",
            data: {...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //添加图书
    static addNewBook(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/book/insert",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改图书
    static updateBook(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/book/update",
            type: "put",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除图书
    static deleteBook(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/book/" + id,
            type: "delete",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //获取所有用户
    static getAllUsers(cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/user/all",
            type: "get",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //新增用户
    static addNewUser(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/user/insert",
            type: "post",
            data:JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改用户基本信息
    static updataUser(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/user/patch",
            type: "patch",
            data:JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除用户
    static deleteUser(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/user/delete",
            type: "delete",
            data:JSON.stringify({id:id}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //文件上传前通过文件名检查文件是否与以存在的冲突,需要先检查在进行后续操作，因此设置为同步
    static checkFileIsExist(fileName, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/fileLoad/checkFile",
            type: "get",
            data:{fileName:fileName},
            async:false,
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //通过传文件名直接删除文件
    static deleteFileByFileName(fileName, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/fileLoad/deleteFile?fileName=" + fileName,
            type: "delete",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取成果
    static getAchievementByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/achievement",
            type: "get",
            data:{...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //添加成果
    static addNewAchievement(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/achievement/insert",
            type: "post",
            data:JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除成果
    static deleteAchievement(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/achievement/delete",
            type: "delete",
            data:JSON.stringify({id:id}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取其他文件中的文件
    static getOtherFilesByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/otherFile",
            type: "get",
            data:{...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //向其他文件目录中添加文件
    static addNewOtherFile(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/otherFile/insert",
            type: "post",
            data:JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改其他文件目录中的文件
    static updateOtherFile(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/otherFile/update",
            type: "put",
            data:JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除其他文件中的文件
    static deleteOtherFile(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/am/otherFile/delete",
            type: "delete",
            data:JSON.stringify({id:id}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取服务器列表
    static getServerByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/facility",
            type: "get",
            data: {...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //添加服务器
    static addNewServer(params, cb){
        $.ajax({
            url: "labmanage/api/lab538/bm/facility/insert",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改服务器
    static updateServer(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/facility/patch",
            type: "patch",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除服务器
    static deleteServer(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/facility/" + id,
            type: "delete",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取电脑列表
    static getComputerByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/computer",
            type: "get",
            data: {...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });

    }

    //添加电脑
    static addNewComputer(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/computer/insert",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改电脑
    static updateComputer(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/computer/update",
            type: "put",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除电脑
    static deleteComputer(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/computer/" + id,
            type: "delete",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //获取全部权限
    static getAllFunction(cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/functionRight/all",
            type: "get",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });

    }

    //添加权限
    static addNewFunction(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/functionRight/insert",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改权限
    static updateFunction(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/functionRight/patch",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除权限
    static deleteFunction(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/functionRight/delete",
            type: "delete",
            data: JSON.stringify({id:id}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //判断用户是否登录
    static userIsLogin(cb){
        $.ajax({
            url: "/labmanage/api/lab538/sm/user/session",
            type: "get",
            async: false,
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取显示器列表
    static getScreenByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/display",
            type: "get",
            data: {...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });

    }

    //添加显示器
    static addNewScreen(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/display/insert",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改显示器
    static updateScreen(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/display/update",
            type: "put",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除显示器
    static deleteScreen(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/display/" + id,
            type: "delete",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取其他设备列表
    static getOtherFacilityByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/otherFacility",
            type: "get",
            data: {...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });

    }

    //添加其他设备
    static addNewOtherFacility(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/otherFacility/insert",
            type: "post",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改其他设备
    static updateOtherFacility(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/otherFacility/update",
            type: "put",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除其他设备
    static deleteOtherFacility(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/bm/otherFacility/" + id,
            type: "delete",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //分页获取周计划列表
    static getWeekPlanByPage(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/wpm/weeklyPlan",
            type: "get",
            data: {...params},
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });

    }

    //添加周计划
    static addNewWeekPlan(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/wpm/weeklyPlan/insert",
            type: "post",
            data: JSON.stringify({...params}),
            async: false,
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //修改周计划
    static updateWeekPlan(params, cb){
        $.ajax({
            url: "/labmanage/api/lab538/wpm/weeklyPlan/patch",
            type: "patch",
            data: JSON.stringify({...params}),
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }

    //删除其他设备
    static deleteWeekPlan(id, cb){
        $.ajax({
            url: "/labmanage/api/lab538/wpm/weeklyPlan/" + id,
            type: "delete",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                cb(null,data);
            },
            error: function (data, e) {
                console.log("error");
                console.log(e);
                console.log(data);
                cb(e, data);
            }
        });
    }
}