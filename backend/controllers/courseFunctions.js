const Course = require("../models/courseModel.js");
const User = require("../models/userModel.js");
const getObjectId = require("../functions/getObjectId.js");
const Issue = require("../models/issueModel.js");

class CourseController {
    async addCourse(course_details) {
        try {
            const course = new Course({
                title: course_details.title,
                description: course_details.description,
                lessons: course_details.lessons,
                createdAt: course_details.createdAt || Date.now(),            
                tags: [],
                enrolledUsers: [], 
                feedbacks: [],
                rating: 0,
                issues: [],
                helpful: []
            });
            await course.save();
            return course_details._id;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }
    
    async removeCourse(courseId) {
        const course = await Course.findByIdAndDelete(courseId);
        if(course){
            try {
                console.log(`deleted course : ${course}`);
                return 1;
            } catch (error) {
                console.log(error);
                return 0;   
            }
        }
        console.log("NO COURSE FOUND");
    }

    async getCoursesAll(){
        const allcourses = await Course.find({});
        if(allcourses.length)
        try {
            return allcourses;
        } catch (error) {
            console.log(error);
            return 0;
        }
        console.log("COURSE LIST IS EMPTY");
    }

    async searchCourse(courseTitle){
        const course = await Course.find({title : courseTitle});
        if(course){
            try {
                return course;
            } catch (error) {
                console.log(error);
                return 0;
            }
        }
        console.log("NO SUCH COURSE");
    }

    async removeAllCourses(){
        const allCourses = await Course.find({});
        if(allCourses.length){
            try {
                await Course.deleteMany({});
                return 1;
            } catch (error) {
                console.log(error);
                return 0;
            }
        }
        console.log("NO COURSES TO REMOVE");
    }

    async ourCompletedCourses(userId){
        const user = await User.findById(userId);
        if(user.coursesCompleted.length){
            try {
                return user.coursesCompleted;
            } catch (error) {
                console.log(error);
                return 0;
            }
        }
        console.log("NO COMPLETED COURSES");
    }

    async addTags(course_id , tags){
        try {
            let course = await Course.findById(course_id);
        let tagId = await getObjectId.tagNameToIdList(tags);
        course.tags = course.tags.concat(tagId);
        await course.save();
        } catch (error) {
           console.log(error); 
        }
        
    }
    async addEnrolledUsers(course_id , users){
        try {
            let course  = await Course.findById(course_id);
        let userIds = await getObjectId.userNameToIdList(users);
        course.enrolledUsers = course.enrolledUsers.concat(userIds);
        await course.save();
        } catch (error) {
            console.log(error); 
        }
        
    }

    async addFeedback(course_id,feedback){
        try {
            var userId = await getObjectId.userNameToId(feedback.reviewer);
            var newFeedback = {
                reviewer: userId,
                message: {
                    rating: feedback.rating,
                    text: feedback.test,
                    timestamp: feedback.timestamp
                }
            }
            var course = await Course.findById(course_id);
            course.feedbacks.push(newFeedback);
            var n = course.feedbacks.length;
            course.rating = (course.rating*(n-1) +newFeedback.message.rating)/n;
            course.save();
            return 1;
        } catch (error) {
            console.log(error);
        }
        
    }
    async addIssues(issue_id , course_id){
        try {
            const issue = await Issue.findById(issue_id);
        const course  = await Course.findById(course_id);
        course.issues.push(issue);
        await course.save();
        } catch (error) {
            console.log(error);
        }
        
    }
    coursesByPopularity(courseList){
        courseList.sort((a,b)=>{
            const n3 = (a.rating) * (a.enrolledUsers.length);
            const n4 = (b.rating) * (b.enrolledUsers.length);
            if(n3 == n4){
                return 0;
            }
            else if(n3 < n4){
                return -1;
            }
            else{
                return 1;
            }
        })
        return courseList;
    }
}

module.exports = CourseController;
