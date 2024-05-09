import React from 'react';
import Button from 'react-bootstrap/Button';
import uploadImage from '../../functions/uploadImage';
import deleteImage from '../../functions/deleteImage';
 // Import your profile image
 import profileImage from '../../assets/images/profile_image.jpg';
 import courseImage  from '../../assets/images/course_image.jpg';
 import projectImage  from '../../assets/images/project_image.jpg';



function ProfilePicAdd({profilepic,setpp,setImgN,imgN,type}) {

    const imageTypes = /^image\//;

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const uploadPP = async (file) =>{
        if (imageTypes.test(file.type)) {
            var data = await uploadImage(file);;
            setpp(data.secure_url);
            setImgN(data.public_id)
        }
        else{
            window.alert("Invalid File Format");
        }
    }
    return (
        <div className="fillWidthDiv3">
            <div className="imageContainer">
                <img src={profilepic} alt="Profile" className="profile-image" />
            </div>
            <div className="buttonContainer" >
                <input type="file" id="fileInput" name="fileInput" hidden onChange={(event)=>uploadPP(event.target.files[0])} />
                
                <Button variant="outline-dark" onClick={triggerFileInput}
                    className="buttonHover"  style={{height:"100%", width:"100%", backgroundColor: "#111111",justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px'}}  >
                    <p  className="profile_pic_text"> Upload new Picture </p>
                </Button>
                
            </div>
            <div className="buttonContainer" >
                <Button variant="outline-dark" onClick ={()=>{
                    deleteImage(imgN);
                    if(type=='profile'){
                        setpp(profileImage);
                    }
                    else if(type=='course'){
                        setpp(courseImage);
                    }
                    else{
                        setpp(projectImage);
                    }
                    setImgN = "";
                }} className="buttonHover"  style={{height:"100%", width:"100%", backgroundColor: "#111111",justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px'}}  >
                    <p  className="profile_pic_text"> Remove Picture </p>
                </Button>
            </div>
        </div>
    )
}

export default ProfilePicAdd;