import fetch from "isomorphic-fetch"
import 'babel-polyfill'
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const INVALIDATE_POSTS = "INVALIDATE_POSTS";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const MODULE_COLLECTION = "MODULE_COLLECTION";

export const MODULE_MACHINING = "MODULE_MACHINING";

export const MODULE_EXPORT = "MODULE_EXPORT";

export const DATA = "DATA";

export const GET_LIST = "GET_LIST";

//单选
export const CHECKED_SIN_STATUS = "CHECKED_SIN_STATUS";
//多选
export const CHECKED_ALL_STATUS = "CHECKED_ALL_STATUS";

//启动，暂停
export const SWITCH_FLAG = "SWITCH_FLAG";

//遮罩层状态
export const MASK_STATUS = "MASK_STATUS";
//弹框状态
export const POPUP_STATUS = "POPUP_STATUS";

export const ADD_TODO = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export const BASE_URL = "http://192.168.1.31:8080";

export const TASK = {
    //创建采集任务
    CREATE : BASE_URL + "/mrdsj/ws/crawler/task/create",
    //删除任务
    DETELE : BASE_URL + "/mrdsj/ws/crawler/task/delete",
    //获得任务列表
    // GETLIST : BASE_URL + "/mrdsj/ws/crawler/monitor/info",
    GETLIST:"src/data/data.json",
    //启动停止采集任务
    SWITCH : BASE_URL + "/mrdsj/ws/crawler/crawl"
};

export function checkedTodo(module,type,index,checked){
    return{module,type,index,checked}
}
 
export function checkedToTalTodo(module,type,checked){
    return {module,type,checked}
}

export function changePage(module,type,pageNo) {
    return {module,type,pageNo}
}

export function switchFlagTodo(module,type,index,switchFlag) {
    return {module,type,index,switchFlag}
}

export function addTodo(param){
    return{type:ADD_TODO,param}
}

export function deleteTodo(module,type,index){
    return{module,type,index}
}

export function operateMask(status){
    return {type:MASK_STATUS,status}
}

export function operatePopup(module,type,name,status){
    return{module,type,name,status};
}

export function requestPosts(){
    return {
        type:REQUEST_POSTS
    }
}

export function getList(module,type,json,pageNo){
    return {
        module:module,
        type:type,
        list:json.data.taskList.slice( (pageNo - 1) * 10,pageNo * 10).map(data => {
            data.checked = false;
            return data;
        }),
        pageTotal: Math.ceil(json.data.size / 10)
    }
}


export function fetchPosts(param){

    return dispatch => {
        // 首次 dispatch：更新应用的 state 来通知
        // API 请求发起了。
        dispatch(requestPosts());

        // thunk middleware 调用的函数可以有返回值，
        // 它会被当作 dispatch 方法的返回值传递。

        // 这个案例中，我们返回一个等待处理的 promise。
        // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

        // var req = new Request(data.url,data.type ? "POST":"GET");
        //1 POST 0 GET
        if(param.queryParams){
            param.url = param.url + "?" + (() =>{
                    let queryParamsStr = "";
                    for(var i in param.queryParams){
                        if(param.queryParams[i]){
                            queryParamsStr += i + "=" + param.queryParams[i] + "&";
                        }
                    }
                    return queryParamsStr.substring(0,queryParamsStr.length -1 );
                })()
        }

        let P = {};


        if(param.type){
            P = {
                method: "POST",
                mode: 'cors',
                cache: 'default',
                body:(() =>{
                    if(param.url == TASK.CREATE){
                        let data = new FormData();
                        if(param.formParams){
                            for(let i in param.formParams){
                                data.append(i, param.formParams[i]);
                            }
                        }
                        return data;
                    }else if(param.url == TASK.GETLIST){
                        param.url = "src/data/data.json"
                    }else {
                        let formParamsStr = "";
                        if(param.formParams){
                            for(let i in param.formParams){
                                formParamsStr += i + "=" + param.formParams[i] + "&";
                            }
                        }
                        return formParamsStr.substring(0,formParamsStr.length -1 );
                    }
                })()
            };

            if(param.url != TASK.CREATE){
                P.headers = {
                    'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }
        }

        return fetch(param.url,P)
            .then(response =>{
                if(response.ok){
                    response.json().then(data =>{
                        // 可以多次 dispatch！
                        // 这里，使用 API 请求结果来更新应用的 state。
                        console.log("异步返回了!",data);
                        param.success(data);
                    })
                }else{
                    console.log("请求失败,状态码为",response.status);
                }
            },function(err){
                console.log("出错",err)
            })
    }
};

export function getCollectionList(pageNo){
    return dispatch =>{
        let param = {
            type:0,
            url:TASK.GETLIST,
            queryParams:{
                pageNo:pageNo,
                pageSize:10
            },
            formParams:null,
            success:(data => {
                console.log("异步返回了666666666!",data);
                dispatch(getList(MODULE_COLLECTION,GET_LIST,data,pageNo));
                dispatch(changePage(MODULE_COLLECTION,CHANGE_PAGE,pageNo))
            })
        };
        dispatch(fetchPosts(param));
    };
}

