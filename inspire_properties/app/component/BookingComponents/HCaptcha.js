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
     sitekey={ process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY } 
     onVerify={handleVerify}
      />
  </div>
  )
}

export default HCaptchaComponent