'use strict';

const sqlite = require('sqlite3');
const sjcl = require('sjcl');
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
};

const asyncGetIncompatibilityList = async(rows, resolve) =>{
    const tmp = [];
    for(let row of rows){
        const incompatibilityList = await getIncompatibilityList(row.CODE);
        tmp.push(new Course(row.CODE, row.NAME, row.CREDITS, row.MAX_STUDENTS, row.ENROLLED_STUDENTS, incompatibilityList, row.DEPENDENCY));
    }
    resolve(tmp);    
};

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
};

exports.getStudyPlanCourses = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT C.CODE, C.NAME, C.CREDITS, C.MAX_STUDENTS, C.ENROLLED_STUDENTS, C.DEPENDENCY " +
                    "FROM STUDY_PLANS AS SP, COURSES AS C " +
                    "WHERE SP.COURSE_CODE = C.CODE AND SP.STUDENT_EMAIL = ?";
        db.all(sql, [email], (err, rows) => {
            if(err){
                reject(err);
            }else{
                asyncGetIncompatibilityList(rows, resolve);
            }
        });
    });
};

exports.addCourseToStudyPlan = (courseCode, email) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO STUDY_PLANS(COURSE_CODE, STUDENT_EMAIL) VALUES(?,?)";
        db.run(sql, [courseCode, email], function (err){
            if(err){
                reject(err);
            }else{
                resolve(this.changes);
            }
        });
    });
};

exports.deleteCourseFromStudyPlan = (courseCode, email) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM STUDY_PLANS WHERE COURSE_CODE = ? AND STUDENT_EMAIL = ?";
        db.run(sql, [courseCode, email], function (err){
            if(err){
                reject(err);
            }else{
                resolve(this.changes);
            }
        });
    });
};

exports.getCompatibleCourses = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * " +
                    "FROM COURSES AS C " +
                    "WHERE C.CODE NOT IN( " + 
                        "SELECT COURSE_CODE " +
                        "FROM STUDY_PLANS " +
                        "WHERE STUDENT_EMAIL = ? " +
                    ") AND C.CODE NOT IN( " +
                        "SELECT INCOMPATIBLE_COURSE_CODE " +
                        "FROM INCOMPATIBILITIES " +
                        "WHERE COURSE_CODE IN( " +
                            "SELECT COURSE_CODE " +
                            "FROM STUDY_PLANS " +
                            "WHERE STUDENT_EMAIL = ? " +
                    "))" +
                    "AND (C.DEPENDENCY IN( " +
                        "SELECT COURSE_CODE " +
                        "FROM STUDY_PLANS " +
                        "WHERE STUDENT_EMAIL = ? " +
                    ") OR C.DEPENDENCY IS NULL) " +
                    "AND (C.ENROLLED_STUDENTS < C.MAX_STUDENTS OR C.MAX_STUDENTS IS NULL)";
        db.all(sql, [email,email,email], (err, rows) => {
            if(err){
                reject(err)
            }else{
                asyncGetIncompatibilityList(rows, resolve);
            }
        })
    });
};

exports.getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM STUDENTS WHERE EMAIL = ?";
        db.get(sql, [username], (err, row) => {
            if(err){
                reject(err);
            }else{
                if (!row){
                    resolve(false);
               }else{
                    const user = {username: row.EMAIL, name: row.NAME, surname: row.SURNAME, fulltime: row.FULLTIME};
                    /*crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
                        if (err){
                            reject(err);
                        }else{
                            if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
                                resolve(false);
                            else
                                resolve(user);  
                        }
                    });*/
                    if(row.PASSWORD === sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password))){
                        console.log('Login successful!');
                        resolve(user);
                    }else{
                        console.log('Oh shit!');
                        resolve(false);
                    }
               }
            }
        });
    });
};