import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';
import {store} from "../index";
import {getListGroup, getListStudent, setIsLoadinglistStudent, setIsLoadinglistGroup} from "../store/actions/actions";
import {BASE_PATH, STUDENT_PATH, GROUP_PATH} from "./App";
import $ from "jquery";

export class ListStudent extends Component {
    loadListStudent =()=>{
        fetch(`${BASE_PATH}${STUDENT_PATH}`,{
            method: "GET",
            headers:{"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            return response.json()
        }).then(data =>{
            store.dispatch(getListStudent(data));
            store.dispatch(setIsLoadinglistStudent(false));
            console.log("Список студентов получен \n", data);
        }).catch(function(error) {
            console.log('Список студентов не получен \n', error.message);
        });
    };
    componentDidMount() {
        this.loadListStudent();
    }
    render() {
        let itemStudent = store.getState().list_student;
        if (!!itemStudent) {
            if (itemStudent.length){
                itemStudent = itemStudent.map(function (item) {
                    return (
                        <li className="list-group-item" key={item.id}>
                            <div className="row">
                                <div className="col text-left name-group">
                                    {item.surname} {item.firstname} {item.middlename}
                                 </div>
                                <div className="col text-left name-group">
                                    <p className="text-primary d-inline">login:</p>
                                    <p className="d-inline"> {item.login} </p>
                                    <p className="text-primary d-inline">device_uid:</p>
                                    <p className="d-inline"> {item.device_uid} </p>
                                </div>
                                <div className="col text-right">
                                    <EditButton item = {item}/>
                                    <DelButton item = {item}/>
                                </div>
                            </div>
                        </li>
                    )
                })
            } else{
                itemStudent =
                    <div className="row list-group-item" key="-1">
                        <div className="col text-center">Студентов нет!</div>
                    </div>
            }
        }
        return (
            <Fragment>
                <AddPopup reloadListStudent = {this.loadListStudent}/>
                <EditPopup reloadListStudent = {this.loadListStudent}/>
                <DeletePopup reloadListStudent = {this.loadListStudent}/>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="control-teacher col-2">
                            <div className="col text-center">
                                <p className="classic-title">Группы</p>
                            </div>
                            <ButtonGroupVertical/>
                        </div>
                        <div className="list-teacher__body col-6">
                            <div className="col text-center">
                                <p className="classic-title">Список студентов</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    (store.getState().isLoading_listStudent) ?
                                        <li className="list-group-item" key="-1">
                                            <div className="row">
                                                <div className="col text-center name-group">Загружаю...</div>
                                            </div>
                                        </li>
                                        :
                                        itemStudent
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
class ButtonGroupVertical extends Component{
    loadListGroup =()=>{
        fetch(`${BASE_PATH}${GROUP_PATH}`, {
            method: "GET",
            headers: {"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            return response.json()
        }).then(data => {
            store.dispatch(getListGroup(data));
            store.dispatch(setIsLoadinglistGroup(false));
            console.log("Список групп получен \n", data);
        }).catch(function (error) {
            console.log('Список групп не получен  \n', error.message)
        });
    };
    reloadListGroup =()=>{
        fetch(`${BASE_PATH}${GROUP_PATH}`, {
            method: "GET",
            headers: {"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            return response.json()
        }).then(data => {
            store.dispatch(getListGroup(data));
            console.log("Список групп получен \n", data);
            if ((store.getState().list_group).length)
                localStorage.setItem('id', (store.getState().list_group)[0].id);
        }).catch(function (error) {
            console.log('Список групп не получен  \n', error.message)
        });
    };
    componentDidMount() {
        this.loadListGroup();
    }
    render(){
        let itemGroup = store.getState().list_group;
        if (!!itemGroup) {
            if (itemGroup.length){
                itemGroup = itemGroup.map(function (item) {
                    return (
                        <button type="button" className="btn btn-outline-primary btn-block maxHRadioButton" key={item.id}>{item.name}</button>
                    )
                })
            } else{
                itemGroup =
                    <div className="row list-group-item" key="-1">
                        <div className="col text-center">Групп нет!</div>
                    </div>
            }
        }
        return(
            <div className="btn-group-vertical col-sm">
                <button type="button"
                        className="btn btn-outline-primary btn-block maxHRadioButton"
                        data-toggle="modal"
                        data-target="#addStudentModal" onClick={this.reloadListGroup}>Создать студента</button>
                {
                    (store.getState().isLoading_listGroup) ?
                        <div className="row list-group-item" key="-1">
                            <div className="col text-center">Загружаю...</div>
                        </div>
                        :
                        itemGroup
                }
            </div>
        )
    }
}
class EditButton extends Component{
    setDelId = event => {
        localStorage.setItem('id', this.props.item.id);
    };
    render(){
        return(
            <button onClick={this.setDelId} type="button" className="btn" data-toggle="modal"
                    data-target="#editStudentModal">
                <i className="fas fa-pencil-alt"></i>
            </button>
        )
    }
}
class DelButton extends Component{
    setDelId = event => {
        localStorage.setItem('id', this.props.item.id);
    };
    render(){
        return(
            <button onClick={this.setDelId} type="button" className="btn" data-toggle="modal"
                    data-target="#deleteStudentModal">
                <i className="fas fa-trash-alt"></i>
            </button>
        )
    }
}

class AddPopup extends Component{
    addStudent = event => {
        event.preventDefault();
        const newStudent = new FormData();
        newStudent.append('surname', document.getElementById("addStudentSurname").value);
        newStudent.append('firstname', document.getElementById("addStudentFirstname").value);
        newStudent.append('middlename', document.getElementById("addStudentMiddlename").value);
        newStudent.append('login', document.getElementById("addStudentLogin").value);
        newStudent.append('plainPassword', document.getElementById("addStudentPassword").value);
        newStudent.append('deviceUid', document.getElementById("addStudentDeviceUid").value);
        newStudent.append('groupId', localStorage.getItem('id'));
        fetch(`${BASE_PATH}${STUDENT_PATH}`, {
            method: "POST",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
            body: newStudent
        }).then(function (response) {
            return response.json()
        }).then(data => {
            $('#addStudentModal').modal('toggle');
            localStorage.setItem('id', '');
            console.log("Cтудент добавлен \n", data);
            this.props.reloadListStudent();
        }).catch(function (error) {
            console.log('DELETE discipline failed /n', error.message)
        });
        document.getElementById("addStudentSurname").value = '';
        document.getElementById("addStudentFirstname").value = '';
        document.getElementById("addStudentMiddlename").value = '';
        document.getElementById("addStudentLogin").value = '';
        document.getElementById("addStudentPassword").value = '';
        document.getElementById("addStudentDeviceUid").value = '';
    };
    selectGroupStudent = event => {
        let tmpArr = store.getState().list_group;
        for (var i = 0; i < tmpArr.length; ++i) {
            if (tmpArr[i].name == event.currentTarget.value){
                localStorage.setItem('id', tmpArr[i].id);
                break;
            }
        }
    };
    render(){
        let itemGroup = store.getState().list_group;
        if (!!itemGroup) {
            if (itemGroup.length){
                itemGroup = itemGroup.map(function (item) {
                    return (
                        <option key={item.id}>{item.name}</option>
                    )
                })
            }
        }
        return(
            <div className="modal fade" id="addStudentModal" tabIndex="-1" role="dialog"
                 aria-labelledby="addStudentModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="addStudent" onSubmit={this.addStudent}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addStudentModalLabel">Добавление
                                    студента</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input className="form-control" type="text" name="value"
                                           id="addStudentSurname"
                                           placeholder="Введите фамилию студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="addStudentFirstname"
                                           placeholder="Введите имя студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text"
                                           name="name"
                                           id="addStudentMiddlename"
                                           placeholder="Введите отчество студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="addStudentLogin"
                                           placeholder="Введите логин студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="addStudentPassword"
                                           placeholder="Введите пароль студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="addStudentDeviceUid"
                                           placeholder="Введите deviceUid студента"/>
                                </div>
                                {
                                    (itemGroup.length) ?
                                        <select className="form-control selectpicker btn-outline-primary " onClick={this.selectGroupStudent}>
                                            {itemGroup}
                                        </select>
                                        :
                                        <label htmlFor="addGroupName">Название группы</label>
                                }
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
        )
    }
}
class DeletePopup extends Component{
    deleteStudent = event => {
        event.preventDefault();
        let id = localStorage.getItem('id');
        fetch(`${BASE_PATH}${STUDENT_PATH}` + '/' + id, {
            method: "DELETE",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
        }).then(function (response) {
            return response.json()
        }).then(data => {
            $('#deleteStudentModal').modal('toggle');
            localStorage.setItem('id', '');
            console.log("Cтудент удален \n", data);
            this.props.reloadListStudent();
        }).catch(function (error) {
            console.log('DELETE discipline failed /n', error.message)
        });
    };
    render(){
        return(
            <div className="modal fade" id="deleteStudentModal" tabIndex="-1" role="dialog"
                 aria-labelledby="deleteStudentModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="deleteStudent" onSubmit={this.deleteStudent}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="deleteStudentModalLabel">Вы уверены, что хотите
                                    удалить студента?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary" >Удалить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
class EditPopup extends Component{
    deleteStudent = event => {
        event.preventDefault();
        let id = localStorage.getItem('id');
        fetch(`${BASE_PATH}${STUDENT_PATH}` + '/' + id, {
            method: "DELETE",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
        }).then(function (response) {
            return response.json()
        }).then(data => {
            $('#deleteStudentModal').modal('toggle');
            localStorage.setItem('id', '');
            console.log("Cтудент удален \n", data);
            this.props.reloadListStudent();
        }).catch(function (error) {
            console.log('DELETE discipline failed /n', error.message)
        });
    };
    render(){
        return(
            <div className="modal fade" id="deleteStudentModal" tabIndex="-1" role="dialog"
                 aria-labelledby="deleteStudentModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="deleteStudent" onSubmit={this.deleteStudent}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="deleteStudentModalLabel">Вы уверены, что хотите
                                    удалить студента?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary" >Удалить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

