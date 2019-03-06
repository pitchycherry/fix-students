export const getAdminInfo = () => ({
    type: "GET_INFO",
    info: localStorage.getItem('login')
});