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
            headers:{"api-token": "xpV3MjwKkWYPY2bhchWL40eu"}
        }).then(function (response) {
            return response.json()
        }).then(data =>{
            this.setState({isLoading:false, arr: data.data});
        }).catch(function(error) {
            console.log('GET findAll failed', error.message)
        });
    };
    componentDidMount() {
        this.setState({isLoading:true});
        this.loadList();
    }
    render() {
        const {arr, isLoading} = this.state;
        let DisciplineList;
        if (!!arr) {
            if (arr.length){
                DisciplineList = arr.map(function (item) {
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
                DisciplineList =
                    <li className="list-group-item" key="-1">
                        <div className="row">
                            <div className="col text-center name-group">Записей нет!</div>
                        </div>
                    </li>
            }
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
class DelButton extends Component{
    delItem = () => {
        document.cookie = "DelItemId="+this.props.item.id;
        document.cookie = "DelItemName="+this.props.item.name;
    };
    render(){
        return(
            <button onClick={this.delItem} type="button" className="btn" data-toggle="modal"
                    data-target="#deleteDisciplineModal" id={this.props.item.id +'d'} >
                <i className="fas fa-trash-alt"></i>
            </button>
        )
    }
}
class EditButton extends Component{
    EditItem = () => {
        document.cookie = "EditItemId="+this.props.item.id;
    };
    render(){
        return(
            <button onClick={this.EditItem} type="button" className="btn" data-toggle="modal"
                    data-target="#editDisciplineModal" id={this.props.item.id +'e'}>
                <i className="fas fa-pencil-alt"></i>
            </button>
        )
    }
}