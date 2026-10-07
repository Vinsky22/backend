import * as studentService from '../services/studentService.js';

export const fetchAllStudent = async (req, res) =>{
    const student = await studentService.fetchAllStudent();
    res.status(200).json(student);
};