import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {MainPage} from "./components/MainPage";
import {PageGroup} from "./components/PageGroup";
import {PageTeacher} from "./components/PageTeacher";

ReactDOM.render((
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route path='/groups' component={PageGroup} />
                <Route path='/teachers' component={PageTeacher} />
            </Switch>
        </App>
    </BrowserRouter>
), document.getElementById('root'));
