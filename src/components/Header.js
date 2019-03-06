import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom'

export const Header = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light main-header">
                <NavLink exact to='/' className="navbar-brand text-primary">FixStudents</NavLink>
                <div className="navbar-nav">
                    <NavLink to='/groups' className="nav-item nav-link">Группы</NavLink>
                    <NavLink to='/disciplines' className="nav-item nav-link">Дисциплины</NavLink>
                    <NavLink to='/teachers' className="nav-item nav-link">Преподаватели</NavLink>
                    <NavLink to='/students' className="nav-item nav-link">Студенты</NavLink>
                </div>
                <a className="col text-right nav-item nav-link">Администратор: {localStorage.getItem('login')}</a>
            </nav>
        </Fragment>
    )
};