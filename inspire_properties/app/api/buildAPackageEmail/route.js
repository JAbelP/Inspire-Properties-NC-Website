const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export async function POST(request) {
  const body = await request.json();
  try {
    const message = `
      Name: ${body.name}\r\n
      Email: ${body.email}\r\n
      Phone: ${body.phone}\r\n
      Address: ${body.address}\r\n
      Date: ${body.dateAndTime}\r\n
      Services: ${JSON.stringify(body.services)}
    `;

    const data = {
      to: 'abelpinales97@gmail.com',
      from: 'abel@inspirepropertiesraleigh.com',
      subject: `Package Offer - (Lead) ${body.name}`,
      text: message,
      html: message.replace(/\r\n/g, '<br>')
    };

    sgMail.send(data)
    return new Response(body, {
      status: 200 
    });
  } catch (error) {
    console.error('Error parsing request body:', error);

    return new Response(`Error parsing request body ${error}`, {
      status: 500
    });
    
  }
}


