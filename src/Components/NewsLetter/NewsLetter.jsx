// import React, { useState } from 'react'
// import './NewsLetter.css'
// import Sweet from 'sweetalert2'

// const NewsLetter = () => {
//   let [email , setEmail] = useState("")
//   let handleSuccessClick = (e) => {
//     e.preventDefault()
//     Sweet.fire('Success!','Subscribed Successfully','success')
//     setEmail("")
//   }
//   return (
//     <div className='newsletter'>
//         <h1>Get Exclusive Offers On Your Email</h1>
//         <p>Subscribe to our newsletter and stay updated</p>
//           <div>
//             <input type="email" placeholder='Your email id' value={email} onChange={(e) => setEmail(e.target.value)} />
//             <button onClick={handleSuccessClick}>Subscribe</button> 
//           </div>     
//     </div>
//   )
// }

// export default NewsLetter

















import React, { useState } from 'react';
import './NewsLetter.css';
import Swal from 'sweetalert2';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  
  const handleSuccessClick = (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      Swal.fire('Success!', 'Subscribed Successfully', 'success');
      setEmail('');
    } else {
      Swal.fire('Email Cannot be Empty', 'Please enter a valid email address', 'error');
    }
  };

  const validateEmail = (email) => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type='email'
          placeholder='Your email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSuccessClick}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;

