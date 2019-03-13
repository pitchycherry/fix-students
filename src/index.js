import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import App from './components/App';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {MainPage} from "./components/MainPage";
import {PageGroup} from "./components/PageGroup";
import {PageTeacher} from "./components/PageTeacher";
import {PageDiscipline} from "./components/PageDiscipline";
import {PageStudent} from "./components/PageStudent";

import reducer from './store/reducers/reducer';

export const store = createStore(reducer);
// сделали render функцией
const render = function () {
    ReactDOM.render((
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route path='/groups' component={PageGroup}/>
                    <Route path='/teachers' component={PageTeacher}/>
                    <Route path='/disciplines' component={PageDiscipline} />
                    <Route path='/students' component={PageStudent} />
                </Switch>
            </App>
        </BrowserRouter>
    ), document.getElementById('root'));
};
render();
// подписались на обновление store
store.subscribe(render);
