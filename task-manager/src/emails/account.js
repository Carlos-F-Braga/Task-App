const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'carlos.goncalves@agrofauna.com.br',
    from: 'carlos.goncalves@agrofauna.com.br',
    subject: 'This is from sendGrid',
    text: 'sent email'
})
