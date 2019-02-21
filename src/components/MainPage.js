import React, {Component, Fragment} from 'react'
import "../css/index.css"

export class MainPage extends Component {
    render() {
        return (
            <Fragment>
                <div className="mainPage text-center">
                    <p className="mainPage__title text-primary">FixSudents</p>
                    <p className="mainPage__subtitle text-secondary">Личный кабинет администратора</p>
                    <div className="mainPage__form col-9 col-lg-3 text-center">
                        <form>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Пароль"/>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}