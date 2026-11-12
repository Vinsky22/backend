import pool from '../config/db.js';


export const fetchAllStudent = async () => {
    const [rows] = await pool.query("SELECT * FROM student");
    return rows;
}

export const findStudentByNameAndSrcodeAndProgram = async(student) =>{
    const [rows] = await pool.query("SELECT * FROM student WHERE name=? AND srcode=? AND program=?",
        [student.name, student.srcode, student.program]
    );
    return rows;
};

export const findStudentById = async(id) =>{
    const [rows] = await pool.query("SELECT * FROM student WHERE id=?",
        [id]
    );
    return rows;
}

export const insert = async (student) =>{
    const [result] = await pool.query(
        "INSERT INTO student(name, srcode, program) VALUES (?,?,?)",
        [student.name, student.srcode, student.program]
    );

    return result.insertId;
};

export const update = async (student) => {
    const [result] = await pool.query (
        "UPDATE student SET name= ?, srcode= ?, program= ? WHERE id= ? ",
        [student.name, student.srcode, student.program, student.id]
    );
    return result.affectedRows;
}

export const remove = async (id) => {
    const [result] = await pool.query (
        "DELETE from student WHERE id= ? ", [id]
    ); 
    return result.affectedRows;
}