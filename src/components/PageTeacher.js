import React, {Component, Fragment} from "react";
import {Header} from "./Header";
import {PageTeacherPopup} from "./PageTeacherPopup";
import {ListTeacher} from "./ListTeacher";

export class PageTeacher extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <PageTeacherPopup/>
                <ListTeacher/>
            </Fragment>
        )
    }
}