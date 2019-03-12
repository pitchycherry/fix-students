import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';

export class ListDiscipline extends Component {
    state = {
        arr: null,
        isLoading: false,
    };
    loadList = () =>{
        fetch('http://nstu-tracker.thematrix.su/discipline',{
            method: "GET",
            headers:{"api-token": "JqHNSZ7YjoAFVqg43hPfDnvA"}
        }).then(function (response) {
            return response.json()
        }).then(data =>{
            this.setState({isLoading:false, arr: data.data});
        }).catch(function(error) {
            console.log('POST failed', error.message)
        })
    };
    componentDidMount() {
        this.setState({isLoading:true});
        this.loadList();
    }
    render() {
        const {arr, isLoading} = this.state;
        let DisciplineList;
        if (!!arr) {
            DisciplineList = arr.map(function (item) {
                return (
                    <li className="list-group-item" key={item.id}>
                        <div className="row">
                            <div className="col text-left name-group">{item.name}</div>
                            <div className="col text-right">
                                <button type="button" className="btn" data-toggle="modal"
                                        data-target="#editDisciplineModal">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button type="button" className="btn" data-toggle="modal"
                                        data-target="#deleteDisciplineModal">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                )
            })
        }else{
            DisciplineList =
            <li className="list-group-item" key="-1">
                <div className="row">
                    <div className="col text-center name-group">Записей нет!</div>
                </div>
            </li>
        }
        return (
            <Fragment>
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
                                    isLoading ?
                                        <li className="list-group-item" key="-1">
                                            <div className="row">
                                                <div className="col text-center name-group">Загружаю...</div>
                                            </div>
                                        </li>
                                        :
                                        DisciplineList
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}