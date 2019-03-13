import React, {Component, Fragment} from 'react';
import $ from 'jquery'
import {store} from "../index";
import {setGroup} from "../store/actions/actions";
import {CreateRequest} from "./CreateRequest";
import {BASE_PATH, GROUP_PATH} from "./App";

export class PageGroupPopup extends Component {
    handleChangeGroup = event => {
        store.dispatch(setGroup(event.target.value));
    };
    handleSubmit = event => {
        event.preventDefault();
        const current_group = new FormData();
        current_group.append('name', store.getState().current_group);

        CreateRequest({
            headers: {
                "api-token": localStorage.getItem('token'),
            },
            path: `${BASE_PATH}${GROUP_PATH}`,
            method: "POST"
        }, current_group).then(response => {
            $(function () {
                $('#addGroupModal').modal('toggle');
            });
            console.log("Новая группа добавлена", response);
        })
            .catch(() => {
                console.log("Новая группа не добавлена");
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
                            <form id="addGroup" onSubmit={this.handleSubmit}>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title" id="addGroupModalLabel">Добавление группы</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="addGroupCourse">Номер курса</label>
                                        <input className="form-control" type="text" name="value" id="addGroupCourse"
                                               placeholder="Введите номер курса"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addGroupName">Название группы</label>
                                        <input className="form-control" type="text" name="name" id="addGroupName"
                                               placeholder="Введите название группы" onChange={this.handleChangeGroup}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-primary">Добавить
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
                            <div className="modal-body">
                                <p>Вы уверены, что хотите удалить группу?</p>
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
                <div className="modal fade" id="editGroupModal" tabIndex="-1" role="dialog"
                     aria-labelledby="editGroupModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="editGroup">
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

