import React, {Fragment} from 'react';
//БРАТЬ ТОКЕН ИЗ store
export const PageDisciplinePopup = () => {
    return (
        <Fragment>
            {/*Попап для добавления дисциплины*/}
            <div className="modal fade" id="addDisciplineModal" tabIndex="-1" role="dialog"
                 aria-labelledby="addDisciplineModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="addDiscipline">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addDisciplineModalLabel">Добавление дисциплины</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="addGroupCourse">Название дисциплины</label>
                                    <input className="form-control" type="text" name="value" id="addDisciplineCourse"
                                           placeholder="Введите название дисциплины"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary" onClick={AddDiscipline}>Добавить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*Попап для удаления дисциплины*/}
            <div className="modal fade" id="deleteDisciplineModal" tabIndex="-1" role="dialog"
                 aria-labelledby="deleteDisciplineModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="addDiscipline">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="deleteDisciplineModalLabel">Вы уверены, что хотите удалить дисицплину?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary" onClick={DelDiscipline}>Удалить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*Попап для редактирования дисциплины*/}
            <div className="modal fade" id="editDisciplineModal" tabIndex="-1" role="dialog"
                 aria-labelledby="editDisciplineModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="editDiscipline">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="editDisciplineModalLabel">Редактирование дисциплины</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="editDisciplineName">Изменение дисциплины</label>
                                    <input className="form-control" type="text" name="value" id="editDisciplineNameLabel"
                                           placeholder="Введите новое название дисциплины"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary" onClick={EditDiscipline}>Применить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal" >Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
function AddDiscipline() {
    const newDiscipline = new FormData();
    newDiscipline.append('name', document.getElementById("addDisciplineCourse").value);
    fetch('http://nstu-tracker.thematrix.su/discipline',{
        method: "POST",
        headers:{
            "api-token": localStorage.getItem('token'),
        },
        body:newDiscipline
    }).then(function (response) {
        return response.json()
    }).catch(function(error) {
        console.log('POST add failed', error.message)
    });
}
function DelDiscipline() {
    let DelItemId = localStorage.getItem('DelItemId');
    let DelItemName = localStorage.getItem('DelItemName');
    const delDiscipline = new FormData();
    delDiscipline.append('name', DelItemName);
    fetch('http://nstu-tracker.thematrix.su/discipline/'+DelItemId,{
        method: "DELETE",
        headers:{
            "api-token": localStorage.getItem('token'),
        },
        body:delDiscipline
    }).then(function (response) {
        return response.json()
    }).catch(function(error) {
        console.log('DELETE failed', error.message)
    });
}
function EditDiscipline() {
    let EditItemId = localStorage.getItem('EditItemId');
    fetch('http://nstu-tracker.thematrix.su/discipline/'+EditItemId,{
        method: "PUT",
        headers:{
            "api-token": localStorage.getItem('token'),
        },
        body: new URLSearchParams({name: document.getElementById("editDisciplineNameLabel").value})
    }).then(function (response) {
        return response;
    }).catch(function(error) {
        console.log('EDIT failed', error);
    });
    document.cookie = 'EditItemId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}