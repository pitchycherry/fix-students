export default (state, action) => {
    switch (action.type) {
        case "SET_LOGIN":
            return {
                ...state, login: action.login
            };
        case "SET_PASSWORD":
            return {
                ...state, password: action.password
            };
        case "GET_INFO":
            return {
                ...state, info: action.info
            };
        case "GET_LIST-GROUP":
            return {
                ...state, list_group: action.list_group
            };
        default:
            return state;
    }
};