/**
 * @swagger
 * 
 * /tasks:
 *  post:
 *    tags:
 *    - "Task.js"
 *    summary: "Rota de criação da Task"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do post referente a criação da Task
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/createTask"
 *    responses:
 *      '200':
 *        description: Sucesso
 *  get:
 *    tags:
 *    - "Task.js"
 *    summary: "Rota de pegar todas as Tasks"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do get referente a todas as Tasks
 *    responses:
 *      '200':
 *        description: Sucesso
 * 
 * /tasks/me:
 *  get:
 *    tags:
 *    - "Task.js"
 *    summary: "Rota de pegar todas as Tasks do Usuário"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do get referente a todas as Tasks do Usuário
 *    responses:
 *      '200':
 *        description: Sucesso
 */