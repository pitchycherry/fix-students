import React, {Component, Fragment} from 'react';
import {store} from "../index";
import {
    setCurrentProfessorFirstname,
    setCurrentProfessorId, setCurrentProfessorLogin,
    setCurrentProfessorMiddlename, setCurrentProfessorPassword
} from "../store/actions/actions";
import {BASE_PATH, GROUP_PATH, PROFESSOR_PATH} from "./App";
import $ from "jquery";

export class PageTeacherPopup extends Component {
    handleChangeSurname = event => {
        store.dispatch(setCurrentProfessorId(event.target.value));
    };
    handleChangeFirstname = event => {
        store.dispatch(setCurrentProfessorFirstname(event.target.value));
    };
    handleChangeMiddlename = event => {
        store.dispatch(setCurrentProfessorMiddlename(event.target.value));
    };
    handleChangeLogin = event => {
        store.dispatch(setCurrentProfessorLogin(event.target.value));
    };
    handleChangePassword = event => {
        store.dispatch(setCurrentProfessorPassword(event.target.value));
    };
    handleSubmitAddProfessor = event => {
        event.preventDefault();
        const current_professor = new FormData();
        current_professor.append('surname', store.getState().current_professor_surname);
        current_professor.append('firstname', store.getState().current_professor_firstname);
        current_professor.append('middlename', store.getState().current_professor_middlename);
        current_professor.append('login', store.getState().current_professor_login);
        current_professor.append('password', store.getState().current_professor_password);
        console.log(current_professor)
        fetch(`${BASE_PATH}${PROFESSOR_PATH}`, {
            method: "POST",
            headers: {"api-token": localStorage.getItem('token')},
            body: current_professor
        }).then(function (response) {
            return response.json()
        }).then(response => {
            $(function () {
                $('#addGroupModal').modal('toggle');
            });
            console.log(store.getState());
            //document.location.reload(true);
            console.log("Новый преподаватель добавлен", response);
        })
            .catch(() => {
                console.log("Новый преподаватель не добавлен");
            });
    };
    render() {
        return (
            <Fragment>
                {/*Попап для добавления преподавателя*/}
                <div className="modal fade" id="addGroupModal" tabIndex="-1" role="dialog"
                     aria-labelledby="addGroupModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="addGroup" onSubmit={this.handleSubmitAddProfessor}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="addGroupModalLabel">Добавление преподавателя</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="addProfessorSurname">Фамилия преподавателя</label>
                                        <input className="form-control" type="text" name="value"
                                               id="addProfessorSurname"
                                               placeholder="Введите фамилию преподавателя"
                                               onChange={this.handleChangeSurname}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorFirstname">Имя преподавателя</label>
                                        <input className="form-control" type="text" name="name"
                                               id="addProfessorFirstname"
                                               placeholder="Введите имя преподавателя"
                                               onChange={this.handleChangeFirstname}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorMiddlename">Отчество преподавателя</label>
                                        <input className="form-control" type="text" name="name"
                                               id="addProfessorMiddlename"
                                               placeholder="Введите отчество преподавателя"
                                               onChange={this.handleChangeMiddlename}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorLogin">Логин преподавателя</label>
                                        <input className="form-control" type="text" name="name" id="addProfessorLogin"
                                               placeholder="Введите логин преподавателя"
                                               onChange={this.handleChangeLogin}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorPassword">Пароль преподавателя</label>
                                        <input className="form-control" type="text" name="name"
                                               id="addProfessorPassword"
                                               placeholder="Введите пароль преподавателя"
                                               onChange={this.handleChangePassword}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-primary">Добавить</button>
                                    <button type="button" className="btn btn-outline-secondary"
                                            data-dismiss="modal">Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*Попап для удаления преподавателя*/}
                <div className="modal fade" id="deleteTeacherModal" tabIndex="-1" role="dialog"
                     aria-labelledby="deleteTeacherModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>Вы уверены, что хотите удалить преподавателя?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Удалить</button>
                                <button type="button" className="btn btn-outline-secondary"
                                        data-dismiss="modal">Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Попап для редактирования группы*/}
                <div className="modal fade" id="editTeacherModal" tabIndex="-1" role="dialog"
                     aria-labelledby="editTeacherModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="editTeacher">
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="editTeacherModalLabel">Редактирование
                                        преподавателя</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="editGroupName">Новое имя преподавателя ДОДЕЛАТЬ</label>
                                        <input className="form-control" type="text" name="value" id="editGroupName"
                                               placeholder="Введите название группы"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-primary">Добавить</button>
                                    <button type="button" className="btn btn-outline-secondary"
                                            data-dismiss="modal">Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

