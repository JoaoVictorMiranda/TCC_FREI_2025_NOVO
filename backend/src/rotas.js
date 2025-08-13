import cultbridgeController from './controller/cultbridgeController.js'


export function adicionarRotas(api) {
    api.use(cultbridgeController);
}
