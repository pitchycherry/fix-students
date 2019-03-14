import React, {Component, Fragment} from "react";
import 'font-awesome/css/font-awesome.min.css';

export class ListStudent extends Component {
    render() {
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
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col text-left name-group">Пиздюк 1</div>
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
    LoadGroup =()=>{
        console.log("LoadGroup...");
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
        this.LoadGroup();
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