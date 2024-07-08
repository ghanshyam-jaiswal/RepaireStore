import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import list from '../Data/product'
import '../css/card.css'
import Payment from './Payment'
import axios from 'axios';
import { FiDelete } from "react-icons/fi";
import { toast } from 'react-toastify'



const Card = () => {

    let {productName}=useParams() 
    // || useLocation().state
    // let selectedCard=list.find((card)=>{return card.name===name})
    // console.log(selectedCard)
    let navigate = useNavigate()

    let [list,setList]=useState([])

    let [demoImages,setDemoImages]=useState([])
    const [demoImagesFile, setDemoImagesFile] = useState([]);

    let [cardDetails,setCardDetails]=useState({
      brand:'',
      model:'',
      selectedProblem:'',
      otherProblem:'',
      uploadedImages:[],
    })

    useEffect(()=>{
      setCardDetails({...cardDetails,uploadedImages:demoImages})
    },[demoImages])

    useEffect(()=>{
      let check=localStorage.getItem("user")|| localStorage.getItem("admin")
      if(check==='' || check===null){
        navigate('/login')
      }
    },[])

    useEffect(() => {
      fetchProducts(); // Fetch data immediately when component mounts
    }, [productName]); // Empty dependency array means run once on mount
  
    useEffect(()=>{
      console.log("Card List updated",list)
    },[list])

    // useEffect(()=>{
    //   // console.log("Card List updated",list)
    // },[productName])

    let fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:5164/getProductByName', {
          eventID: "1001",
          addInfo: {
            productName:productName
          }
        });
  
        if (response.data.rData.rMessage === 'Successful') {
          setList(response.data.rData.users);
          console.log("Fetched Card List successfully");
          console.log("Card List ",list);
  
        } else {
          console.log("Failed to fetch Card List");
        }
      } catch (error) {
        console.error("Error fetching Card List:", error);
      }
  
      // fetchProducts()
    };
  
    const handleDamageImages = (e) => {
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

    const handleDamageImageRemove = (index) => {
      const updatedImages = demoImages.filter((_, i) => i !== index);
      setDemoImages(updatedImages);
    };

    let isValidate=()=>{

      let proceed=true
      let message='Enter';
  
      if(cardDetails.brand===''|| cardDetails.brand===null){
        proceed=false
        message+=' Brand'
      }
      if(cardDetails.model===''|| cardDetails.model===null){
        proceed=false
        message+=' Model'
      }
      if( (cardDetails.selectedProblem === '' || cardDetails.selectedProblem === null) && 
          (cardDetails.otherProblem === '' || cardDetails.otherProblem === null) ){
        proceed=false
        message+=' Problem'
      }
      if(!proceed){
        toast.info(message)
      }
      return proceed
    }

    let requestHandle=()=>{
      let selectedCard=list[0]
      let selectedPrice=list[0].productPrice
      let selectedCardDetails=cardDetails
      // console.log("selectedCard",selectedCard)
      // console.log("selectedPrice",selectedPrice)
      if (!isValidate()) return;
      navigate('/payment', { state: { selectedCard,selectedPrice,selectedCardDetails} });
    }

    let handleCancel=()=>{
      navigate('/')
    }

  return (
    <div className='card'>

      {/* <h1>Card</h1> */}

      {
        list.map((item)=>(
          <div key={item.id} className='card-item'>
            <img src={item.productImage} alt={item.productName} />
            <h1>{item.productName}</h1>
          </div>
        ))
      }
     
      <div className='card-description'>
        <div className='card-description-box'>
            <h3>Mention The Damage Problems Here</h3>
            {/* <textarea name="" id=""  defaultValue="Write Here......"></textarea> */}
            <input type="text" placeholder='Brand' value={cardDetails.brand} onChange={(e)=>setCardDetails({...cardDetails,brand:e.target.value})} />
            <input type="text" placeholder='Model' value={cardDetails.model} onChange={(e)=>setCardDetails({...cardDetails,model:e.target.value})} />
            {/* <input type="text" placeholder='Problem - dropdown'/> */}
            {list.map((product) => {
              const dropdownOptions = JSON.parse(product.productDemoText);
              return (
                <select key={product.id} name="" id="" value={cardDetails.selectedProblem} onChange={(e)=>setCardDetails({...cardDetails,selectedProblem:e.target.value})} >
                  <option value="" disabled >Select a problem</option>
                  {dropdownOptions.map((text, idx) => (
                    <option key={idx} value={text}>{text}</option>
                  ))}
                </select>
              );
            })}
            <input type="text" placeholder='Other Problem' maxLength={400} value={cardDetails.otherProblem} onChange={(e)=>setCardDetails({...cardDetails,otherProblem:e.target.value})} />
            <div className='damageImage'>
              <label htmlFor="damageImage">Upload Images - 4max</label>
              <input type="file" id='damageImage' onChange={handleDamageImages}/>
            </div>
            {demoImages && ( demoImages.map((image, index) => (
              <div key={index} className='item'>
                 <img  src={image} alt='img' style={{height: '75%', width: '90%'}} />
                 <p style={{height: '20%', width: '100%',textAlign:'center',fontSize:'1vw'}}>{index+1} <FiDelete onClick={()=>handleDamageImageRemove(index)} /> </p>
              </div>
              ))
            )}
        </div>
        <div className='card-description-box-example'>
          {
            list.map((product) => {
              const image = JSON.parse(product.productDemoImages);
              return (
                <>
                  {image.map((img, idx) => (
                    <img key={idx} src={img} alt={`img ${idx}`}  />
                  ))}
                </>
              );
            })
          }
        </div>

        {/* <div className='card-description-box card-description-box-img'><img src="../Assests/8303673-removebg-preview.png" alt="" /></div> */}
        
      </div>
      <div className="card-button">
        <button className='card-button-request' onClick={()=> requestHandle()}>Request</button>
        <button className='card-button-cancel'onClick={()=> handleCancel()}>Cancel</button>
      </div>
      
    </div>
  )
}

export default Card
