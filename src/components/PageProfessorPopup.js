import React, {Component, Fragment} from 'react';
import {store} from "../index";
import {
    setCurrentDisciplineId,
    setCurrentProfessorFirstname, setCurrentProfessorId, setCurrentProfessorLogin,
    setCurrentProfessorMiddlename, setCurrentProfessorPassword, setCurrentProfessorSurname
} from "../store/actions/actions";
import {BASE_PATH, DISCIPLINE_PATH, PROFESSOR_PATH} from "./App";
import $ from "jquery";

export class PageProfessorPopup extends Component {
    handleChangeSurname = event => {
        store.dispatch(setCurrentProfessorSurname(event.target.value));
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
        current_professor.append('login', store.getState().current_professor_login);
        current_professor.append('firstname', store.getState().current_professor_firstname);
        current_professor.append('surname', store.getState().current_professor_surname);
        current_professor.append('middlename', store.getState().current_professor_middlename);
        current_professor.append('plainPassword', store.getState().current_professor_password);
        fetch(`${BASE_PATH}${PROFESSOR_PATH}`, {
            method: "POST",
            headers: {"api-token": localStorage.getItem('token')},
            body: current_professor
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#addProfessorModal').modal('toggle');
            });
            console.log(store.getState());
            this.props.reloadListProfessor();
            console.log("Новый преподаватель добавлен", response);
        })
            .catch(() => {
                $('[data-toggle="popover"]').popover();
                console.log("Новый преподаватель не добавлен");
            });
    };
    handleSubmitDeleteProfessor = event => {
        event.preventDefault();

        fetch(`${BASE_PATH}${PROFESSOR_PATH}/${store.getState().current_professor_id}`, {
            method: "DELETE",
            headers: {"api-token": localStorage.getItem('token')},
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#deleteProfessorModal').modal('toggle');
            });
            this.props.reloadListProfessor();
            console.log("Преподаватель удален", response);
        })
            .catch(() => {
                console.log("Преподаватель не удален");
            });
    };
    handleSubmitEditProfessor = event => {
        event.preventDefault();
        const editProfessor = new FormData();
        editProfessor.append('login', store.getState().current_professor_login);
        editProfessor.append('firstname', store.getState().current_professor_firstname);
        editProfessor.append('surname', store.getState().current_professor_surname);
        editProfessor.append('middlename', store.getState().current_professor_middlename);
        editProfessor.append('plainPassword', store.getState().current_professor_password);
        fetch(`${BASE_PATH}${PROFESSOR_PATH}/${store.getState().current_professor_id}`, {
            method: "PUT",
            headers: {"api-token": localStorage.getItem('token')},
            body: new URLSearchParams(editProfessor)
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#editProfessorModal').modal('toggle');
            });
            this.props.reloadListProfessor();
            console.log("Преподаватель изменен", response);
        })
            .catch(() => {
                $('[data-toggle="popover"]').popover();
                console.log("Преподаватель не изменен");
            });
    };
    handleChangeSelectProfessor = event => {
        event.preventDefault();
        store.dispatch(setCurrentProfessorId(event.target.options[event.target.selectedIndex].value));
    };
    handleChangeSelectDiscipline = event => {
        event.preventDefault();
        store.dispatch(setCurrentDisciplineId(event.target.options[event.target.selectedIndex].value));
    };
    handleSubmitAddProfessorInDiscipline = event => {
        event.preventDefault();
        fetch(`${BASE_PATH}${PROFESSOR_PATH}/${store.getState().current_professor_id}${DISCIPLINE_PATH}/${store.getState().current_discipline_id}/attach`, {
            method: "PUT",
            headers: {"api-token": localStorage.getItem('token')},
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#addProfessorInDisciplineModal').modal('toggle');
            });
            this.props.reloadListProfessor();
            console.log("Преподаватель прикреплен к дисциплине", response);
        })
            .catch(() => {
                $('[data-toggle="popover"]').popover();
                console.log("Преподаватель не прикреплен к дисциплине");
            });
    };
    handleSubmitDeleteProfessorFromDiscipline = event => {
        event.preventDefault();
        fetch(`${BASE_PATH}${PROFESSOR_PATH}/${store.getState().current_professor_id}${DISCIPLINE_PATH}/${store.getState().current_discipline_id}/detach`, {
            method: "PUT",
            headers: {"api-token": localStorage.getItem('token')},
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#deleteProfessorFromDisciplineModal').modal('toggle');
            });
            this.props.reloadListProfessor();
            console.log("Преподаватель прикреплен к дисциплине", response);
        })
            .catch(() => {
                $('[data-toggle="popover"]').popover();
                console.log("Преподаватель не прикреплен к дисциплине");
            });
    };

    render() {
        return (
            <Fragment>
                {/*Попап для добавления преподавателя*/}
                <div className="modal fade" id="addProfessorModal" tabIndex="-1" role="dialog"
                     aria-labelledby="addProfessorModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="addProfessor" onSubmit={this.handleSubmitAddProfessor}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="addProfessorModalLabel">Добавление
                                        преподавателя</h5>
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
                                               onChange={this.handleChangeSurname} required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorFirstname">Имя преподавателя</label>
                                        <input className="form-control" type="text" name="name"
                                               id="addProfessorFirstname"
                                               placeholder="Введите имя преподавателя"
                                               onChange={this.handleChangeFirstname} required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorMiddlename">Отчество преподавателя</label>
                                        <input className="form-control" type="text" name="name"
                                               id="addProfessorMiddlename"
                                               placeholder="Введите отчество преподавателя"
                                               onChange={this.handleChangeMiddlename} required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorLogin">Логин преподавателя</label>
                                        <input className="form-control" type="text" name="name" id="addProfessorLogin"
                                               placeholder="Введите логин преподавателя"
                                               onChange={this.handleChangeLogin} required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addProfessorPassword">Пароль преподавателя</label>
                                        <input className="form-control" type="text" name="name"
                                               id="addProfessorPassword"
                                               placeholder="Введите пароль преподавателя"
                                               onChange={this.handleChangePassword} required="required"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-primary">Добавить</button>
                                    <button type="button" className="btn btn-outline-secondary"
                                            data-dismiss="modal" data-toggle='popover'
                                            title="Такой преподаватель уже существует">Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*Попап для удаления преподавателя*/}
                <div className="modal fade" id="deleteProfessorModal" tabIndex="-1" role="dialog"
                     aria-labelledby="deleteProfessorModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="deleteProfessor" onSubmit={this.handleSubmitDeleteProfessor}>
                                <div className="modal-body">
                                    <p>Вы уверены, что хотите удалить преподавателя?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Удалить</button>
                                    <button type="button" className="btn btn-outline-secondary"
                                            data-dismiss="modal">Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*Попап для редактирования группы*/}
                <div className="modal fade" id="editProfessorModal" tabIndex="-1" role="dialog"
                     aria-labelledby="editProfessorModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="editProfessor" onSubmit={this.handleSubmitEditProfessor}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="addProfessorModalLabel">Изменение
                                        преподавателя</h5>
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
                                    <button type="submit" className="btn btn-outline-primary">Изменить</button>
                                    <button type="button" className="btn btn-outline-secondary"
                                            data-dismiss="modal" data-toggle='popover'
                                            title="Такой преподаватель уже существует">Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*Попап для добавления преподавателя в дисциплину*/}
                <div className="modal fade" id="addProfessorInDisciplineModal" tabIndex="-1" role="dialog"
                     aria-labelledby="addProfessorInDisciplineModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="addProfessorInDiscipline" onSubmit={this.handleSubmitAddProfessorInDiscipline}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="addProfessorInDisciplineModalLabel">Добавление
                                        преподавателя в дисциплину</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="addProfessor">Преподаватель</label>
                                        <select className="form-control" id="addProfessor"
                                                onChange={this.handleChangeSelectProfessor}>
                                            <option disabled selected>Выберите преподавателя</option>
                                            {Object.values(store.getState().list_professor).map(professor =>
                                                <option key={professor.id} value={professor.id}>
                                                    {professor.surname} {professor.firstname} {professor.middlename}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addDiscipline">Дисциплина</label>
                                        <select className="form-control" id="addDiscipline"
                                                onChange={this.handleChangeSelectDiscipline}>
                                            <option disabled selected>Выберите дисциплину</option>
                                            {Object.values(store.getState().list_discipline).map(discipline =>
                                                <option key={discipline.id} value={discipline.id}>
                                                    {discipline.name}
                                                </option>
                                            )}
                                        </select>
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
                {/*Попап для удаления преподавателя из дисциплины*/}
                <div className="modal fade" id="deleteProfessorFromDisciplineModal" tabIndex="-1" role="dialog"
                     aria-labelledby="deleteProfessorFromDisciplineModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="deleteProfessorFromDisciplineModal"
                                  onSubmit={this.handleSubmitDeleteProfessorFromDiscipline}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="deleteProfessorFromDisciplineModal">Удаление
                                        преподавателя из дисциплины</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="deleteProfessor">Преподаватель</label>
                                        <select className="form-control" id="deleteProfessor"
                                                onChange={this.handleChangeSelectProfessor}>
                                            <option disabled selected>Выберите преподавателя</option>
                                            {Object.values(store.getState().list_professor).map(professor =>
                                                <option key={professor.id} value={professor.id}>
                                                    {professor.surname} {professor.firstname} {professor.middlename}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="deleteDiscipline">Дисциплина</label>
                                        <select className="form-control" id="deleteDiscipline"
                                                onChange={this.handleChangeSelectDiscipline}>
                                            <option disabled selected>Выберите дисциплину</option>
                                            {Object.values(store.getState().list_discipline).map(discipline =>
                                                <option key={discipline.id} value={discipline.id}>
                                                    {discipline.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-primary">Удалить</button>
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

