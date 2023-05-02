
export async function POST(request) {
  const body = await request.json();
  const s = process.env.HCAPTCHA_SECRETKEY;
  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `secret=${s}&response=${body.token}`
    });
    const result = await response.json();

    
      if (result.success ) {
        return new Response('Human Vibe Check',{
          status:200
        });
       
     } 
    else
     {
      return new Response('Bot Behavior',{
        status:500
      });
    }
  }
  catch (error) {
    console.error('Error parsing request body:', error);
    return new Response('Error parsing request body', {
      status: 500
    });
  }
}

