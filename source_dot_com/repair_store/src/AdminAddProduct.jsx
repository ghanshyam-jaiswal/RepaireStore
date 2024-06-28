import React, { useRef, useState } from 'react'
import "../css/adminAddProduct.css"
import { toast } from 'react-toastify';

const AdminAddProduct = () => {

  let [productImage,setProductImg]=useState("")
  const [productImageFile, productImageSetFile] = useState(null);

  let [demoImages,setDemoImages]=useState([])
  const [demoImagesFile, setDemoImagesFile] = useState([]);

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
    console.log("demo images",demoImages)
    // console.log("demo images File",demoImagesFile.length)
  };


  const [demoTexts, setDemoTexts] = useState([]);
  const [demoTextsInputValue, setDemoTextsInputValue] = useState('');

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

  const handleCancel = () => {
    setDemoTextsInputValue(''); // Clear the input field
  };


  return (
    <div className='adminAddProduct'>
      <h2>Add New Product</h2>
      <form action="">

        <div className='productImage'>
          <div className='labelImage'>
            <label htmlFor="productImage">Select Product Image</label>
            <input type="file" id='productImage' onChange={handleProductImage}/>
          </div>
          {productImageFile && (<img src={productImage} alt='img' style={{height:'100%',width:'20%',boxShadow: '0px 0px 7px rgb(151, 93, 93)'}}/>)}
        </div>
        
        <div className='productName'>
          <input type="text" placeholder='Product Name' />
        </div>

        <div className='productName'>
          <input type="text" placeholder='Product Price' />
        </div>

        <div className='productImage'>
          <div className='labelImage'>
            <label htmlFor="demoImage">Select Product Demo Images - max 4</label>
            <input type="file" id='demoImage' onChange={handleDemoImages}/>
          </div>

          <div  className='items'>
            {demoImages.map((image, index) => (
              <div key={index} className='item'>
                 <img  src={image} alt='img' style={{height: '80%', width: '100%'}} />
                 <p style={{height: '20%', width: '100%',textAlign:'center',fontSize:'1vw'}}>{index+1}</p>
              </div>
            ))}
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
              <button onClick={handleAddText}>Add</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>

          <div className="right">
            {demoTexts.map((text, index) => (
                <p key={index}>{text}</p>
            ))}
          </div>

        </div>

      </form>
      <div className='btns'>
        <button>Upload</button>
        <button>Clear</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default AdminAddProduct
