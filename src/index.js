import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux"
import { Router, Route, browserHistory, IndexRoute ,hashHistory} from 'react-router'
import Main from "./containers/Main"
import Collection from "./containers/Collection"
import Export from "./containers/Export"
import Machining from "./containers/Machining"
import configureStore from './store/configureStore'

//引入less文件，会自动编译
require('./public/less/less-common.less');
require('./public/less/common.less');
require('./public/less/default.less');
require('./public/less/index.less');


const store =  configureStore();

render((
    <Provider store={store}>
        <Router history = {hashHistory} >
            <Route path="/" component = { Main } >
                <IndexRoute component = { Main }/>
                <Route path="/collection" component = { Collection }/>
                <Route path="/machining" component = { Machining }/>
                <Route path="/export" component = { Export }/>
            </Route>
        </Router>
    </Provider>
),document.getElementById('root'));
