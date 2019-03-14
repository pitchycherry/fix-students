const initialState = {
    list_group: [],
    list_professor: [],
    current_group: {id: 0, name: ""},

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
                    return group;
                })
            };
        case "GET_LIST-PROFESSOR":
            return {
                ...state, list_professor: action.list_professor.data.map(professor => {
                    return professor;
                })
            };
        case "SET_CURRENT_GROUP":
            return {
                ...state, current_group: action.current_group
            };
        case "SET_CURRENT_PROFESSOR":
            return {
                ...state, current_professor: action.current_professor
            };
        case "SET_CURRENT_PROFESSOR_ID":
            return {
                ...state, current_professor_id: action.current_professor_id
            };
        case "SET_CURRENT_PROFESSOR_SURNAME":
            return {
                ...state, current_professor_surname: action.current_professor_surname
            };
        case "SET_CURRENT_PROFESSOR_FIRSTNAME":
            return {
                ...state, current_professor_firstname: action.current_professor_firstname
            };
        case "SET_CURRENT_PROFESSOR_MIDDLENAME":
            return {
                ...state, current_professor_middlename: action.current_professor_middlename
            };
        case "SET_CURRENT_PROFESSOR_LOGIN":
            return {
                ...state, current_professor_login: action.current_professor_login
            };
        case "SET_CURRENT_PROFESSOR_PASSWORD":
            return {
                ...state, current_professor_password: action.current_professor_password
            };
        default:
            return state;
    }
};