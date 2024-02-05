const Course = require("../models/courseModel.js"); // Assuming the correct path to your courseModel file

class CourseController {
    async addCourse(course_details) {
        try {
            const course = new Course({
                title: course_details.title,
                description: course_details.description,
                lessons: course_details.lessons,
                tags: course_details.tags, // Assuming tags is an array of strings
                enrolledUsers: course_details.enrolledUsers, // Assuming enrolledUsers is an array of user IDs
                createdAt: course_details.createdAt || Date.now(),
                feedbacks: [],
                rating: course_details.rating,
                issues: course_details.issues,
                helpful: course_details.helpful
            });

            await course.save();
            return 1;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }
}

module.exports = CourseController;
