import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';
import {store} from "../index";
import {BASE_PATH, DISCIPLINE_PATH} from "./App";
import {getListDiscipline, setIsLoadinglistDiscipline} from "../store/actions/actions";
import $ from "jquery";

export class ListDiscipline extends Component {
    loadListDiscipline =()=>{
        fetch(`${BASE_PATH}${DISCIPLINE_PATH}`,{
            method: "GET",
            headers:{"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            return response.json()
        }).then(data =>{
            store.dispatch(getListDiscipline(data));
            store.dispatch(setIsLoadinglistDiscipline(false));
            console.log("Список дисциплин получен \n", data);
        }).catch(function(error) {
            console.log('Список дисциплин не получен \n', error.message);
        });
    };
    componentDidMount() {
        this.loadListDiscipline();
    }
    render() {
        let itemDiscipline = store.getState().list_discipline;
        if (!!itemDiscipline) {
            if (itemDiscipline.length){
                itemDiscipline = itemDiscipline.map(function (item) {
                    return (
                        <li className="list-group-item" key={item.id}>
                            <div className="row">
                                <div className="col text-left name-group">{item.name}</div>
                                <div className="col text-right">
                                    <EditButton item = {item}/>
                                    <DelButton item = {item}/>
                                </div>
                            </div>
                        </li>
                    )
                })
            } else{
                itemDiscipline =
                    <li className="list-group-item" key="-1">
                        <div className="row">
                            <div className="col text-center name-group">Записей нет!</div>
                        </div>
                    </li>
            }
        }
        return (
            <Fragment>
                <AddPopup reloadListDiscipline = {this.loadListDiscipline}/>
                <EditPopup reloadListDiscipline = {this.loadListDiscipline}/>
                <DeletePopup reloadListDiscipline = {this.loadListDiscipline}/>
                <div className="container-fluid ">
                    <div className="row justify-content-center">
                        <div className="list-teacher__body col-6 ">
                            <div className="col text-center">
                                <button type="button" className="fixedbutton col-3 btn btn-outline-primary btn-block" data-toggle="modal"
                                        data-target="#addDisciplineModal">Добавить дисциплину
                                </button>
                                <p className="classic-title">Список дисциплин</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    (store.getState().isLoading_listDiscipline) ?
                                        <li className="list-group-item" key="-1">
                                            <div className="row">
                                                <div className="col text-center name-group">Загружаю...</div>
                                            </div>
                                        </li>
                                        :
                                        itemDiscipline
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
class EditButton extends Component{
    setEditId = () => {
        localStorage.setItem('id', this.props.item.id);
    };
    render(){
        return(
            <button onClick={this.setEditId} type="button" className="btn" data-toggle="modal"
                    data-target="#editDisciplineModal" id={this.props.item.id +'e'}>
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
                    data-target="#deleteDisciplineModal" id={this.props.item.id +'d'} >
                <i className="fas fa-trash-alt"></i>
            </button>
        )
    }
}

class AddPopup extends Component{
    addDiscipline = event => {
        event.preventDefault();
        const newDiscipline = new FormData();
        newDiscipline.append('name', document.getElementById("addDisciplineInput").value);
        fetch(`${BASE_PATH}${DISCIPLINE_PATH}`, {
            method: "POST",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
            body: newDiscipline
        }).then(function (response) {
            return response.json()
        }).then(data => {
            $('#addDisciplineModal').modal('toggle');
            console.log("Дисциплина добавлена \n", data);
            this.props.reloadListDiscipline();
        }).catch(function (error) {
            console.log('Дисциплина не добавлена \n', error.message)
        });
        localStorage.setItem('id', '');
        document.getElementById("addDisciplineInput").value = '';
    };
    close = () =>{
        localStorage.setItem('id', '');
        document.getElementById("addDisciplineInput").value = '';
    };
    render(){
        return(
            <div className="modal fade" id="addDisciplineModal" tabIndex="-1" role="dialog"
                 aria-labelledby="addDisciplineModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="addDiscipline" onSubmit={this.addDiscipline}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addDisciplineModalLabel">Добавление дисциплины</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input className="form-control" type="text" name="value" id="addDisciplineInput"
                                           placeholder="Введите название дисциплины"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary">Добавить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal" onClick={this.close}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
class EditPopup extends Component{
    editDiscipline = event => {
        event.preventDefault();
        const editDiscipline = new FormData();
        editDiscipline.append('name', document.getElementById("editDisciplineNameLabel").value);
        let idDiscipline = ("/" + localStorage.getItem('id'));
        fetch(`${BASE_PATH}${DISCIPLINE_PATH}` + idDiscipline, {
            method: "PUT",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
            body: new URLSearchParams(editDiscipline)
        }).then(function (response) {
            return response.json()
        }).then(data => {
            $('#editDisciplineModal').modal('toggle');
            console.log("Дисциплина изменена \n", data);
            this.props.reloadListDiscipline();
        }).catch(function (error) {
            console.log('Дисциплина not edit /n', error.message)
        });
        localStorage.setItem('id', '');
        document.getElementById("editDisciplineNameLabel").value = '';
    };
    render(){
        return(
            <div className="modal fade" id="editDisciplineModal" tabIndex="-1" role="dialog"
                 aria-labelledby="editDisciplineModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="editDiscipline" onSubmit={this.editDiscipline}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="editDisciplineModalLabel">Редактирование дисциплины</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input className="form-control" type="text" name="value"
                                           id="editDisciplineNameLabel"
                                           placeholder="Введите новое название дисциплины"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary" >Применить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
class DeletePopup extends Component{
    deleteDiscipline = event => {
        event.preventDefault();
        let idDiscipline = ("/" + localStorage.getItem('id'));
        fetch(`${BASE_PATH}${DISCIPLINE_PATH}` + idDiscipline, {
            method: "DELETE",
            headers: {
                "api-token": localStorage.getItem('token'),
            },
        }).then(function (response) {
            return response.json()
        }).then(data => {
            $('#deleteDisciplineModal').modal('toggle');
            console.log("Дисциплина удалена \n", data);
            this.props.reloadListDiscipline();
        }).catch(function (error) {
            console.log('Дисциплина not delete \n', error.message)
        });
        localStorage.setItem('id', '');
    };
    render(){
        return(
            <div className="modal fade" id="deleteDisciplineModal" tabIndex="-1" role="dialog"
                 aria-labelledby="deleteDisciplineModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="addDiscipline" onSubmit={this.deleteDiscipline}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="deleteDisciplineModalLabel">Вы уверены, что хотите
                                    удалить дисицплину?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary">Удалить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
