import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';

const Disciplines = [
    {
        id: 1, // добавили id
        title: "Пбработка сигналов"
    },
    {
        id: 2, // добавили id
        title: "БЖД"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 2, // добавили id
        title: "БЖД"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    },
    {
        id: 3, // добавили id
        title: "Право"
    }

];
export class ListDiscipline extends Component {
    render() {
        const DisciplineArr = Disciplines.map(function (item) {
            return(
            <li className="list-group-item" key={item.id}>
                <div className="row">
                    <div className="col text-left name-group">{item.title}</div>
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
        });
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
                                {DisciplineArr}
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}