export const CreateRequest = (options, body) => {
    return fetch(options.path, {
        headers: options.headers,
        //"api-token": localStorage.getItem('token')
        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        method: options.method,
        body: body
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw response.status;
        }
    });
};

