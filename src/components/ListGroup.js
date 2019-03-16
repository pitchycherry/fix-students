import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';
import {BASE_PATH, GROUP_PATH} from "./App";
import {store} from "../index";
import {getListGroup, setCurrentGroup} from "../store/actions/actions";
import {PageGroupPopup} from "./PageGroupPopup";

export class ListGroup extends Component {
    loadListGroup() {
        fetch(`${BASE_PATH}${GROUP_PATH}`, {
            method: "GET",
            headers: {"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            if(response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            store.dispatch(getListGroup(data));
            console.log("Список групп получен", data);
        }).catch(function (error) {
            console.log('Список групп не получен', error.message)
        });
    }

    handleSelectGroup = (event, id, name) => {
        event.preventDefault();
        store.dispatch(setCurrentGroup(id, name));
    };

    componentDidMount() {
        this.loadListGroup();
    }

    render() {
        /*Вычисления ниже ипользуются для определения последей цифры года для распределения групп по курсам*/
        const numYear = (new Date().getFullYear()).toString()[3] === "0" ? 10 : (new Date().getFullYear()).toString()[3];
        const currentNumYear = (new Date().getMonth()) >= Number(9) ? parseInt(numYear) : parseInt(numYear) - 1;

        return (
            <Fragment>
                <PageGroupPopup reloadListGroup={this.loadListGroup}/>
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
                                        {Object.values(store.getState().list_group).map(group => {
                                            if (Number(group.name.split("-")[1][0]) === currentNumYear) {
                                                return (
                                                    <li key={group.id} className="list-group-item">
                                                        <div className="row">
                                                            <div className="col text-left name-group">
                                                                {group.name}
                                                            </div>
                                                            <div className="col text-right">
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#editGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </button>
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#deleteGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
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
                                        {Object.values(store.getState().list_group).map(group => {
                                            if (Number(group.name.split("-")[1][0]) === currentNumYear - 1) {
                                                return (
                                                    <li key={group.id} className="list-group-item">
                                                        <div className="row">
                                                            <div className="col text-left name-group">
                                                                {group.name}
                                                            </div>
                                                            <div className="col text-right">
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#editGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </button>
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#deleteGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
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
                                        {Object.values(store.getState().list_group).map(group => {
                                            if (Number(group.name.split("-")[1][0]) === currentNumYear - 2) {
                                                return (
                                                    <li key={group.id} className="list-group-item">
                                                        <div className="row">
                                                            <div className="col text-left name-group">
                                                                {group.name}
                                                            </div>
                                                            <div className="col text-right">
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#editGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </button>
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#deleteGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingFour">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapseFour" aria-expanded="false"
                                        aria-controls="collapseFour">
                                    4 курс
                                </button>
                            </div>
                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour"
                                 data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {Object.values(store.getState().list_group).map(group => {
                                            if (Number(group.name.split("-")[1][0]) === currentNumYear - 3) {
                                                return (
                                                    <li key={group.id} className="list-group-item">
                                                        <div className="row">
                                                            <div className="col text-left name-group">
                                                                {group.name}
                                                            </div>
                                                            <div className="col text-right">
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#editGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </button>
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#deleteGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingFive">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapseFive" aria-expanded="false"
                                        aria-controls="collapseFive">
                                    5 курс
                                </button>
                            </div>
                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive"
                                 data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {Object.values(store.getState().list_group).map(group => {
                                            if (Number(group.name.split("-")[1][0]) === currentNumYear - 4) {
                                                return (
                                                    <li key={group.id} className="list-group-item">
                                                        <div className="row">
                                                            <div className="col text-left name-group">
                                                                {group.name}
                                                            </div>
                                                            <div className="col text-right">
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#editGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </button>
                                                                <button type="button" className="btn"
                                                                        data-toggle="modal"
                                                                        data-target="#deleteGroupModal"
                                                                        onClick={(event) => this.handleSelectGroup(event, group.id, group.name)}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
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