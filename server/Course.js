'use strict';

function Course(code, name, credits, maxStudents, incompatibleWith, preparatoryCourse){
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.maxStudents = maxStudents;
    this.incompatibleWith = incompatibleWith;
    this.preparatoryCourse = preparatoryCourse;
}

exports.Course = Course;