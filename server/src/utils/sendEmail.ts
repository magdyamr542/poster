import * as nodemailer from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

export const sendEmail = async (to: string, html: string) => {
  console.log("sending email to", to);
  console.log("link is ", html);

  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  console.log(to, "to");
  let info = await transporter
    .sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: to, // list of receivers
      subject: "Change Password", // Subject line
      html: html,
    })
    .then((inf: any) => {
      console.log("Message sent: %s", inf.messageId); // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(inf));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
    .catch((e) => console.log("email not sent", e));
};
