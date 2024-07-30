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
        let formIsValid = true;
    
        errors.name = validateField("Name", data.name);
        errors.email = validateField("Email", data.email);
        errors.contact = validateContact("Contact", data.contact);
        errors.comment = validateField("Comment", data.comment);
    
        if (errors.name || errors.email || errors.contact || errors.comment) {
            formIsValid = false;
        }
    
        setErrors(errors);
    
        if (formIsValid) {
            alert("Success");
        }
    };
    
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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.3677869559274!2d76.87851777466639!3d8.56058789148324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bf9c97373c0f%3A0x71bf4c1c255160a4!2sSrishti%20Innovative!5e0!3m2!1sen!2sin!4v1722321461134!5m2!1sen!2sin" 
                 allowfullscreen="" className='contact-img-map' loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                   
                </div>
                <div className='col-1'></div>
            </div>
        </div>
    </div>
  )
}

export default Contact
