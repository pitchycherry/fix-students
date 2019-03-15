import React, {Component, Fragment} from "react";
import {Header} from "./Header";
import {store} from "../index";
import {PageDisciplinePopup} from "./PageDisciplinePopup";
import {ListDiscipline} from "./ListDiscipline";

export class PageDiscipline extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <PageDisciplinePopup/>
                <ListDiscipline store={store}/>
            </Fragment>
        )
    }
}
