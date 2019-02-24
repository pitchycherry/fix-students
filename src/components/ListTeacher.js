import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';

export class ListTeacher extends Component {
    render() {
        return (
            <Fragment>
                <div className="container-fluid list-teacher">
                    <div className="row">
                        <div className="control-teacher col-3">
                            <div className="col text-center">
                                <p className="classic-title">Управление</p>
                            </div>
                            <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal"
                                    data-target="#addGroupModal">Добавить преподавателя
                            </button>
                            <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal"
                                    data-target="#addGroupModal">Добавить преподавателя в дисциплину
                            </button>
                        </div>

                        <div className="list-teacher__body col-9">
                            <div className="col text-center">
                                <p className="classic-title">Список преподавателей</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col text-left name-group">Романов Е.Л.</div>
                                        <div className="col text-right">
                                            <button type="button" className="btn" data-toggle="modal"
                                                    data-target="#editTeacherModal">
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button type="button" className="btn" data-toggle="modal"
                                                    data-target="#deleteTeacherModal">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col text-left name-group">Коршикова Л.А.</div>
                                        <div className="col text-right">
                                            <button type="button" className="btn" data-toggle="modal"
                                                    data-target="#editTeacherModal">
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button type="button" className="btn" data-toggle="modal"
                                                    data-target="#deleteTeacherModal">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col text-left name-group">Токарев В.Г.</div>
                                        <div className="col text-right">
                                            <button type="button" className="btn">
                                                <i className="fas fa-pencil-alt" data-toggle="modal"
                                                   data-target="#editTeacherModal"></i>
                                            </button>
                                            <button type="button" className="btn" data-toggle="modal"
                                                    data-target="#deleteTeacherModal">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}