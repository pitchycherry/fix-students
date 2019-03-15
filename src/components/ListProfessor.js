import React, {Component} from "react";
import 'font-awesome/css/font-awesome.min.css';
import {BASE_PATH, PROFESSOR_PATH} from "./App";
import {store} from "../index";
import {
    getListProfessor,
    setCurrentProfessorFirstname,
    setCurrentProfessorId,
    setCurrentProfessorLogin,
    setCurrentProfessorMiddlename,
    setCurrentProfessorPassword,
    setCurrentProfessorSurname
} from "../store/actions/actions";

export class ListProfessor extends Component {
    handleSelectProfessor = (event, id, firstname, surname, middlename, login, password) => {
        event.preventDefault();
        store.dispatch(setCurrentProfessorId(id));
        store.dispatch(setCurrentProfessorFirstname(firstname));
        store.dispatch(setCurrentProfessorSurname(surname));
        store.dispatch(setCurrentProfessorMiddlename(middlename));
        store.dispatch(setCurrentProfessorLogin(login));
        store.dispatch(setCurrentProfessorPassword(password));
    };

    componentDidMount() {
        fetch(`${BASE_PATH}${PROFESSOR_PATH}`, {
            method: "GET",
            headers: {"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            return response.json()
        }).then(data => {
            store.dispatch(getListProfessor(data));
            console.log("Список преподавателей получен", data);
        }).catch(function (error) {
            console.log('Список преподавателей не получен', error.message)
        });
    }

    render() {
        return (
            <div className="container-fluid list-teacher">
                <div className="row">
                    <div className="control-teacher col-3">
                        <div className="col text-center">
                            <p className="classic-title">Управление</p>
                        </div>
                        <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal"
                                data-target="#addProfessorModal">Добавить преподавателя
                        </button>
                        <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal"
                                data-target="#addProfessorInDisciplineModal">Добавить преподавателя в дисциплину
                        </button>
                    </div>

                    <div className="list-teacher__body col-9">
                        <div className="col text-center">
                            <p className="classic-title">Список преподавателей</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            {Object.values(store.getState().list_professor).map(professor =>
                                <li key={professor.id} className="list-group-item">
                                    <div className="row">
                                        <div
                                            className="col text-left name-group">{professor.surname} {professor.firstname} {professor.middlename}</div>
                                        <div className="col text-right">
                                            <button type="button" className="btn" data-toggle="modal"
                                                    data-target="#editProfessorModal"
                                                    onClick={(event) => this.handleSelectProfessor(event, professor.id, professor.firstname, professor.surname, professor.middlename, professor.login, professor.password)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button type="button" className="btn" data-toggle="modal"
                                                    data-target="#deleteProfessorModal"
                                                    onClick={(event) => this.handleSelectProfessor(event, professor.id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}