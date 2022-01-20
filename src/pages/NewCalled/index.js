import React from "react";

import './styles.css';

import { FiPlusCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';

function newCalled() {
    function handleRegister(event) {
        event.preventDefault();
        alert('CLICOU');
    };

    return (
        <div>
            <Header />

            <div className="content" >
                <Title name="Novo chamado" >
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container" >
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Cliente</label>
                        <select>
                            <option key={1} value={1}>
                                Sujeito Programador
                            </option>
                        </select>

                        <label>Assunto</label>
                        <select>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status" >
                            <input 
                             type="radio" 
                             name="radio"
                             value="Aberto"
                            />

                            <span>Em Aberto</span>

                            <input 
                             type="radio" 
                             name="radio"
                             value="Progresso"
                            />

                            <span>Em Progresso...</span>

                            <input 
                             type="radio" 
                             name="radio"
                             value="Atentido"
                            />

                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea 
                         type="text"
                         placeholder="Descreva seu problema (opcional)."
                        />

                        <button type="submit" >Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default newCalled;