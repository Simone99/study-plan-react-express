'use strict';

function Course(code, name, credits, maxStudents, enrolledStudents, incompatibleWith, preparatoryCourse){
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.maxStudents = maxStudents;
    this.enrolledStudents = enrolledStudents;
    this.incompatibleWith = incompatibleWith;
    this.preparatoryCourse = preparatoryCourse;
}

exports.Course = Course;