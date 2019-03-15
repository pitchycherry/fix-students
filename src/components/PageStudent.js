import React, {Component, Fragment} from "react";
import {Header} from "./Header";
import {ListStudent} from "./ListStudent";

export class PageStudent extends Component {
    render() {
        localStorage.setItem('id', '');
        localStorage.setItem('idSub', '');
        return (
            <Fragment>
                <Header/>
                <ListStudent/>
            </Fragment>
        )
    }
}