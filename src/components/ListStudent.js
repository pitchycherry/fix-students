import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';

export class ListStudent extends Component {
    state = {
        arrStudent: null,
        isLoading: false,
    };
    LoadListStudent =()=>{
        console.log("LoadListGroup...");
        fetch('http://nstu-tracker.thematrix.su/student',{
            method: "GET",
            headers:{"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            return response.json()
        }).then(data =>{
            this.setState({isLoading:false, arrStudent: data.data});
        }).catch(function(error) {
            console.log('GET findAllStudent failed /n', error.message)
        });
    };
    componentDidMount() {
        this.setState({isLoading:true});
        this.LoadListStudent();
    }
    render() {
        const {arrStudent, isLoading} = this.state;
        let ItemStudent;
        if (!!arrStudent) {
            if (arrStudent.length){
                ItemStudent = arrStudent.map(function (item) {
                    return (
                        <li className="list-group-item" key={item.id}>
                            <div className="row">
                                <div className="col text-left name-group">{item.name}</div>
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
                    )
                })
            } else{
                ItemStudent =
                    <div className="row list-group-item" key="-1">
                        <div className="col text-center">Студентов нет!</div>
                    </div>
            }
        }
        return (
            <Fragment>
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
                                    isLoading ?
                                        <li className="list-group-item" key="-1">
                                            <div className="row">
                                                <div className="col text-center name-group">Загружаю...</div>
                                            </div>
                                        </li>
                                        :
                                        ItemStudent
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
    state = {
        arrGroup: null,
        isLoading: false,
    };
    LoadListGroup =()=>{
        console.log("LoadListGroup...");
        fetch('http://nstu-tracker.thematrix.su/group',{
            method: "GET",
            headers:{"api-token": localStorage.getItem('token')}
        }).then(function (response) {
            return response.json()
        }).then(data =>{
            this.setState({isLoading:false, arrGroup: data.data});
        }).catch(function(error) {
            console.log('GET findAllGroup failed /n', error.message)
        });
    };
    componentDidMount() {
        this.setState({isLoading:true});
        this.LoadListGroup();
    }
    render(){
        const {arrGroup, isLoading} = this.state;
        let GroupList;
        if (!!arrGroup) {
            if (arrGroup.length){
                GroupList = arrGroup.map(function (item) {
                    return (
                        <button type="button" className="btn btn-outline-primary btn-block maxHRadioButton" key={item.id}>{item.name}</button>
                    )
                })
            } else{
                GroupList =
                    <div className="row list-group-item" key="-1">
                        <div className="col text-center">Групп нет!</div>
                    </div>
            }
        }
        return(
            <div className="btn-group-vertical col-sm">
                {
                    isLoading ?
                        <div className="row list-group-item" key="-1">
                            <div className="col text-center">Загружаю...</div>
                        </div>
                        :
                        GroupList
                }
            </div>
        )
    }
}