import React, {Component, Fragment} from 'react';

export const BASE_PATH = 'http://nstu-tracker.thematrix.su'
export const LOGIN_PATH = '/auth/admin'

const App = ({children}) => {
    return(
        <Fragment>
            {children}
        </Fragment>
    )
}

export default App;
