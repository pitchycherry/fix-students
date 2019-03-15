export const setLogin = (login) => ({
    type: "SET_LOGIN",
    login: login
});
export const setPassword = (password) => ({
    type: "SET_PASSWORD",
    password: password
});
export const getListGroup = (list_group) => ({
    type: "GET_LIST-GROUP",
    list_group: list_group
});
export const getListProfessor = (list_professor) => ({
    type: "GET_LIST-PROFESSOR",
    list_professor: list_professor
});
export const getListDiscipline = (list_discipline) => ({
    type: "GET_LIST_DISCIPLINE",
    list_discipline: list_discipline
});
export const setCurrentGroup = (id, name) => ({
    type: "SET_CURRENT_GROUP",
    current_group: {
        id: id,
        name: name
    }
});
export const setCurrentProfessorId = (id) => ({
    type: "SET_CURRENT_PROFESSOR_ID",
    current_professor_id: id
});
export const setCurrentProfessorSurname = (surname) => ({
    type: "SET_CURRENT_PROFESSOR_SURNAME",
    current_professor_surname: surname
});
export const setCurrentProfessorFirstname = (firstname) => ({
    type: "SET_CURRENT_PROFESSOR_FIRSTNAME",
    current_professor_firstname: firstname
});
export const setCurrentProfessorMiddlename = (middlename) => ({
    type: "SET_CURRENT_PROFESSOR_MIDDLENAME",
    current_professor_middlename: middlename
});
export const setCurrentProfessorLogin = (login) => ({
    type: "SET_CURRENT_PROFESSOR_LOGIN",
    current_professor_login: login
});
export const setCurrentProfessorPassword = (password) => ({
    type: "SET_CURRENT_PROFESSOR_PASSWORD",
    current_professor_password: password
});

//cтуденты
export const getListStudent = (list_student) => ({
    type: "GET_LIST-STUDENT",
    list_student: list_student
});
export const setIsLoadinglistStudent = (state) => ({
    type: "SET_ISLOADING_LISTSTUDENT",
    isLoading_listStudent: state
});
export const setIsLoadinglistGroup = (state) => ({
    type: "SET_ISLOADING_LISTSGROUP",
    isLoading_listGroup: state
});