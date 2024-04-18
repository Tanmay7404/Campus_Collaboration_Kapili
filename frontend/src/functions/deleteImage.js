export default async function deleteImage(publicId){
    if(publicId==='')
    {
      window.alert('no image: ' );
      return
    }
    try {
      console.log('deleting image')
      const response = await fetch(`http://localhost:8080/image/deleteImage/`+publicId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }); 
      var data=await response.json()

    //   setpp(profileImage)
    //   setFormData({...formData,url:'',imageName:''})
    //   console.log(data);
    //   console.log('Image deletion response:', response.data);
    } catch (error) {

    window.alert('Error deleting image: ' );
    console.error('Error deleting image:');

    }
  };