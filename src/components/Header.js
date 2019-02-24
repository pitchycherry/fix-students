import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom'

export const Header = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light main-header">
                <NavLink exact to='/'><a className="navbar-brand">FixStudents</a></NavLink>
                <div className="navbar-nav">
                    <NavLink to='/groups'><a className="nav-item nav-link">Группы</a></NavLink>
                    <NavLink to='/disciplines'><a className="nav-item nav-link">Дисциплины</a></NavLink>
                    <NavLink to='/teachers'><a className="nav-item nav-link">Преподаватели</a></NavLink>
                    <NavLink to='/students'><a className="nav-item nav-link">Студенты</a></NavLink>
                </div>
            </nav>
        </Fragment>
    )
}

