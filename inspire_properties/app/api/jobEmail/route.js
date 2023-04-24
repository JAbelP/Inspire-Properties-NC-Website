const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json(); // Parse request body as JSON
    console.log("This is the body: ", body);

    const message = `
      email: ${body.email}\r\n
      phone: ${body.phone}\r\n
      address: ${body.address}\r\n
      services: ${body.services}
    `;

    const data = {
      to: 'abelpinales97@gmail.com',
      from: 'abel@inspirepropertiesraleigh.com',
      subject: 'jobs',
      text: message,
      html: message.replace(/\r\n/g, '<br>')
    };

    sgMail.send(data)
    return new Response(body, {
      status: 200
    });
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response('Error parsing request body', {
      status: 500
    });
  }
}


