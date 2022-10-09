/**
 * @swagger
 * 
 * /users:
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
 *  get:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de pegar todos os Usuários"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do get referente a todos os Usuário
 *    responses:
 *      '200':
 *        description: Sucesso
 * 
 * /users/login:
 *  post:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de login do Usuário"
 *    description: Realização do post referente ao login do Usuário
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Login"
 *    responses:
 *      '200':
 *        description: Sucesso
 * 
 * /users/logout:
 *  post:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de logout do Usuário"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do post referente ao logout do Usuário
 *    responses:
 *      '200':
 *        description: Sucesso
 * 
 * /users/me/avatar:
 *  post:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de criação do avatar do Usuário"
 *    description: Realização do post referente ao avatar do Usuário
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - in: formData
 *        name: avatar
 *        type: png
 *        description: The file to upload.
 *    responses:
 *      '200':
 *        description: Sucesso
 *  get:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de pegada do avatar do Usuário"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do get referente ao avatar do Usuário
 *    responses:
 *      '200':
 *        description: Sucesso
 *  delete:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de deleção do avatar do Usuário"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do delete referente ao avatar do Usuário
 *    responses:
 *      '200':
 *        description: Sucesso
 * 
 * /users/logoutAll:
 *  post:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de logout de todos os Usuários"
 *    security:
 *    - bearerAuth: []
 *    description: Realização do post referente ao logout de todos os Usuários
 *    responses:
 *      '200':
 *        description: Sucesso
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
 *  patch:
 *    tags:
 *    - "User.js"
 *    summary: Rota de patch do próprio usuário
 *    security:
 *    - bearerAuth: []
 *    description: Realiza um patch do usuário logado
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/PatchUser"
 *    responses:
 *      '200':
 *        description: Sucesso
 *      '500':
 *        description: Erro * 
 *  delete:
 *    tags:
 *    - "User.js"
 *    summary: Rota de delete do próprio usuário
 *    security:
 *    - bearerAuth: []
 *    description: Realiza um delete do usuário logado
 *    responses:
 *      '200':
 *        description: Sucesso
 *      '500':
 *        description: Erro * 
 * 
 * /users/{id}:
 *  get:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de get dos usuários pelo id"
 *    description: Realização do get dos usuários pelo seu id
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
 *  patch:
 *    tags:
 *    - "User.js"
 *    summary: "Rota de patch dos usuários pelo id"
 *    description: Realização do patch dos usuários pelo seu id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/PatchUser"
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
 *    - "User.js"
 *    summary: "Rota de delete dos usuários pelo id"
 *    description: Realização do delete dos usuários pelo seu id
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
 * 
 * 
 */