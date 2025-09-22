import loginController from './controller/loginController.js'
import postController from './controller/postController.js'


export default function adicionarRotas(api) {
    api.use(loginController)
    api.use(postController)

}