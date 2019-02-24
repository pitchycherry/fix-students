import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';

export class ListGroup extends Component {
    render() {
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="title-group">
                        <div className="row">
                            <div className="col text-left">
                                <p className="classic-title">Список групп</p>
                            </div>
                            <div className="col text-right">
                                <button type="button" className="btn btn-outline-primary" data-toggle="modal"
                                        data-target="#addGroupModal">Добавить группу
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapseOne" aria-expanded="false"
                                        aria-controls="collapseOne">
                                    1 курс
                                </button>
                            </div>

                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                                 data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col text-left name-group">
                                                    АВТ-810
                                                </div>
                                                <div className="col text-right">
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#editGroupModal">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#deleteGroupModal">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col text-left name-group">
                                                    АВТ-810
                                                </div>
                                                <div className="col text-right">
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#editGroupModal">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#deleteGroupModal">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col text-left name-group">
                                                    АВТ-810
                                                </div>
                                                <div className="col text-right">
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#editGroupModal">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#deleteGroupModal">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingTwo">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapseTwo" aria-expanded="false"
                                        aria-controls="collapseTwo">
                                    2 курс
                                </button>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                 data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col text-left name-group">
                                                    АВТ-810
                                                </div>
                                                <div className="col text-right">
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#editGroupModal">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#deleteGroupModal">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingThree">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                    3 курс
                                </button>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col text-left name-group">
                                                    АВТ-810
                                                </div>
                                                <div className="col text-right">
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#editGroupModal">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn" data-toggle="modal"
                                                            data-target="#deleteGroupModal">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}