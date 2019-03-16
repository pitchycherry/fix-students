import React, {Component, Fragment} from "react";
import {ListGroup} from "./ListGroup";
import {Header} from "./Header";

export class PageGroup extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <ListGroup/>
            </Fragment>
        )
    }
}