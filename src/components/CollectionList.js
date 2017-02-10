import React,{ PropTypes,Component} from "react";

export default class CollectionList extends Component{

    switchStatus(lastIndex,keywordCount){
        //last index为0 未开始 last index等于kewordcount 采集完成 否则采集中
        let statusStr = "";
        if(lastIndex){
            if(lastIndex == keywordCount){
                statusStr = "采集完成"
            }else{
                statusStr = "采集中"
            }
        }else{
            statusStr = "未开始"
        }
        return statusStr;
    }

    changeCheck(e,i){
        const checked = e.target.checked;
        this.props.changeCheck(i,checked)
    }

    deleteTaskById(index,cid){
        this.props.deleteTaskById(index,cid)
    }

    changeBtnSwitch(index,cid,switchFlag){
        this.props.changeBtnSwitch(index,cid,switchFlag ? false : true)
    }

    render(){
        return(
           <tbody >
            {
                this.props.list.map((data,i) =>
                <tr key ={ data.taskId }>
                    <td><input type="checkbox" defaultChecked = {data.checked}  checked = {data.checked} onChange={(e) => this.changeCheck(e,i)}/></td>
                    <td>{ data.taskName }</td>
                    <td>{this.switchStatus(data.lastIndex,data.keywordCount)}</td>
                    <td>{ data.lastIndex } / {data.keywordCount}</td>
                    <td className="text-center">
                        <button type="button"  className="btn btn-default" onClick={this.changeBtnSwitch.bind(this,i,data.taskId,data.switch)} >{data.switch ? "暂停" : "启动"}</button>&nbsp;&nbsp;
                        <button type="button"  className="btn btn-danger" onClick={this.deleteTaskById.bind(this,i,data.taskId)} >删除</button>
                    </td>
                </tr>)
            }
         </tbody>
        )
    }
}

