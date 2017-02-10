import React,{ PropTypes,Component } from "react"
import { operateMask,operatePopup,fetchPosts,getCollectionList} from "../actions/index"
import { MODULE_COLLECTION,POPUP_STATUS} from "../actions/index"
import { connect } from "react-redux"
import {TASK} from "../actions/index"
let file = null;

class AddTable extends Component{

    closeTaskPopup(){
        const { dispatch} = this.props;
        dispatch(operateMask(false));
        dispatch(operatePopup(MODULE_COLLECTION,POPUP_STATUS,"add",false));
        this.clearForm();
        file = null;
    }

    uploadFile(e){
        file = e.target.files[0];
    }

    clearForm(){
        this.refs.taskCraw1.checked = false;
        this.refs.taskCraw2.checked = false;
        this.refs.taskCraw3.checked = false;
        this.refs.taskCraw4.checked = false;
        this.refs.taskName.value = "";
        file = null;
    }

    //创建采集任务
    addItem(){
        const { dispatch} = this.props;
        let taskCraw1 = this.refs.taskCraw1.checked ? 1 : 0;
        let taskCraw2 = this.refs.taskCraw2.checked ? 1 : 0;
        let taskCraw3 = this.refs.taskCraw3.checked ? 1 : 0;
        let taskCraw4 = this.refs.taskCraw4.checked ? 1 : 0;

        let param = {
            type:1,
            url:TASK.CREATE,
            queryParams:null,
            formParams:{
                taskName:this.refs.taskName.value,
                crawlConfig:(() =>{
                    return JSON.stringify({
                        1:taskCraw1.toString(),
                        2:taskCraw2.toString(),
                        3:taskCraw3.toString(),
                        4:taskCraw4.toString()
                    })
                })(),
                keyword:file
            },
            success:(() =>{
                dispatch(operateMask(false));
                dispatch(operatePopup(MODULE_COLLECTION ,POPUP_STATUS,"add",false));
                dispatch(getCollectionList(1));
                this.clearForm();
            })
        };
        dispatch(fetchPosts(param))
    }

    render(){
        
        let sys = "sys-dialog";
        let popupFlag = this.props.data["collection"].popup.add;
        let showAddPopup = !popupFlag ? "hide" : "";

        return(
            <div>
                <div className={ showAddPopup + " " + sys } style={{width: "600px",marginLeft: "-300px",top: "114.5px",display: "block"}}>

                    <div className="sys-dialog-head">
                        新建任务
                        <div className="sys-dialog-close" onClick={this.closeTaskPopup.bind(this)}></div>
                    </div>

                    <div className="sys-dialog-content">
                        <div className="sys-dialog-body clearfix" style={{height: "300px",overflow: "auto"}}>
                            <form className="form-horizontal task-create-form nice-validator n-default">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" data-for="task-name">任务名称：</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="name" className="form-control"  ref="taskName"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label prop="" className="col-sm-2 control-label" data-for="task-intervalType">词条导入：</label>
                                    <div className="col-sm-10">
                                        <input type="file" onChange={(e) => this.uploadFile(e)}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label" data-for="task-completed">选择采集源：</label>
                                    <div className="col-sm-10 checkbox-line">
                                        <input type="checkbox" className="" value="1" ref="taskCraw1"/>百度百科
                                        <input type="checkbox" className="" value="2" ref="taskCraw2"/>互动百科
                                        <input type="checkbox" className="" value="3" ref="taskCraw3"/>维基百科
                                        <input type="checkbox" className="" value="4" ref="taskCraw4"/>CBDB
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="sys-dialog-foot">
                            <input type="button" className="btn btn-cancel" value=" 取 消 " onClick={this.closeTaskPopup.bind(this)} />&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="button" className="btn btn-create" value=" 保 存 " onClick={this.addItem.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default connect(state => state)(AddTable)

