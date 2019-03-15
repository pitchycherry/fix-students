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
        // fetch('http://nstu-tracker.thematrix.su/group',{
        //     method: "GET",
        //     headers:{"api-token": localStorage.getItem('token')}
        // }).then(function (response) {
        //     return response.json()
        // }).then(data =>{
        //     this.setState({isLoading:false, arrGroup: data.data});
        // }).catch(function(error) {
        //     console.log('GET findAllGroup failed /n', error.message)
        // });
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