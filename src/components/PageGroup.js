import React, {Component, Fragment} from "react";
import {ListGroup} from "./ListGroup";
import {Header} from "./Header";
import {PageGroupPopup} from "./PageGroupPopup";

export class PageGroup extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <PageGroupPopup/>
                <ListGroup/>
            </Fragment>
        )
    }
}