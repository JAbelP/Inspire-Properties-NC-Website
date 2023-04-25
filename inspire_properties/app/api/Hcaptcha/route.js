// pages/api/submit.js

import fetch from "node-fetch";

export default async (req, res) => {
  const { hCaptchaResponse, /* other form data */ } = req.body;

  // Verify hCaptcha response
  const isHCaptchaVerified = await verifyHCaptcha(hCaptchaResponse);

  if (isHCaptchaVerified) {
    // hCaptcha verification passed, process form data and submit
    // your form handling logic here
    // ...
    res.status(200).json({ success: true });
  } else {
    // hCaptcha verification failed
    res.status(400).json({ success: false, error: "hCaptcha verification failed" });
  }
};

// Server-side verification using hCaptcha API
const verifyHCaptcha = async (response) => {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY; // Replace with your hCaptcha site key
  const secretKey = process.env.NEXT_PUBLIC_HCAPTCHA_SECRET_KEY; // Replace with your hCaptcha secret key

  const result = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `response=${response}&secret=${secretKey}&sitekey=${siteKey}`,
  });

  const data = await result.json();

  if (data.success) {
    // hCaptcha verification passed
    return true;
  } else {
    // hCaptcha verification failed
    return false;
  }
};
