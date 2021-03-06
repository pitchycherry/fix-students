import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';
import {store} from "../index";
import {getListGroup, getListStudent, setIsLoadinglistStudent, setIsLoadinglistGroup, setSelectGroup} from "../store/actions/actions";
import {BASE_PATH, STUDENT_PATH, GROUP_PATH} from "./App";
import $ from "jquery";

export class ListStudent extends Component {
    loadListStudent =()=>{
        fetch(`${BASE_PATH}${STUDENT_PATH}`,{
            method: "GET",
            headers:{"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            if(response.status === 401) {
                document.location.href = "/";
            }
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
                let setGroup = store.getState().select_group;
                // eslint-disable-next-line
                if (setGroup == -1){
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
                }else{
                    let filterItemStudent = [];
                    itemStudent.forEach(function(item) {
                        // eslint-disable-next-line
                        if (item.group_id == setGroup)
                            filterItemStudent.push(item);
                    });
                    // eslint-disable-next-line
                    itemStudent = filterItemStudent.map(function (item) {
                        // eslint-disable-next-line
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
                }
            }
            // eslint-disable-next-line
            if (itemStudent.length == 0)
                itemStudent =
                    <div className="row list-group-item" key="-1">
                        <div className="col text-center">Тут пусто...</div>
                    </div>
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
                            <ButtonGroupVertical reloadListStudent = {this.loadListStudent}/>
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
            if(response.status === 401) {
                document.location.href = "/";
            }
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
            if(response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            store.dispatch(getListGroup(data));
            console.log("Список групп получен \n", data);
            if (data.data.length) localStorage.setItem('id', data.data[0].id);
        }).catch(function (error) {
            console.log('Список групп не получен  \n', error.message)
        });
    };
    componentDidMount() {
        this.loadListGroup();
    };
    render(){
        let itemGroup = store.getState().list_group;
        if (!!itemGroup) {
            if (itemGroup.length){
                itemGroup = itemGroup.map((item, i) => {
                    return (
                        <GroupButton item = {item} setFilterStudent={this.props.reloadListStudent} key ={i}/>
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
class GroupButton extends Component{
    setGroup = () =>{
        store.dispatch(setSelectGroup(this.props.item.id));
        this.props.setFilterStudent()
    };
    render(){
        return(
            <button onClick={this.setGroup} type="button" className="btn btn-outline-primary btn-block maxHRadioButton">{this.props.item.name}</button>
        )
    }
}

class EditButton extends Component{
    setEditId = () => {
        localStorage.setItem('idSub', this.props.item.id);
        localStorage.setItem('id', (store.getState().list_group)[0].id);
    };
    render(){
        return(
            <button onClick={this.setEditId} type="button" className="btn" data-toggle="modal"
                    data-target="#editStudentModal">
                <i className="fas fa-pencil-alt"></i>
            </button>
        )
    }
}
class DelButton extends Component{
    setDelId = () => {
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
        newStudent.append('device_uid', document.getElementById("addStudentDeviceUid").value);
        newStudent.append('group_id', localStorage.getItem('id'));
        fetch(`${BASE_PATH}${STUDENT_PATH}`, {
            method: "POST",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
            body: newStudent
        }).then(function (response) {
            if(response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            $('#addStudentModal').modal('toggle');
            console.log("Cтудент добавлен \n", data);
            this.props.reloadListStudent();
        }).catch(function (error) {
            console.log('Cтудент не добавлен /n', error.message)
        });
        document.getElementById("addStudentSurname").value = '';
        document.getElementById("addStudentFirstname").value = '';
        document.getElementById("addStudentMiddlename").value = '';
        document.getElementById("addStudentLogin").value = '';
        document.getElementById("addStudentPassword").value = '';
        document.getElementById("addStudentDeviceUid").value = '';
        localStorage.setItem('id', '');
        localStorage.setItem('idSub', '');
    };
    selectGroupStudent = event => {
        let tmpArr = store.getState().list_group;
        for (let i = 0; i < tmpArr.length; ++i) {
            // eslint-disable-next-line
            if (tmpArr[i].name == event.currentTarget.value){
                localStorage.setItem('id', tmpArr[i].id);
                break;
            }
        }
    };
    close = () =>{
        document.getElementById("addStudentSurname").value = '';
        document.getElementById("addStudentFirstname").value = '';
        document.getElementById("addStudentMiddlename").value = '';
        document.getElementById("addStudentLogin").value = '';
        document.getElementById("addStudentPassword").value = '';
        document.getElementById("addStudentDeviceUid").value = '';
        localStorage.setItem('id', '');
        localStorage.setItem('idSub', '');
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
                                        <select className="form-control" onClick={this.selectGroupStudent}>
                                            {itemGroup}
                                        </select>
                                        :
                                        <label htmlFor="addGroupNull">Тут пусто!</label>
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary">Добавить</button>
                                <button type="button" className="btn btn-outline-secondary"
                                        data-dismiss="modal" onClick={this.close}>Отмена
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
class EditPopup extends Component{
    editStudent = event => {
        event.preventDefault();
        const editStudent = new FormData();
        editStudent.append('surname', document.getElementById("editStudentSurname").value);
        editStudent.append('firstname', document.getElementById("editStudentFirstname").value);
        editStudent.append('middlename', document.getElementById("editStudentMiddlename").value);
        editStudent.append('login', document.getElementById("editStudentLogin").value);
        editStudent.append('plainPassword', document.getElementById("editStudentPassword").value);
        editStudent.append('device_uid', document.getElementById("editStudentDeviceUid").value);
        editStudent.append('group_id', localStorage.getItem('id'));
        let idStudent = ("/" + localStorage.getItem('idSub'));
        fetch(`${BASE_PATH}${STUDENT_PATH}` + idStudent, {
            method: "PUT",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
            body: new URLSearchParams(editStudent)
        }).then(function (response) {
            if(response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            $('#editStudentModal').modal('toggle');
            localStorage.setItem('id', '');
            localStorage.setItem('idSub', '');
            console.log("Cтудент изменён \n", data);
            this.props.reloadListStudent();
        }).catch(function (error) {
            console.log('Cтудент not edit /n', error.message)
        });
        document.getElementById("editStudentSurname").value = '';
        document.getElementById("editStudentFirstname").value = '';
        document.getElementById("editStudentMiddlename").value = '';
        document.getElementById("editStudentLogin").value = '';
        document.getElementById("editStudentPassword").value = '';
        document.getElementById("editStudentDeviceUid").value = '';
        localStorage.setItem('id', '');
        localStorage.setItem('idSub', '');
    };
    selectGroupStudent = event => {
        let tmpArr = store.getState().list_group;
        if (tmpArr.length)
            for (let i = 0; i < tmpArr.length; ++i) {
                // eslint-disable-next-line
                if (tmpArr[i].name == event.currentTarget.value){
                    localStorage.setItem('id', tmpArr[i].id);
                    break;
                }
            }
    };
    close = () =>{
        document.getElementById("editStudentSurname").value = '';
        document.getElementById("editStudentFirstname").value = '';
        document.getElementById("editStudentMiddlename").value = '';
        document.getElementById("editStudentLogin").value = '';
        document.getElementById("editStudentPassword").value = '';
        document.getElementById("editStudentDeviceUid").value = '';
        localStorage.setItem('id', '');
        localStorage.setItem('idSub', '');
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
            <div className="modal fade" id="editStudentModal" tabIndex="-1" role="dialog"
                 aria-labelledby="editStudentModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="editStudent" onSubmit={this.editStudent}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="editStudentModalLabel">Изменение
                                    студента</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input className="form-control" type="text" name="value"
                                           id="editStudentSurname"
                                           placeholder="Введите фамилию студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="editStudentFirstname"
                                           placeholder="Введите имя студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text"
                                           name="name"
                                           id="editStudentMiddlename"
                                           placeholder="Введите отчество студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="editStudentLogin"
                                           placeholder="Введите логин студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="editStudentPassword"
                                           placeholder="Введите пароль студента"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="name"
                                           id="editStudentDeviceUid"
                                           placeholder="Введите deviceUid студента"/>
                                </div>
                                {
                                    (itemGroup.length) ?
                                        <select className="form-control" onClick={this.selectGroupStudent}>
                                            {itemGroup}
                                        </select>
                                        :
                                        <label htmlFor="editStudentNull">Тут пусто!</label>
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary">Подтвердить</button>
                                <button type="button" className="btn btn-outline-secondary"
                                        data-dismiss="modal" onClick={this.close}>Отмена
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
        let id = ("/" + localStorage.getItem('id'));
        fetch(`${BASE_PATH}${STUDENT_PATH}` + id, {
            method: "DELETE",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
        }).then(function (response) {
            if(response.status === 401) {
                document.location.href = "/";
            }
            return response.json()
        }).then(data => {
            $('#deleteStudentModal').modal('toggle');
            localStorage.setItem('id', '');
            localStorage.setItem('idSub', '');
            console.log("Cтудент удален \n", data);
            this.props.reloadListStudent();
        }).catch(function (error) {
            console.log('Cтудент not delete \n', error.message)
        });
        localStorage.setItem('id', '');
        localStorage.setItem('idSub', '');
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
