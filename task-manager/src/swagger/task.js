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
 * 
 * /tasks/{id}:
 *  get:
 *    tags:
 *    - "Task.js"
 *    summary: "Rota de get das tasks pelo id"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do get das tasks pelo seu id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: O id da task a ser retornada
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Sucesso
 *      '500':
 *        description: Erro
 *  patch:
 *    tags:
 *    - "Task.js"
 *    summary: "Rota de patch das tasks pelo id"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do patch das tasks pelo seu id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/PatchTask"
 *    parameters:
 *      - in: path
 *        name: id
 *        description: O id do usuário a ser retornado
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Sucesso
 *      '500':
 *        description: Erro
 *  delete:
 *    tags:
 *    - "Task.js"
 *    summary: "Rota de delete das tasks pelo id"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do delete das tasks pelo seu id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: O id da task a ser retornado
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Sucesso
 *      '500':
 *        description: Erro
 */