import React, { useEffect, useRef, useState } from 'react'
import "../css/adminAddProduct.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminAddProduct = () => {

  let [productImage,setProductImg]=useState("")
  const [productImageFile, productImageSetFile] = useState(null);

  let [demoImages,setDemoImages]=useState([])
  const [demoImagesFile, setDemoImagesFile] = useState([]);

  const [demoTexts, setDemoTexts] = useState([]);
  const [demoTextsInputValue, setDemoTextsInputValue] = useState('');

  let navigate=useNavigate()

  let [details,setDetails]=useState({
    productImage1:'',
    productName1:'',
    productPrice1:'',
    demoImages1:'',
    demoTexts1:'',
  })

  useEffect(()=>{
    // handleUpload()
    setDetails({
      ...details,
      productImage1:productImage,
      demoImages1:demoImages,
      demoTexts1:demoTexts
    })
    // console.log("details",details)
  },[productImage,demoImages,demoTexts])

  let handleProductImage = (e) => {
    const file1 = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductImg(reader.result);
      productImageSetFile(file1);
      // setUserDetails({ ...userDetails, profile: reader.result });
    };
    if (file1) {
      reader.readAsDataURL(file1);
    }
  };

  const handleDemoImages = (e) => {
    const files = Array.from(e.target.files);

    if (demoImages.length + files.length > 4) {
      toast.warn('You can only upload up to 4 Images');
      return;
    }

    const newDemoImages = [];
    const newDemoImagesFile = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newDemoImages.push(reader.result);
        newDemoImagesFile.push(file);

        // Update state after all files are read
        if (newDemoImages.length === files.length) {
          setDemoImages([...demoImages, ...newDemoImages]);
          setDemoImagesFile([...demoImagesFile, ...newDemoImagesFile]);
        }
      };
      reader.readAsDataURL(file);
    });
    // console.log("demo images",demoImages)
    // console.log("demo images File",demoImagesFile.length)
  };


  const handleAddText = (e) => {
    e.preventDefault()
    if (demoTexts.length >= 5) {
      alert('You can only add up to 5 demo texts.');
      return;
    }
    if (demoTextsInputValue.trim() === '') {
      alert('Text input cannot be empty.');
      return;
    }
    setDemoTexts([...demoTexts, demoTextsInputValue.trim()]);
    setDemoTextsInputValue(''); // Clear the input field
  };

  const handleDemoCancel = (e) => {
    e.preventDefault()
    setDemoTextsInputValue(''); // Clear the input field
  };


  let isValidate=()=>{

    let proceed=true
    let message='Enter';

    if(details.productImage1===''|| details.productImage1===null){
      proceed=false
      message+=' Product Image'
      
    }
    if(details.productName1===''|| details.productName1===null){
      proceed=false
      message+=' Name'
      
    }
    if(details.productPrice1===''|| details.productPrice1===null){
      proceed=false
      message+=' Price'
    }
    if(details.demoImages1===''|| details.demoImages1===null || details.demoImages1.length < 4){
      proceed=false
      message+=' Demo Images'
    }
    if(details.demoTexts1===''|| details.demoTexts1===null || details.demoTexts1.length < 4){
      proceed=false
      message+=' Demo Texts'
    }
   
    if(!proceed){
      // alert(message)
      toast.info(message)
    }
   
    return proceed
  }

  let handleUpload= async (e)=>{
    e.preventDefault()

    if (!isValidate()) return;

    console.log("details",details)

    let payload={
      eventID: "1001",
      addInfo: {
        productImage: details.productImage1,
        productName: details.productName1,
        productPrice: details.productPrice1,
        productDemoImages: details.demoImages1,
        productDemoText:details.demoTexts1,
      }
    }

    const response = await axios.post('http://localhost:5164/addProduct', payload);
      console.log(response)
      if(response.data.rData.rMessage==='Invalid product price'){
              toast.error("Invalid Product Price")
      }
      if(response.data.rData.rMessage==='Duplicate Credentials'){
              toast.error("Already Exists")
      }
      else if(response.data.rData.rMessage==='Added Successful'){
      // localStorage.removeItem('user')
      toast.success("Product Added Successful")
      navigate("/admin/allproducts")
    }


  }

  let handleClear=()=>{
    setDetails({
      productImage1:'',
      productName1:'',
      productPrice1:'',
      demoImages1:'',
      demoTexts1:'',
    })
    setProductImg('')
    setDemoImages('')
    // setDemoImagesFile(null)
    // setDemoTextsInputValue(''); // Clear the input field
    setDemoTexts('')
  }

  return (
    <div className='adminAddProduct'>
      <h2>Add New Product</h2>
      <form action="">

        <div className='productImage'>
          <div className='labelImage'>
            <label htmlFor="productImage">Product Image</label>
            <input type="file" id='productImage' onChange={handleProductImage}/>
          </div>
          {productImage && (<img src={productImage} alt='img' style={{height:'100%',width:'20%'}}/>)}
        </div>
        
        <div className='productName'>
          <input type="text" placeholder='Product Name' value={details.productName1} onChange={(e)=>setDetails({...details,productName1:e.target.value})} />
        </div>

        <div className='productName'>
          <input type="number" placeholder='Product Price' value={details.productPrice1} onChange={(e)=>setDetails({...details,productPrice1:e.target.value})} />
        </div>

        <div className='productImage'>
          <div className='labelImage'>
            <label htmlFor="demoImage">Product Demo Images - max 4</label>
            <input type="file" id='demoImage' onChange={handleDemoImages}/>
          </div>

          <div  className='items'>
            {demoImages && ( demoImages.map((image, index) => (
              <div key={index} className='item'>
                 <img  src={image} alt='img' style={{height: '80%', width: '100%'}} />
                 <p style={{height: '20%', width: '100%',textAlign:'center',fontSize:'1vw'}}>{index+1}</p>
              </div>
              ))
            )}
          </div>
            
        </div>

        <div className='demoText'>

          <div className='left'>
            <label htmlFor="demoText">Product Demo Text - max 5</label>
            <input type="text" id='demoText'
              value={demoTextsInputValue} 
              onChange={(e) => setDemoTextsInputValue(e.target.value)}
              placeholder='Enter Demo Text'
            />
            <div className="demoText-btns">
              <button onClick={handleAddText} className='add' >Add</button>
              <button onClick={handleDemoCancel} className='cancel' >Cancel</button>
            </div>
          </div>

          <div className="right">
            { demoTexts && ( demoTexts.map((text, index) => (
                <p key={index}>{text}</p>
            ))
            )
          }
          </div>

        </div>

      </form>
      <div className='btns'>
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleClear} >Clear</button>
        <button onClick={()=>navigate('/admin/allproducts')}>Cancel</button>
      </div>
    </div>
  )
}

export default AdminAddProduct
