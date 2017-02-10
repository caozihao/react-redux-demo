import React,{ PropTypes,Component } from "react"
import { connect } from "react-redux"
import { changePage,CHANGE_PAGE,getCollectionList,MODULE_COLLECTION} from "../actions/index"

class Paging extends Component {

    handClick (pageNo,props){
        const { dispatch} = props;
        dispatch(getCollectionList(pageNo));
    }

    goNext (){
        const { dispatch} = this.props;
        let cur = this.props.pageNo;
        if(cur < this.props.pageTotal && cur > 0){
            dispatch(getCollectionList(cur + 1));
        }
    }

    goPrev (){
        const { dispatch} = this.props;
        let cur = this.props.pageNo;
        if(cur <= this.props.pageTotal && cur > 1){
            dispatch(getCollectionList(cur - 1));
        }
    }

    goPage (){
        const { dispatch} = this.props;
        var val = this.refs.jumpValue.value;

        if(!/^[1-9]\d*$/.test(val)){
            alert('页码只能输入大于1的正整数');
        }else if(parseInt(val) > parseInt(this.props.pageTotal)){
            alert('没有这么多页');
        }else{
            dispatch(getCollectionList(parseInt(val)));
        }
    }

    render (){
        let self = this;
        let props = this.props;
        let pageTotal = this.props.pageTotal;
        let cur = this.props.pageNo;
        let items = [];
        let begin;
        let len;
        if(pageTotal > 5){
            len = 5;
            if(cur >= (pageTotal-2)){
                begin = pageTotal - 4;
            }else if(cur <= 3){
                begin = 1;
            }else{
                begin = cur - 2;
            }
        }else{
            len = pageTotal;
            begin = 1;
        }
        for(let i = 0; i < len; i ++){
            let cur = this.props.pageNo;
            let showI = begin + i;
            if(cur == showI){
                items.push({num : showI, cur : true});
            }else{
                items.push({num : showI, cur : false});
            }

        }
        
        return  <div className="ui-pagnation">
                    <div className={ 'prev' } onClick={this.goPrev.bind(this)} />
                    <div className="pagnation-cols">
                        {
                            items.map(function(item,i){
                                return <div key={ i } onClick={self.handClick.bind(this,item.num,props)} className={item.cur? 'num current' : 'num'}>{item.num}</div>
                            })
                        }
                    </div>
                    <div className={ 'next' } onClick={this.goNext.bind(this)}/>
                    <div className="fl">
                        <div className="num-total">共 { pageTotal } 页</div> ，到第&nbsp;&nbsp;
                        <input type="text"  ref="jumpValue" /> &nbsp;&nbsp;页&nbsp;&nbsp;
                    </div>
                    <button onClick={this.goPage.bind(this)} className="btn btn-default fl">确定</button>
                    <div style={{ clear:"both" }}></div>
              </div>
    }
}


export default connect(state => state)(Paging)
