import React, {Component, Fragment} from 'react'
import "../css/index.css"
import {BASE_PATH, LOGIN_PATH} from "./App";
import {CreateRequest} from "./CreateRequest";

export class MainPage extends Component {
    state = {
        name: '',
        password: '',
    };
    handleChangeName = event => {
        this.setState({name: event.target.value});
    };
    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };
    handleSubmit = event => {
        event.preventDefault();
        const userData = new FormData();
        userData.append('login', this.state.name);
        userData.append('password', this.state.password);

        CreateRequest({
            path: `${BASE_PATH}${LOGIN_PATH}`,
            method: "POST"
        }, userData).then(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', response.id);
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
                                       onChange={this.handleChangeName}/>
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