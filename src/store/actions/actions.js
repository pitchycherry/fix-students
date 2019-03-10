export const setLogin = (login) => ({
    type: "SET_LOGIN",
    login: login
});
export const setPassword = (password) => ({
    type: "SET_PASSWORD",
    password: password
});
export const getAdminInfo = () => ({
    type: "GET_INFO",
    info: localStorage.getItem('login')
});
export const getListGroup = (list_group) => ({
    type: "GET_LIST-GROUP",
    list_group: list_group
});