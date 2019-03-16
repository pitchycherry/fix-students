import React, {Component, Fragment} from 'react';
import $ from 'jquery'
import {store} from "../index";
import {setCurrentGroup} from "../store/actions/actions";
import {BASE_PATH, GROUP_PATH} from "./App";

export class PageGroupPopup extends Component {
    handleChangeGroup = event => {
        store.dispatch(setCurrentGroup(store.getState().current_group.id, event.target.value));
    };

    handleSubmitAddGroup = event => {
        event.preventDefault();
        const current_group = new FormData();
        current_group.append('name', store.getState().current_group.name);
        fetch(`${BASE_PATH}${GROUP_PATH}`, {
            method: "POST",
            headers: {"api-token": localStorage.getItem('token')},
            body: current_group
        }).then(function (response) {

            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#addGroupModal').modal('toggle');
            });
            this.props.reloadListGroup();
            console.log("Новая группа добавлена", response);
        })
            .catch(() => {
                $('[data-toggle="popover"]').popover();
                console.log("Новая группа не добавлена");
            });
    };
    handleSubmitDeleteGroup = event => {
        event.preventDefault();

        fetch(`${BASE_PATH}${GROUP_PATH}/${store.getState().current_group.id}`, {
            method: "DELETE",
            headers: {"api-token": localStorage.getItem('token')},
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#deleteGroupModal').modal('toggle');
            });
            this.props.reloadListGroup();
            console.log("Группа удалена", response);
        })
            .catch(() => {
                console.log("Группа не удалена");
            });
    };
    handleSubmitEditGroup = event => {
        event.preventDefault();
        const editGroup = new FormData();
        editGroup.append('name', store.getState().current_group.name);

        fetch(`${BASE_PATH}${GROUP_PATH}/${store.getState().current_group.id}`, {
            method: "PUT",
            headers: {"api-token": localStorage.getItem('token')},
            body: new URLSearchParams(editGroup)
        }).then(function (response) {
            if (response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(response => {
            $(function () {
                $('#editGroupModal').modal('toggle');
            });
            this.props.reloadListGroup();
            console.log("Группа изменена", response);
        })
            .catch(() => {
                $('[data-toggle="popover"]').popover();
                console.log("Группа не изменена");
            });
    };

    render() {
        return (
            <Fragment>
                {/*Попап для добавления группы*/}
                <div className="modal fade" id="addGroupModal" tabIndex="-1" role="dialog"
                     aria-labelledby="addGroupModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="addGroup" onSubmit={this.handleSubmitAddGroup}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="addGroupModalLabel">Добавление группы</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="addGroupName">Название группы</label>
                                        <input className="form-control" type="text" name="name" id="addGroupName"
                                               placeholder="Введите название группы" pattern="[A-Za-zА-Яа-яЁё]+-[0-9]+"
                                               onChange={this.handleChangeGroup} required="required"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-primary" data-toggle='popover'
                                            title="Такая группа уже существует">Добавить
                                    </button>
                                    {console.log(store.getState())}
                                    <button type="button" className="btn btn-outline-secondary"
                                            data-dismiss="modal">Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*Попап для удаления группы*/}
                <div className="modal fade" id="deleteGroupModal" tabIndex="-1" role="dialog"
                     aria-labelledby="deleteGroupModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="deleteGroup" onSubmit={this.handleSubmitDeleteGroup}>
                                <div className="modal-body">
                                    <p>Вы уверены, что хотите удалить группу?</p>
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
                <div className="modal fade" id="editGroupModal" tabIndex="-1" role="dialog"
                     aria-labelledby="editGroupModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="editGroup" onSubmit={this.handleSubmitEditGroup}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="editGroupModalLabel">Редактирование группы</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="editGroupName">Новое название группы</label>
                                        <input className="form-control" type="text" name="value" id="editGroupName"
                                               placeholder="Введите название группы" pattern="[A-Za-zА-Яа-яЁё]+-[0-9]+"
                                               onChange={this.handleChangeGroup} required="required"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-primary" data-toggle='popover'
                                            title="Такая группа уже существует">Изменить
                                    </button>
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

