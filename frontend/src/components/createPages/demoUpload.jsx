import React from "react";
import uploadImage from '../../functions/uploadImage';
import deleteImage from '../../functions/deleteImage';
import { useState} from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ReactPlayer from 'react-player';

export default function DemoUpload ({text,demoImages,setDemo}){

    const [playing, setPlaying] = useState(false);

    const handleTogglePlay = () => {
      setPlaying(!playing);
    };

    const imageTypes = /^image\//;
    const videoTypes = /^video\//;
    
    const uploadDemoImages = async(files) => {

        const filesArray = Array.from(files);
        let newData = [...demoImages];  

        await Promise.all(filesArray.map(async (ele) => {
            if (videoTypes.test(ele.type)) {
                var data = await uploadImage(ele,"video");
            }
            else{
                var data = await uploadImage(ele);
            }
            newData=[...newData,{"fileName": data.public_id, "link": data.secure_url}];
        }));
        
        setDemo(newData);
        console.log(newData);
        return;
    }
    
    const deleteDemoImage = async(index) =>{
        var data = await deleteImage(demoImages[index].filename);
        setDemo(demoImages.filter((_, idx) => index !== idx));
        return;
    }

    const[hoverIndex,setHoverIndex]=useState(null);

    const handleMouseOver = (index) => {
      setHoverIndex(index);
    };
  
    const handleMouseOut = () => {
      setHoverIndex(null);
    };

    return (
        <div className="fillWidthDiv4">
            <div className="E-mail" >
                <p className="text_input" >{text}</p>
            </div>
            <div style={{display:'flex',flexDirection:'row',gap:'20px'}}>
                <input type="file" id="fileInput2" name="fileInput2" hidden multiple onChange={(event) => uploadDemoImages(event.target.files)} />
                <label htmlFor="fileInput2" variant="outline-dark" className="buttonHover" style={{
                    width: 180,
                    height: 120,
                    backgroundColor: "#3B3B3B",
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    borderColor: "white"
                }}>
                    <AiOutlinePlusCircle size={36}></AiOutlinePlusCircle>
                </label>
                <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingTop: '0px', borderRadius: '20px',width: 'calc(100% - 200px)' , maxHeight: '100px', overflowY: 'hidden' }}>
                          
                    {demoImages.map((image, index) => (
                        <div key={index}  className="imageContainer2" onMouseOver={() => handleMouseOver(index)} onMouseOut={handleMouseOut} style={{ display: 'inline-block', position: 'relative', marginRight: 10,cursor:'pointer',verticalAlign:'top' }}>
                            {!image.link.toLowerCase().includes('video') && (
                                <img src={image.link} alt={`Project Image ${index + 1}`} style={{ width: 180, height: 120, borderRadius: '10px' }} />
                            )}
                            {image.link.toLowerCase().includes('video') && (
                                <ReactPlayer url={image.link} controls={true} loop={true} autoPlay={playing} onClick={handleTogglePlay} height={120} width={180} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            )}
                            {(hoverIndex===index)&& <button onClick={() =>deleteDemoImage(index) } className="deleteButton">X</button>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}