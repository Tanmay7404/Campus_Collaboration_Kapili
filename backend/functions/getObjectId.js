const UserModel = require("../models/userModel.js");

async function userNameToId(user_name) {
    var user = await UserModel.findOne({ username: user_name });
    if (user == null) {
        throw new Error("User Not Found");
    }
    return user._id;
}

async function userNameToIdList(userNameList) {
    var userIdList = [];
    const users = await UserModel.find({ username: { $in: userNameList } });
    if (users.length === userNameList.length) {
        users.forEach(user => {
            userIdList.push(user._id);
        });
        return userIdList;
    } else {
        throw new Error("User Not Found");
    }
}

const ProjectModel = require("../models/projectModel.js");

async function projectNameToId(project_name){
    var project = await ProjectModel.findOne({name: project_name});
    if(project==null){
        throw new Error("Project Not Found");
    }
    return project._id;
}

async function projectNameToIdList(projectNameList){
    var projectIdList = [];
    const projects = await ProjectModel.find({ name: { $in: projectNameList } });
    if(project.length === projectNameList.length){
        projects.forEach(project => {
            projectIdList.push(project._id);
        });
        return projectIdList;
    }
    else{
        throw new Error("Project Not Found");
    }
    
}

const CourseModel = require("../models/courseModel.js");

async function courseNameToId(course_name) {
    var course = await CourseModel.findOne({ title: course_name });
    if (course == null) {
        throw new Error("Course Not Found");
    }
    return course._id;
}

async function courseNameToIdList(courseNameList) {
    var courseIdList = [];
    const courses = await CourseModel.find({ title: { $in: courseNameList } });
    if (courses.length === courseNameList.length) {
        courses.forEach(course => {
            courseIdList.push(course._id);
        });
        return courseIdList;
    } else {
        throw new Error("Course Not Found");
    }
}

const TagModel = require("../models/tagModels.js");

async function tagNameToId(tag_name) {
    var tag = await TagModel.findOne({ name: tag_name });
    if (tag == null) {
        throw new Error("Tag Not Found");
    }
    return tag._id;
}

async function tagNameToIdList(tagNameList) {
    var tagIdList = [];
    const tags = await TagModel.find({ name: { $in: tagNameList } });
    if (tags.length === tagNameList.length) {
        tags.forEach(tag => {
            tagIdList.push(tag._id);
        });
        return tagIdList;
    } else {
        throw new Error("Tag Not Found");
    }
}

module.exports = {userNameToId,userNameToIdList,projectNameToId,projectNameToIdList,courseNameToId,courseNameToIdList,tagNameToId,tagNameToIdList}