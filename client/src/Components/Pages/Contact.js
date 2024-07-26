import React, { useState } from 'react'
import './Contact.css'
import contact from '../../Assets/contact.png'
function Contact() {

    const[data,setData]=useState({
        name:"",
        email:"",
        contact:"",
        comment:""
    })

    const[errors,setErrors]=useState({
        name:"",
        email:"",
        contact:"",
        comment:""
    })

    const handlechange = (e) => {
        const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    function validateField(fieldName, value) {
        if (typeof value === 'string' && !value.trim()) {
          return `${fieldName} is required`;
        }
        // if (fieldName === "Email" && typeof value === 'string') {
        //   return "Email must be a valid Gmail address.";
        // }
        // return "";
    }

    const validateContact = (fieldName, value) => {
        if (!value.trim()) {
          return `${fieldName} is required`;
        } else if (value.length !== 10) {
          return "Please enter a valid Contact Number";
        }
        return "";
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        let formIsValid =true;

        if(formIsValid =true){
            errors.name= validateField("Name",data.name);
            errors.email= validateField("Email",data.email);
            errors.contact= validateContact("contact",data.contact);
            errors.comment= validateField("Comment",data.comment);

            setErrors(errors);
        }
        else{
            console.log("l");
            alert("success");
        }

        
        
        // formIsValid = Object.keys(errors).every(key => errors[key] === '');

        // if (formIsValid==false) {
            
        // }
    
    }
    
  return (
    <div>
        <div className='contact-img'>
            <div className='text-center pt-5'>
                <h4 className='pt-5 contact-h5'>We love hearing from our community! If you have any questions, <br></br>
                feedback, or just want to say hello, feel free to reach out to us.</h4>
            </div>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-5'>
                    <img src={contact} alt='img' className='contact-img-img'></img>
                </div>
                <div className='col-5 contact-div mb-5'>
                    <div className='text-center '>
                        <h2 className='pt-4'>Contact Us</h2>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <input type='text' 
                            className='contact-text mt-3' 
                            placeholder='Enter your Name'
                            name='name'
                            value={data.name}
                            onChange={handlechange}
                            />
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                            <hr></hr>
                            <input type='text' 
                            className='contact-text' 
                            placeholder='Enter your Email'
                            name='email'
                            value={data.email}
                            onChange={handlechange}
                            />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                            <hr></hr>
                            <input type='number' 
                            className='contact-text' 
                            placeholder='Enter your Contact No'
                            name='contact'
                            value={data.contact}
                            onChange={handlechange}
                            />
                            {errors.contact && <span className='text-danger'>{errors.contact}</span>}
                            <hr></hr>
                            <input type='text' 
                            className='contact-text' 
                            placeholder='Leave a Comment'
                            name='comment'
                            value={data.comment}
                            onChange={handlechange}
                            />
                            {errors.comment && <span className='text-danger'>{errors.comment}</span>}
                            <hr></hr>
                            <div className='text-center pt-4'>
                                <button className='contact-submit-btn' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                        <div className='col-1'></div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
        </div>
    </div>
  )
}

export default Contact
