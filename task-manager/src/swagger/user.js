/**
 * @swagger
 * 
 * /usuarios/login:
 *  post:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de criação do Usuário"
 *    description: Realização do post referente a criação do Usuário
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/SignUp"
 *    responses:
 *      '200':
 *        description: Sucesso
 * 
 * 
 * /users/me:
 *  get:
 *    tags:
 *    - "User.js"
 *    summary: Rota de get do próprio usuário
 *    security:
 *    - bearerAuth: []
 *    description: Realiza um get do usuário logado
 *    responses:
 *      '200':
 *        description: Sucesso
 *      '500':
 *        description: Erro * 
 * 
 */