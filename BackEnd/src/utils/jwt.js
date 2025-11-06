// Importa a biblioteca JWT para criar e verificar tokens
import jwt from 'jsonwebtoken'

// Define a chave secreta que será usada para assinar os tokens
// Esta chave funciona como uma senha mestra do token
const KEY = 'cultbridge'

// FUNÇÃO 1: Criar um novo token
export function generateToken(userInfo) {
  // Pega as informações do usuário (como nome, email, etc) 
  // e transforma em um token usando a chave secreta
  return jwt.sign(userInfo, KEY)
}

// FUNÇÃO 2: Extrair informações de um token
export function getTokenInfo(req) {
  try {
    // Tenta pegar o token do cabeçalho da requisição
    let token = req.headers['x-access-token'];

    // Se não encontrou no cabeçalho, tenta pegar da URL como parâmetro
    if (token === undefined)
      token = req.query['x-access-token']

    // Decodifica o token usando a chave secreta para verificar se é válido
    // Se for válido, retorna as informações do usuário que estavam no token
    let signd = jwt.verify(token, KEY);
    return signd;
  }
  catch {
    // Se algo der errado (token inválido, expirado, etc), retorna null
    return null;
  }
}

// FUNÇÃO 3: Verificar se o usuário está autenticado (Middleware)
export function getAuthentication(checkRole, throw401 = true) {
  // Esta função retorna um middleware que pode ser usado nas rotas
  return (req, resp, next) => {
    try {
      // Tenta pegar o token do cabeçalho da requisição
      let token = req.headers['x-access-token'];

      // Se não encontrou no cabeçalho, tenta pegar da URL
      if (token === undefined)
        token = req.query['x-access-token'];

      // Verifica se o token é válido e decodifica suas informações
      let signd = jwt.verify(token, KEY);

      // Salva as informações do usuário na requisição para uso posterior
      req.user = signd;

      // Verifica se precisa checar permissões específicas
      if (checkRole && !checkRole(signd) && signd.role.type !== 'administrador')
        // Se o usuário não tem permissão e não é administrador, bloqueia o acesso
        return resp.status(403).end();

      // Se tudo estiver certo, permite continuar para a próxima função
      next();
    }
    catch {
      // Se o token for inválido ou ocorrer algum erro
      if (throw401) {
        // Se deve bloquear o acesso, retorna erro 401 (não autorizado)
        let error = new Error();
        error.stack = 'Authentication Error: JWT must be provided';
        resp.status(401).end();
      }
      else {
        // Se não deve bloquear, apenas continua (útil para rotas públicas)
        next();
      }
    }
  }
}