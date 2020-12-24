const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Please start walking over we will have your order ready in the next 20 minutes</p>
    <ul>
        ${order
          .map(
            (item) => `<li>
            <img src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} - ${item.price}
        </li>`
          )
          .join('')}
    </ul>
    <p> Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
            ul {
                list-style: none;
            }
    </style>
  </div>`;
}

/**
 * setting up with test email through
 * http://ethereal.email/create
 */
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'boop beep bop zzzzst good bye ERR 34234',
      }),
    };
  }
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `oops you are missing the ${field} field`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing!?`,
      }),
    };
  }

  await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
