const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'carlos.goncalves@agrofauna.com.br',
        subject: 'Thanks for joining in',
        text:  `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCuntEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'carlos.goncalves@agrofauna.com.br',
        subject: 'Thanks for getting out.',
        text:  `Goodbye ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCuntEmail
}

