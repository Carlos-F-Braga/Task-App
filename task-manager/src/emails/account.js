const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'carlos.goncalves@agrofauna.com.br',
        subject: 'Thanks for joining in',
        text:  `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

module.exports = {
    sendWelcomeEmail
}

