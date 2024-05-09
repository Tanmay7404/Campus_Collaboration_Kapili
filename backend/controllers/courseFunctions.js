const Course = require("../models/courseModel.js");
const Project = require("../models/projectModel.js");
const Tag = require("../models/tagModels.js");

const User = require("../models/userModel.js");
const getObjectId = require("../functions/getObjectId.js");
const Issue = require("../models/issueModel.js");
const Chat = require("../models/chatModel.js");
const ChatController = require("./chatFunctions.js");

class CourseController {
    async addCourse(course_details) {
        try {
            const course = new Course({
                title: course_details.title,
                description: course_details.description,
                createdAt: course_details.createdAt || Date.now(),    
                courseImage:{url:course_details.courseImage.url,filename:course_details.courseImage.fileName},
                courseInfo: {
                    description: course_details.description,
                    demoLinks: course_details.demoLinks,
                    courseLink: course_details.courseLink
                },   
                creators:[],  
                endorsements: 0,
                level:course_details.level,
                tags: [],
                enrolledUsers: [], 
                feedbacks: [],
                rating: 0,
                issues: [],
            });
            await course.save();
            return course._id;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }
    
    async removeCourse(courseTitle) {
        const course = await Course.findOne(courseTitle);
        const course_id = await getObjectId.courseNameToId(course);
        const removedCourse = await Course.findByIdAndDelete(course_id);
        if(removedCourse){
            try {
                console.log(`deleted course : ${removedCourse}`);
                return course;
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
        const course = await Course.findOne({title : courseTitle});
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

    async ourCompletedCourses(username){
        
        const userId = await getObjectId.userNameToId(username);
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
    async addCreators(course_id, creators) {
        try {
            var course = await Course.findById(course_id);
            if (!course) {
                throw new Error("Course not found");
            }
            if(!creators.length) {
                console.log("creators empty")
                return 0;
            }
            else if(creators.length){
              
                var creatorsId = await getObjectId.userNameToIdList(creators);
                course.creators = course.creators.concat(creatorsId);
 
                {creatorsId.map(async (id) => {
                    var user = await User.findById(id);
                    if (!user) {
                        throw new Error("User not found");
                    }
                    user.courses.push(course_id);
                    await user.save();
                })}
                // var chatCC=new ChatController()
                // var chat=await chatCC.addChat({participants:creatorsId,projectName:project._id})
                // await chatCC.chatIdToUsers(chat,creatorsId)
                // course.chat=chat
                await course.save();
                return 1;
            }
            
        } catch (error) {
            throw error;
        }
    }

    async addTags(course_id,tags){
        try{
            var course = await Course.findById(course_id);
            if (!course) {
                throw new Error("Project not found");
            }
            if(!tags.length){
                console.log("tags are empty");
                return;
            }
            else if(tags.length){
                var tagsId = await getObjectId.tagNameToIdList(tags);
                course.tags = course.tags.concat(tagsId);
                course.save();
            }
        } catch(err){
            throw new Error(err);
        }
    }
    async addEnrolledUsers(course_title , users){
        try {
            const course = await Course.findOne({title : course_title});
        let userIds = await getObjectId.userNameToIdList(users);
        course.enrolledUsers = course.enrolledUsers.concat(userIds);
        await course.save();
        } catch (error) {
            console.log(error); 
        }
        
    }

    async addLikedCourse(username, coursetitle,likes) {
        try {
            const course = await Course.findOne({title:coursetitle });
            if (!course) return 0;
            course.likedUsers.push(username);
            course.endorsements=likes;
            await course.save();
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }
    async removeLikedCourse(username, coursetitle,likes) {
        // console.log('final')
        try {
            const course = await Course.findOne({title:coursetitle });
            if (!course) return 0;

            course.likedUsers = course.likedUsers.filter(users => users !== username);
            course.endorsements=likes;
            
            // console.log(project)
            await course.save();
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async addFeedback(coursetitle, userName , feedback) {
        try {
            let user = await User.findOne({username : userName });
            let course = await Course.findOne({title : coursetitle});
            if (!user || !course) {
                throw new Error("User or Project not found");
            }
            let data = {
                reviewer : userName,
                img:feedback.img,
                message : {
                    rating : feedback.rating,
                    text : feedback.text,
                }
            }
            course.feedbacks.push(data);
            var n = course.feedbacks.length;
            course.rating = (course.rating * (n - 1) + data.message.rating) / n;
            await course.save();
            return 1;
        } catch(err){
            throw new Error(err);
        }
    }

   
    async search(searchType , searchTerm , searchTags){
        try {
            if (searchType === 'course' || searchType === 'project' || searchType === 'user') {
                let title2="title";
                let tagsOrSkills="tags"

                if(searchType==="user") 
                {
title2="username"
tagsOrSkills="Skills"
                }
              const titleConditions = searchTerm.split(" ").map(term => ({  [title2]: { $regex: term, $options: 'i' } }));
              const tagNames = searchTags.map(tag => tag.tagname); // Extract tag names
              const tags = await Tag.find({ name: { $in: tagNames } });
              const tag_ids = tags.map(tag =>tag._id); // Extract tag names
            const tagConditions = {
                [tagsOrSkills]: {
                    $elemMatch: {
                        $in: tag_ids
                    }
                }
            };
            let   searchQuery
            if(searchTerm!==""&&tag_ids.length==0){
                console.log(1)
              searchQuery = {
                $or: [
                  { $and: titleConditions },
                  { $and: [tagConditions] }
                ]
              };}else if(searchTerm!==""&&tag_ids.length!==0)
              {
                console.log(2)
                console.log(searchTerm)
                console.log(tag_ids)

                searchQuery = {
                    $and: [
                      { $and: titleConditions },
                      { $and: [tagConditions] }
                    ]}
                }else {
                    console.log(3)

                searchQuery = {
                    $or: [
                      { $and: [tagConditions] }
                    ]
                  }
              }
              console.log(titleConditions);
              console.log(tagConditions);

              if(searchType == "course"){
                const results = await Course.find(searchQuery);
                return results;
              }
              else if(searchType == "project"){
                const results = await Project.find(searchQuery);
                return results;
              }else
              {
                const results = await User.find(searchQuery);
                const userList = results.map(user => ({
                    image: user.profileInfo.profilePicture.url, // Assuming profilePicture is an object with image URL
                    name: user.fullname,
                    username: user.username,
                    email: user.email,
                    link: `http://yourdomain.com/${user.username}`, // Example link, replace with actual logic
                }));
                return userList;
              }
            }
              
              
        } catch (error) {
            console.error(error);
           return "error"}
        }


    async addIssues(issue_id , course_title ){
        try {
            const issue = await Issue.findById(issue_id);
        const course  = await Course.findById(course_title);
        course.issues.push(issue);
        await course.save();
        } catch (error) {
            console.log(error);
        }
        
    }
    coursesByPopularity(courseList){
        courseList.sort((a,b)=>{
            const n3 = (a.rating) * (a.helpful.length);
            const n4 = (b.rating) * (b.helpful.length);
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
    async sortCoursesByFriends(currUser, courseList) {
        try {
            var user = await User.findOne({ username: currUser });
            courseList.sort((a, b) => {
                const n1 = _.intersection(user.friends, a.enrolledUsers).length;
                const n2 = _.intersection(user.friends, b.enrolledUsers).length;
                if (n1 === n2) {
                    const n3 = _.intersection(user.skills, a.tags).length;
                    const n4 = _.intersection(user.skills, b.tags).length;
                    if (n3 === n4) {
                        return 0;
                    }
                    return n3 < n4 ? -1 : 1;
                }
                return n1 < n2 ? -1 : 1;
            });
            return courseList;
        } catch (err) {
            throw new Error(err);
        }
    }
    
}

module.exports = CourseController;
