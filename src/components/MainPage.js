import React, {Component, Fragment} from 'react'
import "../css/index.css"
import {BASE_PATH, GROUP_PATH, LOGIN_PATH} from "./App";
import {CreateRequest} from "./CreateRequest";
import {store} from "../index";
import {getAdminInfo, setLogin, setPassword} from "../store/actions/actions";

export class MainPage extends Component {
    handleChangeLogin = event => {
        store.dispatch(setLogin(event.target.value));
    };
    handleChangePassword = event => {
        store.dispatch(setPassword(event.target.value));
    };
    handleSubmit = event => {
        event.preventDefault();
        const userData = new FormData();
        userData.append('login', store.getState().login);
        userData.append('password', store.getState().password);

        CreateRequest({
            path: `${BASE_PATH}${LOGIN_PATH}`,
            method: "POST"
        }, userData).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('login', response.data.user.login);
            console.log("Пользователь аутентифицирован", response);
            store.dispatch(getAdminInfo());
            // переход на страницу групп
            this.props.history.push('/groups');
        })
            .catch(() => {
                console.log("Пользователь не аутентифицирован");
            });
    };

    render() {
        return (
            <Fragment>
                <div className="mainPage">
                    <p className="mainPage__title text-primary text-center">FixStudents</p>
                    <p className="mainPage__subtitle text-secondary text-center">Личный кабинет администратора</p>
                    <div className="mainPage__form col-9 col-lg-3">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="login" className="mt-3">Логин</label>
                                <input type="text" id="login" className="form-control" placeholder="Логин"
                                       onChange={this.handleChangeLogin}/>
                                <label htmlFor="password" className="mt-3">Пароль</label>
                                <input type="password" id="password" className="form-control" placeholder="Пароль"
                                       onChange={this.handleChangePassword}/>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-primary">Войти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}