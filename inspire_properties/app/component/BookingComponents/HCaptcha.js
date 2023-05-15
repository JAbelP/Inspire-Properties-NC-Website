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
     sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY} //	10000000-ffff-ffff-ffff-000000000001 //3401880a-95fe-4481-86fa-a258397649b5
     onVerify={handleVerify}
      />
    </div>
  )
}

export default HCaptchaComponent