import * as studentModel from '../models/studentModel.js';
import ValidationError from '../utils/ValidationError.js';

export const fetchAllStudent = async() =>{
    const student = await studentModel.fetchAllStudent();
    return student;
}

const doesStudentExist = async (student) =>{
    let existing;
    if(Object.hasOwn(student, "id")){
        existing = await studentModel.findStudentById(student.id)
    }else{
        existing = await studentModel.findStudentByNameAndSrcodeAndProgram(student);
    }
    
    if(existing.length > 0){
        return true;
    }

    return false;
}

export const createStudent = async(student) =>{
    if(!student.name || !student.srcode || !student.program){
        throw new ValidationError(404, 'Name and srcode and program is required!');
    }

    const existing = await doesStudentExist(student);

    const srcodeFormat = /^\d{2}-\d{5}$/;

    if(!srcodeFormat.test(student.srcode)){
        throw new ValidationError(400, "sr-code format must be xx-xxxxx");
    }

    if(existing){
        throw new ValidationError(409, 'Student already exist!');
    }

    const studentId = await studentModel.insert(student);
    return studentId;
}

export const updateStudent = async(student) => {
    if(!student.name || !student.srcode || !student.program){
        throw new ValidationError(404, 'Name and srcode and program is required!');
    }

    const srcodeFormat = /^\d{2}-\d{5}$/;

    if(!srcodeFormat.test(student.srcode)){
        throw new ValidationError(400, "sr-code format must be xx-xxxxx");
    }
    
    const existing = await doesStudentExist(student);

    if(!existing){
        throw new ValidationError(404, 'Student does not exist!');
    }

    const updatedStudent = await studentModel.update(student);
    return updatedStudent;
}

export const deleteStudent = async(id) => {
    const student = {id};
    const existing = await doesStudentExist(student);

    if(!existing){
        throw new ValidationError(404, 'Student does not exist!');
    }

    const deleteStudent = await studentModel.remove(id);
    return deleteStudent;
}