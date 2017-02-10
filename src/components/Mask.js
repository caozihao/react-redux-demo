import React,{ PropTypes,Component } from "react";
import { connect } from "react-redux";

export default class Mask extends Component{

    render(){

        let showMask = "hide";

        if(this.props.mask){
            showMask = !this.props.mask ? "hide" : "";
        }

        return (
            <div  id="sys-mask" className={ showMask }></div>
        )
    }
}

