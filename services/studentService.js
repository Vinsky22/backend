import * as studentModel from '../models/studentModel.js';

export const fetchAllStudent = async() =>{
    const student = await studentModel.fetchAllStudent();
    return student;
}

export const createStudent = async(student) =>{
    const studentId = await studentModel.insert(student);
    return studentId;
}

export const updateStudent = async(student) => {
    const updatedStudent = await studentModel.update(student);
    return updatedStudent;
}

export const deleteStudent = async(id) => {
    const deleteStudent = await studentModel.remove(id);
    return deleteStudent;
}