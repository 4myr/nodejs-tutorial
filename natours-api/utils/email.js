const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.firstName;
        this.url = url;
        this.from = `AMYR ${process.env.EMAIL_FROM}`; 
    }
    createTransport() {
        return nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f82a1aba47b144",
                pass: "25739e99bec233"
            }
        })
    }
    send(template, subject) {
        const html = pug.renderFile(__dirname + `/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url
        });
        const transporter = this.createTransport();
        transporter.sendMail({
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.toString(html)
        });
    }
    sendWelcome() {
        this.send('welcome', 'Welcome To Natours');
    }
}