import loginController from './controller/loginController.js'
import postController from './controller/postController.js'
import perfilController from './controller/perfilController.js'
import express from 'express'

export default function adicionarRotas(api) {
    api.use(loginController)
    api.use(postController)
    api.use(perfilController)



    api.use('/public/storage', express.static('public/storage'))
}