import React from 'react'
import {BASE_PATH, ALL_PETITION_PATH} from "./App"

export const CreateRequest = (options, body) => {
    return fetch(options.path, {
        headers: {
            //"api-token": "WK8fG9V4TQzdHnsoZB5PUfsp"
            //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: "POST",
        body: body
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw response.status;
        }
    });
};

