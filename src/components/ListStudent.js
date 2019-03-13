import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';

export class ListStudent extends Component {
    render() {
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="control-teacher col-2">
                            <div className="col text-center">
                                <p className="classic-title">Группы</p>
                            </div>
                            <div className="btn-group-vertical col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block maxHRadioButton">fdsdfs</button>
                                <button type="button" className="btn btn-outline-primary btn-block maxHRadioButton">fdsdfs</button>
                                <button type="button" className="btn btn-outline-primary btn-block maxHRadioButton">fdsdfs</button>
                            </div>
                        </div>

                        <div className="list-teacher__body col-6">
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
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}