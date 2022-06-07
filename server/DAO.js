'use strict';

const sqlite = require('sqlite3');
const {Course} = require('./Course');

const db = new sqlite.Database('StudyPlanDB.db', err => { if (err) throw err;});

const getIncompatibilityList = (courseCode) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT INCOMPATIBLE_COURSE_CODE FROM INCOMPATIBILITIES WHERE COURSE_CODE = ?";
        db.all(sql, [courseCode], (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows.map(row => row.INCOMPATIBLE_COURSE_CODE));
            }
        });
    });
}

const asyncGetIncompatibilityList = async(rows, resolve) =>{
    const tmp = [];
    for(let row of rows){
        const incompatibilityList = await getIncompatibilityList(row.CODE);
        tmp.push(new Course(row.CODE, row.NAME, row.CREDITS, row.MAX_STUDENTS, incompatibilityList, row.DEPENDENCY));
    }
    resolve(tmp);    
}

exports.getAllCourses = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM COURSES";
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
            }else{
                asyncGetIncompatibilityList(rows, resolve);
            }
        })
    });
};

exports.getCourseByCode = (courseCode) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM COURSES WHERE CODE = ?";
        db.get(sql, [courseCode], (err, row) => {
            if(err){
                reject(err);
            }else{
                asyncGetIncompatibilityList(row === undefined? [] : [row], resolve);
            }
        });
    });
}