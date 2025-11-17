import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Privacidade() {
    return (
        <div className="privacidade-page">
            <Header />
            
            <div className="privacidade-container">
                <div className="privacidade-content">
                    <h1 className="privacidade-title">📋 Termos e Políticas</h1>
                    
                    {/* Política de Privacidade */}
                    <section className="politica-section">
                        <div className="section-header">
                            <span className="section-icon">🛡️</span>
                            <h2 className="section-title">POLÍTICA DE PRIVACIDADE – CULTBRIDGE</h2>
                        </div>
                        
                        <p className="section-intro">
                            O Cultbridge, disponível em <strong>https://cultbridge.com</strong>, é uma plataforma digital desenvolvida 
                            com o propósito de promover o acesso à cultura, possibilitando que os usuários conheçam, avaliem e 
                            consultem informações sobre filmes, além de interagirem em comunidades culturais.
                        </p>
                        
                        <p className="section-intro">
                            Esta Política de Privacidade tem por objetivo esclarecer, de forma transparente, como ocorre a coleta, 
                            o uso, o armazenamento, a proteção e o tratamento dos dados pessoais dos usuários, conforme disposto 
                            na <strong>Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD)</strong>.
                        </p>

                        <div className="topics-container">
                            <div className="topic-item">
                                <h3 className="topic-title">1. DO CONTROLADOR E CONTATO</h3>
                                <p className="topic-content">
                                    O controlador dos dados é o Cultbridge, representado pelos responsáveis: <strong>João Victor Miranda Reis, 
                                    Lucas Gil Reche, Lucas Silva Manoel e Lucas Viana</strong>, acompanhados pelos professores coordenadores 
                                    do curso Técnico em Informática do Instituto Social Nossa Senhora de Fátima: <strong>Bruno Oliveira, 
                                    Pedro Henrique Moreira Martins e Robson Alves dos Santos</strong>, com apoio do professor de 
                                    Empreendedorismo <strong>Natan</strong>.
                                </p>
                                <p className="topic-contact">
                                    <strong>Contato oficial:</strong> cultbridgeoficial@gmail.com<br/>
                                    <strong>País de operação:</strong> Brasil
                                </p>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">2. DADOS PESSOAIS COLETADOS</h3>
                                <p className="topic-content">
                                    O Cultbridge coleta, mediante consentimento do usuário, os seguintes dados:
                                </p>
                                <ul className="topic-list">
                                    <li>Nome completo</li>
                                    <li>Data de nascimento</li>
                                    <li>Endereço de e-mail</li>
                                    <li>Senha de acesso</li>
                                </ul>
                                <p className="topic-content">
                                    Os dados são obtidos exclusivamente por meio do formulário de cadastro no site.
                                </p>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">3. FINALIDADE DO TRATAMENTO</h3>
                                <p className="topic-content">
                                    Os dados são tratados para:
                                </p>
                                <ul className="topic-list">
                                    <li>Permitir o acesso seguro à conta do usuário e o uso das funcionalidades do site</li>
                                    <li>Alimentar o algoritmo de recomendações culturais</li>
                                    <li>Melhorar a experiência de navegação</li>
                                    <li>Garantir segurança, autenticação e prevenção a fraudes</li>
                                </ul>
                                <p className="topic-content">
                                    O Cultbridge <strong>não</strong> realiza vendas, transações financeiras ou compartilhamento de dados 
                                    para fins comerciais ou publicitários.
                                </p>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">4. DO USO DE COOKIES</h3>
                                <p className="topic-content">
                                    O Cultbridge utiliza apenas <strong>cookies essenciais</strong>, para:
                                </p>
                                <ul className="topic-list">
                                    <li>Manter sessões autenticadas (login)</li>
                                    <li>Armazenar preferências básicas de navegação</li>
                                    <li>Assegurar a estabilidade e a segurança da plataforma</li>
                                </ul>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">5. ARMAZENAMENTO, SEGURANÇA E RETENÇÃO DE DADOS</h3>
                                <ul className="topic-list">
                                    <li>Os dados são armazenados em banco seguro, com criptografia e controle restrito de acesso</li>
                                    <li>Permanecem enquanto o usuário mantiver a conta ativa</li>
                                    <li>Não são compartilhados com terceiros, salvo ordem judicial</li>
                                    <li>Em caso de incidentes de segurança, o usuário e a ANPD serão notificados</li>
                                </ul>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">6. DIREITOS DO TITULAR</h3>
                                <p className="topic-content">
                                    O usuário tem direito a confirmar a existência de tratamento de dados, acessar, corrigir, 
                                    anonimizar, bloquear ou eliminar dados, retirar consentimento ou requerer portabilidade.
                                </p>
                                <p className="topic-contact">
                                    <strong>Solicitações:</strong> cultbridgeoficial@gmail.com
                                </p>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">7. BASE LEGAL</h3>
                                <p className="topic-content">
                                    O tratamento de dados fundamenta-se no consentimento do titular, execução de contrato e 
                                    garantia de prevenção à fraude e segurança.
                                </p>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">8. ALTERAÇÕES DESTA POLÍTICA</h3>
                                <p className="topic-content">
                                    O Cultbridge poderá atualizar esta Política de Privacidade a qualquer momento, com aviso no site.
                                </p>
                            </div>

                            <div className="topic-item">
                                <h3 className="topic-title">9. CONTATO</h3>
                                <p className="topic-content">
                                    Para dúvidas ou solicitações relacionadas à proteção de dados: <strong>cultbridgeoficial@gmail.com</strong>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Termos de Uso */}
                    <section className="politica-section">
                        <div className="section-header">
                            <span className="section-icon">⚖️</span>
                            <h2 className="section-title">TERMOS DE USO – CULTBRIDGE</h2>
                        </div>
                        
                        <div className="text-content">
                            <p>
                                O Cultbridge é uma plataforma voltada à difusão cultural, oferecendo informações e avaliações 
                                sobre filmes, bem como espaços de interação entre usuários por meio de comunidades culturais.
                            </p>
                            <p>
                                Para usufruir de funcionalidades, o usuário deve se cadastrar com nome, data de nascimento, 
                                e-mail e senha, declarando ser maior de 18 anos ou possuir autorização dos responsáveis legais.
                            </p>
                            <p>
                                <strong>É proibido</strong> publicar conteúdo ofensivo ou ilegal, praticar spam, violar direitos 
                                autorais ou tentar acessar dados ou áreas restritas da plataforma.
                            </p>
                            <p>
                                O design, a estrutura, os textos e a identidade visual do Cultbridge são de propriedade exclusiva 
                                dos desenvolvedores, sendo proibida reprodução sem autorização.
                            </p>
                            <p>
                                O Cultbridge não se responsabiliza por conteúdos externos ou informações de terceiros. A plataforma 
                                limita-se à exibição informativa de filmes. Dados poderão ser fornecidos às autoridades mediante 
                                solicitação formal.
                            </p>
                            <p>
                                O usuário pode solicitar encerramento da conta a qualquer momento pelo e-mail <strong>cultbridgeoficial@gmail.com</strong>.
                            </p>
                        </div>
                    </section>

                    {/* Política de Cookies */}
                    <section className="politica-section">
                        <div className="section-header">
                            <span className="section-icon">🍪</span>
                            <h2 className="section-title">POLÍTICA DE COOKIES – CULTBRIDGE</h2>
                        </div>
                        
                        <div className="text-content">
                            <p>
                                O Cultbridge utiliza apenas <strong>cookies essenciais</strong>, necessários para:
                            </p>
                            <ul className="topic-list">
                                <li>Manter o login ativo</li>
                                <li>Garantir segurança e integridade das sessões</li>
                                <li>Otimizar o desempenho do site</li>
                            </ul>
                            <p>
                                <strong>Não são utilizados</strong> cookies de publicidade, rastreamento de terceiros ou marketing. 
                                O usuário pode desativar cookies, ciente de que isso pode afetar algumas funcionalidades.
                            </p>
                        </div>
                    </section>

                    {/* Rodapé do Documento */}
                    <div className="document-footer">
                        <p className="footer-text">
                            📜 Documento elaborado em conformidade com a Lei nº 13.709/2018 (LGPD).<br/>
                            <strong>Controlador:</strong> Cultbridge – https://cultbridge.com<br/>
                            <strong>Contato:</strong> cultbridgeoficial@gmail.com
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}