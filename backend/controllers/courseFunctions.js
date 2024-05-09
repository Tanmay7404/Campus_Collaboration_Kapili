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
            if(course_details.id==""){
                console.log("HELLO");
                const chat = new Chat({
                    participants: [], // Assuming participants is an array of user IDs
                    messages: [],
                    lastMessage: null,
                    lastMessageTime: Date.now(),
                    projectName: null,
                    courseName: null
                });   
                await chat.save();
                var new_course = {...course_details,
                    enrolledUsers: [],
                    endorsements: 0,
                    feedbacks: [],
                    rating: 0,
                    likedUsers:[],
                    chat: chat._id,
                    creators:[]
                }
                console.log("new_course",new_course);
                var course = new Course(new_course); 
                await course.save();
                chat.courseName = course._id;
                await chat.save();
                return course._id;
            }
            else{
                console.log("WHAT");
                var course = Course.findById(course_details.id);
                if(!course){
                    throw new Error("Course Not Found");
                }
                course = await Course.findByIdAndUpdate(course_details.id,course_details);
                return course._id;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    
    async addCreators(course_id, creatorsId) {
        try {
            var course = await Course.findById(course_id);
            if (!course) {
                throw new Error("Course not found");
            }
            if(!creatorsId.length) {
                console.log("creators empty")
                return 0;
            }
            else if(creatorsId.length){
                console.log(1,course.creators);
                {course.creators.map(async (id) => {
                    var user = await User.findById(id);
                    console.log(user.username);
                    if (!user) {
                        throw new Error("User not found");
                    }

                    user.courses = user.courses.filter((e)=> e.toString()!==course_id.toString());
                    user.coursesCompleted = user.coursesCompleted.filter((e)=> e.toString()!==course_id.toString());
                    user.chats = user.chats.filter((e)=> e.toString()!==course.chat.toString());
                    console.log(user.courses);
                    await user.save();
                })}
                console.log(2);
                course.creators = creatorsId;

                var chat = await Chat.findById(course.chat);
                if (chat) {
                    chat.participants = course.creators;
                } else {
                    throw new Error ("Chat Not initialised");
                }
                {creatorsId.map(async (id) => {
                    var user = await User.findById(id);
                    if (!user) {
                        throw new Error("User not found");
                    }
                    user.courses.push(course_id);
                    user.coursesCompleted.push(course_id);
                    user.chats.push(course.chat);
                    await user.save();
                })}
                await course.save();
                await chat.save();
                return 1;
            }
            
        } catch (error) {
            throw error;
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

    async getCoursebyName (cname){
        try{
            const data = await Course.findOne({title:cname});
            var cc = await getObjectId.userIdtoNameList(data.creators);
            var tt = await getObjectId.tagIdtotaglist(data.tags);
            var dd = { ...data._doc, creators: cc, tags: tt };
            return dd;
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    }
    
}

module.exports = CourseController;
