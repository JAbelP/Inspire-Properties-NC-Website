import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha';



function HCaptchaComponent({ onVerify }) {
    const handleVerify = (token) =>{
        onVerify(token);
    }
  return (
    <div className='pt-2'>
    {/* Render the hCaptcha component */}
    <HCaptcha
     sitekey={ "3401880a-95fe-4481-86fa-a258397649b5" } 
     onVerify={handleVerify}
      />
  </div>
  )
}

export default HCaptchaComponent