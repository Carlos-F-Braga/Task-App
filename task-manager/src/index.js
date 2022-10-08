const express = require('express')
require('./db/mongoose')
const bp = require('body-parser')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        title: 'Task App',
        description: 'Documentação completa em swagger por meio do swaggerUI do Task App criada e programada completamente por Carlos Frederyco com base nas requests das rotas da api e os campos representados no Banco como um todo, tendo como foco conseguirmos ter uma documentação de alto nível perfeita para qualquer programador sobre as rotas e as requests utilizadas por esta api em prodrução como em homologação pela forma de documentação de swagger direta no código sendo capaz de ser utilizada em ambos estes servidores para sua documentação.',
        version: '3.5.1',
        contact: {
          name: 'Carlos Frederyco',
          email: 'carlos.goncalves@agrofauna.com.br'
        },
        servers: ['http://localhost:' + port]
      }
    },
    apis: ['./src/routes/*.js', './src/swagger/*.js']
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log(swaggerDocs)

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET REQUEST DISABLED')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if (req.method) {
//         res.status(503).send('SHUT DOWN')
//     } else {
//         next()
//     }
// })

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is listening on port', port )
})