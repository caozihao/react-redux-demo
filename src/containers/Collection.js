import React,{ Component,PropTypes } from "react"
import { connect } from "react-redux"
import { fetchPosts,checkedTodo,checkedToTalTodo,operatePopup,operateMask,getCollectionList,switchFlagTodo,deleteTodo} from "../actions/index";
import { MODULE_COLLECTION,SWITCH_FLAG,DELETE_ITEM,
    CHECKED_SIN_STATUS,CHECKED_ALL_STATUS,POPUP_STATUS} from "../actions/index"
import {TASK} from "../actions/index"
import CollectionList from "../components/CollectionList"
import Paging from "../components/Paging"

class Collection extends Component{

    //在挂载发生后被立即调用，需要DOMnode的初始化应该放在那里
    componentDidMount(){
        const { dispatch} = this.props;
        dispatch(getCollectionList(1));
    }
    
    //改变选择
    checkedToTal(e){
        const { dispatch} = this.props;
        const checked = e.target.checked;
        dispatch(checkedToTalTodo(MODULE_COLLECTION,CHECKED_ALL_STATUS,checked))
    }

    checkedTodo(index,checked){
        const { dispatch} = this.props;
        dispatch(checkedTodo(MODULE_COLLECTION,CHECKED_SIN_STATUS,index,checked))
    }

    //打开遮罩层
    openTaskPopup(){
        const { dispatch} = this.props;
        dispatch(operateMask(true));
        dispatch(operatePopup(MODULE_COLLECTION,POPUP_STATUS,"add",true));
    }

    //启动/暂停
    changeBtnSwitch(index,cid,switchFlag){
        const { dispatch} = this.props;
        let param = {
            type:1,
            url:TASK.SWITCH,
            queryParams:null,
            formParams:{
                taskId:cid,
                switch:switchFlag ? 1 : 0
            },
            success:(() => dispatch(switchFlagTodo(MODULE_COLLECTION,SWITCH_FLAG,index,switchFlag)))
        };

        dispatch(fetchPosts(param));
    }
    
    //删除
    deleteTaskById(index,cid){
        const { dispatch} = this.props;
        let param = {
            type:1,
            url:TASK.DETELE,
            queryParams:null,
            formParams:{
                taskId:cid
            },
            success:(() => dispatch(deleteTodo(MODULE_COLLECTION,DELETE_ITEM,index)))
        };
        dispatch(fetchPosts(param));
    }

    //刷新
    refresh(){
        const { dispatch} = this.props;
        dispatch(getCollectionList(1));
    }
    
    render(){
        const { list,pageNo,pageSize,pageTotal,dispatch} = this.props;
        return (
            <div className="list-box ajaxtable-container" data-method="getDataList">
                <div className="list-box-head clearfix">
                    <div className="list-box-title fl"><h2>采集列表</h2></div>
                    <div className="list-box-edit fr">

                        <button type="button" className="btn btn-primary"  onClick={this.refresh.bind(this)}>
                            <i className="fa fa fa-refresh"/>
                            刷新
                        </button>&nbsp;&nbsp;

                        <button type="button" className="btn btn-primary"  onClick={this.openTaskPopup.bind(this)}>
                            <i className="fa fa-plus-circle"/>
                            新建任务
                        </button>

                    </div>
                </div>

                <table style={{ width:"100%",border:0,cellspacing:0,cellpadding:0}} >
                    <thead>
                        <tr>
                            <td><input type="checkbox" onChange = {(e) => this.checkedToTal(e)}/></td>
                            <td data-he-name="_id">任务名称</td>
                            <td data-he-name="task_name">状态</td>
                            <td data-he-name="size">详情</td>
                            <td className="text-center">操作</td>
                        </tr>
                    </thead>
                    <CollectionList
                        list={ list }
                        deleteTaskById = {(index,cid) => this.deleteTaskById(index,cid)}
                        changeBtnSwitch ={(index,cid,switchFlag) => this.changeBtnSwitch(index,cid,switchFlag)}
                        changeCheck = {(index,checked) => this.checkedTodo(index,checked)}/>
                    <tfoot>
                        <tr>
                            <td style={{colspan:8}}>
                                <div className="pagination-outter">
                                    <ul className="pagination"></ul>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <Paging pageTotal = { pageTotal } pageNo = { pageNo } pageSize = { pageSize } />
                
                <div className="list-box-edit fr">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" >
                        <i className="fa fa-plus-circle"/>
                        数据加工
                    </button>
                </div>
                
            </div>
        )
    }
}

const  mapStateToProps = (state) => {
    const { data } = state;
    const { collection:collection } =  data;
    const { list:list,pageNo,pageSize,pageTotal } = collection;
    
    return {
        list : list ? list : [],
        pageNo:pageNo,
        pageSize:pageSize,
        pageTotal:pageTotal
    }
};

export default connect(mapStateToProps)(Collection)




