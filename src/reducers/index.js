import { combineReducers } from "redux"
import { MODULE_COLLECTION,MODULE_EXPORT,MODULE_MACHINING,GET_LIST,SWITCH_FLAG,DELETE_ITEM,
    CHECKED_SIN_STATUS,CHECKED_ALL_STATUS ,MASK_STATUS,POPUP_STATUS,CHANGE_PAGE} from "../actions/index"

const modulesInitData = {
    collection:{
        list:[],
        pageNo:1,
        pageSize:10,
        pageTotal:0,
        cur:{},
        popup:{
            add:false
        }
    },
    machining:{
        list:[],
        cur:{}
    },
    export:{
        list:[],
        cur:{}
    }
};

function getList(state,action){
    let state_ = Object.assign({},state);
    state_[action.d_type]["list"] = action.list;
    state_[action.d_type]["pageTotal"] = action.pageTotal;
    return state_;
}

function checkSin(state,action) {
    let c_list = state[action.d_type].list;
    let check_sin_arr =[
        ...c_list.slice(0, action.index),
        Object.assign({}, c_list[action.index], {
            checked: action.checked
        }),
        ...c_list.slice(action.index + 1)
    ];

    let state_ = Object.assign({},state);
    state_[action.d_type]["list"] = check_sin_arr;
    return state_;
}

function checkAll(state,action){
    let c_list = state[action.d_type].list;
    let check_item_arr =  Object.assign([],c_list);
    check_item_arr = c_list.map(data => {
        data.checked = action.checked;
        return data;
    });

    let state_ = Object.assign({},state);
    state_[action.d_type]["list"] = check_item_arr;
    return state_;

}

function switchFlag(state,action){
    let c_list = state[action.d_type].list;
    let oper_sin_arr =[
        ...c_list.slice(0, action.index),
        Object.assign({}, c_list[action.index], {
            switch: action.switchFlag
        }),
        ...c_list.slice(action.index + 1)
    ];

    let state_ = Object.assign({},state);
    state_[action.d_type]["list"] = oper_sin_arr;
    return state_;

}

function deleteById(state,action){
    let c_list = state[action.d_type].list;
    let del_sin_arr = Object.assign([],c_list);
    del_sin_arr.splice(action.index,1);

    let state_ = Object.assign({},state);
    state_[action.d_type]["list"] = del_sin_arr;
    return state_;
}

function changePage(state,action){
    let state_ = Object.assign({},state);
    state_[action.d_type].pageNo = action.pageNo;
    return state_;
}

function data(state = modulesInitData ,action){
    switch (action.module){
        case MODULE_COLLECTION :
            action.d_type = "collection";
            switch (action.type){
                case GET_LIST :
                    return  getList(state,action);
                case CHECKED_ALL_STATUS :
                    return checkAll(state,action);
                case CHECKED_SIN_STATUS :
                    return checkSin(state,action);
                case DELETE_ITEM :
                    return deleteById(state,action);
                case SWITCH_FLAG :
                    return switchFlag(state,action);
                //改变弹框状态
                case POPUP_STATUS :
                    return changePopup(state,action);
                //改变分页
                case CHANGE_PAGE:
                    return changePage(state,action);
            }
        case MODULE_EXPORT :
            action.d_type = "export";
            return;
        case MODULE_MACHINING :
            action.d_type = "machining";
            return;
        default:
            return state
    }
}

//改变弹框状态
function changePopup(state,action){
    let state_ = Object.assign({},state);
    state_[action.d_type]["popup"][action.name] = action.status;
    return state_;
}

const topInitData = {
    mask:false
};

function top(state = topInitData,action){
    switch (action.type){
        case MASK_STATUS :
            return Object.assign({},state,{
                mask:action.status
            });

        default:
            return state
    }
}


const rootReducer = combineReducers({
    data,
    top
});

export default rootReducer

