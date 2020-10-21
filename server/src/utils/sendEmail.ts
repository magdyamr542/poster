import * as nodemailer from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

export const sendEmail = async (to: string, html: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
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
    let info = await transporter
      .sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: to, // list of receivers
        subject: "Change Password", // Subject line
        html: html,
      })
      .then((inf: any) => {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(inf));
        resolve(true);
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      })
      .catch((e) => {
        reject(false);
      });
  });
};
