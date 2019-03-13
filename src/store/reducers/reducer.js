const initialState = {
    list_group: [],
    user: "Nik"
};
export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOGIN":
            return {
                ...state, login: action.login
            };
        case "SET_PASSWORD":
            return {
                ...state, password: action.password
            };
        case "GET_LIST-GROUP":
            return {
                ...state, list_group: action.list_group.data.map(group => {
                    return group.name;
                })
            };
        case "SET_GROUP":
            return {
                ...state, current_group: action.current_group
            };
        default:
            return state;
    }
};