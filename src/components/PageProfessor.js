import React, {Component, Fragment} from "react";
import {Header} from "./Header";
import {ListProfessor} from "./ListProfessor";

export class PageProfessor extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <ListProfessor/>
            </Fragment>
        )
    }
}