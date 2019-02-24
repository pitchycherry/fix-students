import React, {Fragment} from 'react';

export const PageTeacherPopup = () => {
    return (
        <Fragment>
            {/*Попап для добавления группы*/}
            <div className="modal fade" id="addGroupModal" tabIndex="-1" role="dialog"
                 aria-labelledby="addGroupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="addGroup">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addGroupModalLabel">Добавление группы</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="addGroupCourse">Номер курса</label>
                                    <input className="form-control" type="text" name="value" id="addGroupCourse"
                                           placeholder="Введите номер курса"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addGroupName">Название группы</label>
                                    <input className="form-control" type="text" name="name" id="addGroupName"
                                           placeholder="Введите название группы"/>
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
            {/*Попап для удаления преподавателя*/}
            <div className="modal fade" id="deleteTeacherModal" tabIndex="-1" role="dialog"
                 aria-labelledby="deleteTeacherModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Вы уверены, что хотите удалить преподавателя?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Удалить</button>
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Попап для редактирования группы*/}
            <div className="modal fade" id="editTeacherModal" tabIndex="-1" role="dialog"
                 aria-labelledby="editTeacherModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="editTeacher">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="editTeacherModalLabel">Редактирование преподавателя</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="editGroupName">Новое имя преподавателя ДОДЕЛАТЬ</label>
                                    <input className="form-control" type="text" name="value" id="editGroupName"
                                           placeholder="Введите название группы"/>
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

