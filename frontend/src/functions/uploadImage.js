export default async function uploadImage(file,type="image"){
    const formData1 = new FormData();
    formData1.append("file",file);
    formData1.append("upload_preset","xgz5toim");
    if(type=="video"){
        var url = "https://api.cloudinary.com/v1_1/dxkhzuvmr/video/upload";
    }
    else{
        var url = "https://api.cloudinary.com/v1_1/dxkhzuvmr/image/upload";
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData1,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null; // Or however you wish to handle errors.
    }
};