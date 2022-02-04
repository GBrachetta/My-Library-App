const nodemailer = require('nodemailer');

exports.mailTransport = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

exports.generateEmail = (token) => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style>
          @media only screen and (max-width: 620px) {
              h1 {
                  font-size: 20px;
                  padding: 5px;
              }
          }
      </style>
  </head>

  <body>
      <div>
          <div style='max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;'>
              <h1 style="padding: 10px; text-align: center; color: #272727;">We are happy to have you on our team!</h1>
              <p>Please verify your email to continue.</p>
              <a href="${process.env.FRONTEND}/verify-email/${token}"><button style="border: 0;background: #4090a9;margin: 0 auto; text-align: center; padding: 15px; color: white; cursor: pointer; font-weight: bold;">Verify Email</button></a>
          </div>
      </div>
  </body>

  </html>
  `;
};

exports.generateEmailTemplate = (userId, token) => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style>
          @media only screen and (max-width: 620px) {
              h1 {
                  font-size: 20px;
                  padding: 5px;
              }
          }
      </style>
  </head>

  <body>
      <div>
          <div style='max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;'>
              <h1 style="padding: 10px; text-align: center; color: #272727;">We are happy to have you on our team!</h1>
              <p>Please verify your email to continue.</p>
              <a href="${process.env.FRONTEND}/verify-email/${userId}/${token}"><button style="border: 0;background: #4090a9;margin: 0 auto; text-align: center; padding: 15px; color: white; cursor: pointer; font-weight: bold;">Verify Email</button></a>
          </div>
      </div>
  </body>

  </html>
  `;
};

exports.successEmailTemplate = (heading, message) => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style>
          @media only screen and (max-width: 620px) {
              h1 {
                  font-size: 20px;
                  padding: 5px;
              }
          }
      </style>
  </head>

  <body>
      <div style='max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;'>
          <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">${heading}</h1>
          <p style="text-align: center; color: #272727;">${message}</p>
      </div>
  </body>

  </html>
  `;
};
