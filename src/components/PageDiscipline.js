import React, {Component, Fragment} from "react";
import {Header} from "./Header";
import {ListDiscipline} from "./ListDiscipline";

export class PageDiscipline extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <ListDiscipline/>
            </Fragment>
        )
    }
}
