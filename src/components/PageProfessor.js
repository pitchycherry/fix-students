import React, {Component, Fragment} from "react";
import {Header} from "./Header";
import {PageProfessorPopup} from "./PageProfessorPopup";
import {ListProfessor} from "./ListProfessor";

export class PageProfessor extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <PageProfessorPopup/>
                <ListProfessor/>
            </Fragment>
        )
    }
}