import React, {Fragment} from 'react';

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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="addGroupCourse">Название дисциплины</label>
                                    <input className="form-control" type="text" name="value" id="addGroupCourse"
                                           placeholder="Введите название дисциплины"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary">Добавить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*Попап для удаления дисциплины*/}
            <div className="modal fade" id="deleteDisciplineModal" tabIndex="-1" role="dialog"
                 aria-labelledby="deleteDisciplineModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Вы уверены, что хотите удалить дисицплину?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Удалить</button>
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                        </div>
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
                                    <label htmlFor="editDisciplineName">Название дисциплины</label>
                                    <input className="form-control" type="text" name="value" id="editDisciplineName"
                                           placeholder="Введите название дисциплины"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-primary">Добавить</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

