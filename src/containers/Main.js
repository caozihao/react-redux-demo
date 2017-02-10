import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Mask from "../components/Mask";
import AddTable from "../components/AddTable"

class Main extends Component{
    render(){
        const { data,mask,dispatch} = this.props;
        
        return (
            <div>
                <div className = "all">
                    <div id="content" className="clearfix">
                        <div className="left-block-box ui-resizable"  id="left-block" style={{left: 0}}>
                            <div className="box-controller box-controller-lr" style={{cursor: "auto"}}>
                                <div className="tab-blue"></div>
                            </div>
                            <div className="left-block scroll-1">
                                <div className="box-container">
                                    <div className="logobox">
                                        <Link to="index.html">
                                            <img src= {require("../public/images/logo02.png")} className="header-logo" />
                                        </Link>
                                    </div>
                                    <div className="card-box">
                                        <div className="box-title">
                                            菜 单
                                        </div>
                                        <ul className="list-menu">
                                            <li>
                                                <Link to="/collection">采 集
                                                    <i className="fa fa-angle-right" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/machining">加 工
                                                    <i className="fa fa-angle-right" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/export">导 出
                                                    <i className="fa fa-angle-right" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="center-info" id="center-block" style={{ left: "251px"}}>
                            {this.props.children}
                        </div>

                    </div>
                </div>
                <Mask mask = { mask }/>
                <AddTable data = { data } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { top,data} = state;

    return {
        mask:top.mask,
        data:data
    };
    
};

export default connect(mapStateToProps)(Main)
