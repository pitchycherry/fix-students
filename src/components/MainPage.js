import React, {Component, Fragment} from 'react'
import "../css/index.css"
import {BASE_PATH, LOGIN_PATH} from "./App";
import {store} from "../index";
import {setLogin, setPassword} from "../store/actions/actions";
import $ from "jquery";

export class MainPage extends Component {
    handleChangeLogin = event => {
        store.dispatch(setLogin(event.target.value));
    };
    handleChangePassword = event => {
        store.dispatch(setPassword(event.target.value));
    };

    componentWillMount() {
        if (localStorage.getItem('token') !== "" || typeof (localStorage.getItem('token')) !== 'undefined') {
            //this.props.history.push('/groups');
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const userData = new FormData();
        userData.append('login', store.getState().login);
        userData.append('password', store.getState().password);

        fetch(`${BASE_PATH}${LOGIN_PATH}`, {
            method: "POST",
            headers: {"api-token": localStorage.getItem('token')},
            body: userData
        }).then(function (response) {
            if (response.status === 400) {
                $('[data-toggle="popover"]').popover();
            }
            return response.json()
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('login', response.data.user.login);
            console.log("Пользователь аутентифицирован", response);
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
                                <button type="submit" className="kok btn btn-outline-primary" data-toggle='popover'
                                        title="Ошибка входа"
                                        data-content="Неверный логин или пароль">Войти
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}