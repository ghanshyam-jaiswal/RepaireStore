import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/adminUpdateProduct.css";
import { toast } from 'react-toastify';
import { FiDelete } from "react-icons/fi";

const AdminUpdateProduct = () => {
    let { id } = useParams();
    let navigate = useNavigate();

    let [productDetails, setProductDetails] = useState({
        id: '',
        productImage: '', 
        productName: '', 
        productPrice: '', 
        productDemoImages: [], 
        productDemoText: []
    });


    useEffect(() => {
        fetchProductById();
    }, [id]); 

    const fetchProductById = async () => {
        try {
            const response = await axios.post('http://localhost:5164/getProductById', {
                eventID: "1001",
                addInfo: {
                    id: id
                }
            });

            if (response.data.rData.rMessage === 'Successful') {
                let newData = response.data.rData.users[0];
                setProductDetails({
                    ...productDetails,
                    id: newData.id,
                    productImage: newData.productImage,
                    productName: newData.productName,
                    productPrice: newData.productPrice,
                    productDemoImages: JSON.parse(newData.productDemoImages),
                    productDemoText: JSON.parse(newData.productDemoText)
                });
                console.log("Fetched productDetails successfully");
                console.log("productDetails ", productDetails);
            } else {
                console.log("Failed to fetch product details");
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value
        });
    };

    const handleProductImageChange = (e) => {
        // e.preventDefault()
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductDetails({
                    ...productDetails,
                    productImage: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDemoImageRemove = (index) => {
        // index.preventDefault()
        const updatedImages = [...productDetails.productDemoImages];
        updatedImages.splice(index, 1);
        setProductDetails({
            ...productDetails,
            productDemoImages: updatedImages
        });
    };
   
    const handleDemoImage = (e) => {
        const files = Array.from(e.target.files).slice(0, 4); // Get up to 4 files
    
        if (productDetails.productDemoImages.length + files.length > 4) {
            toast.warn('You can only upload up to 4 Images');
            return;
        }
    
        const newImages = [];
        const newImagesFiles = [];
    
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push(reader.result);
                newImagesFiles.push(file);
    
                // Update state after all files are read
                if (newImages.length === files.length) {
                    setProductDetails({
                        ...productDetails,
                        productDemoImages: [...productDetails.productDemoImages, ...newImages]
                    });
                }
            };
            reader.readAsDataURL(file);
        });
    };
    

    const handleDemoTextRemove = (index) => {
        // index.preventDefault()
        const updatedImages = [...productDetails.productDemoText];
        updatedImages.splice(index, 1);
        setProductDetails({
            ...productDetails,
            productDemoText: updatedImages
        });
    };

    let handleAddText=(e)=>{
        e.preventDefault()
        const newDemoText = document.getElementById('demoText').value.trim();
        if (newDemoText === '') {
            toast.warn("Empty not allow")
            return; 
        }
        if(productDetails.productDemoText.length===5){
            toast.warn("You can add upto 5")
            return;
        }
        setProductDetails({
            ...productDetails,
            productDemoText: [...productDetails.productDemoText, newDemoText]
        });
        // Clear input after adding
        document.getElementById('demoText').value = '';
    }

    let handleUpload= async (e)=>{
        // console.log("product details ",productDetails)
        e.preventDefault()
        let payload={
          eventID: "1001",
          addInfo: {
            id: productDetails.id,
            productImage: productDetails.productImage,
            productName: productDetails.productName,
            productPrice: productDetails.productPrice,
            productDemoImages:productDetails.productDemoImages,
            productDemoText: productDetails.productDemoText,
          }
        }
        try {
          const response = await axios.post('http://localhost:5164/updateProductById', payload);
          console.log(response)
          if(response.data.rData.rMessage==='No rows affected. Update failed.'){
            toast.error("Updated Failed")
          }
          else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY'){
            console.log('Updated Successfully');
            toast.success('Updated Successfully');
            navigate('/admin/allproducts')
          }
        } 
        catch (error) {
            // console.error('Error Update:', error);
            toast.error('An error occurred during Update');
        }
    }

    return (
        <div className='adminUpdateProduct'>
            <h2>Update Product</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='productImage'>
                    <div className='labelImage'>
                        <label htmlFor="productImage">Product Image</label>
                        <input type="file" id='productImage' onChange={handleProductImageChange}/>
                    </div>
                    {productDetails.productImage && (
                        <img src={productDetails.productImage} alt='img' style={{height:'100%',width:'20%'}}/>
                    )}
                </div>
                
                <div className='productName'>
                    <input 
                        type="text" 
                        placeholder='Product Name' 
                        name="productName"
                        value={productDetails.productName} 
                        onChange={handleInputChange} 
                    />
                </div>

                <div className='productName'>
                    <input 
                        type="number" 
                        placeholder='Product Price' 
                        name="productPrice"
                        value={productDetails.productPrice} 
                        onChange={handleInputChange} 
                    />
                </div>

                <div className='productImage'>
                    <div className='labelImage'>
                        <label htmlFor="demoImage">Product Demo Images - max 4</label>
                        <input type="file" id='demoImage' onChange={handleDemoImage}/>
                        {/* <input type="file" id='demoImage' onChange={handleDemoImages}/> */}
                    </div>

                    <div className='items'>
                        {productDetails.productDemoImages && productDetails.productDemoImages.map((image, index) => (
                            <div key={index} className='item'>
                                <img src={image} alt='img' style={{height: '80%', width: '100%'}} />
                                {/* <p style={{height: '20%', width: '100%', textAlign:'center', fontSize:'1vw'}}>{index+1} <button onClick={handleDemoImageRemove}>-</button></p> */}
                                <p style={{height: '20%', width: '100%', textAlign:'center', fontSize:'1vw'}}>{index+1} <FiDelete onClick={()=>handleDemoImageRemove(index)} /></p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='demoText'>
                    <div className='left'>
                        <label htmlFor="demoText">Product Demo Text - max 5</label>
                        <input type="text" id='demoText'
                            // value={demoTextsInputValue} 
                            // onChange={handleDemoText}
                            placeholder='Enter Demo Text'
                        />
                        <div className="demoText-btns">
                            <button onClick={handleAddText} className='add' >Add</button>
                            {/* <button onClick={handleDemoCancel} className='cancel' >Cancel</button> */}
                        </div>
                    </div>

                    <div className="right">
                        {productDetails.productDemoText && productDetails.productDemoText.map((text, index) => (
                            // <p key={index}> {text} <button onClick={handleDemoTextRemove}>-</button></p>
                            <p key={index}> {text} <FiDelete onClick={()=>handleDemoTextRemove(index)}/></p>
                        ))}
                    </div>
                </div>
            </form>
            <div className='btns'>
                <button onClick={handleUpload}>Upload</button>
                {/* <button onClick={handleClear} >Clear</button> */}
                <button onClick={() => navigate('/admin/allproducts')}>Cancel</button>
            </div>
        </div>
    );
};

export default AdminUpdateProduct;
