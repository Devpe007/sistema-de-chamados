import React, { useState } from "react";

import './styles.css';

import { FiPlusCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';

function New() {
    const [subjectMatter, setSubjectMatter] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complement, setComplement] = useState('');

    function handleRegister(event) {
        event.preventDefault();
        alert('CLICOU');
    };

    // Chama quando troca o assunto;
    function handleChangeSelect(event) {
        setSubjectMatter(event.target.value);
    };

    // Chama quando troca o status;
    function handleOptionChange(event) {
        setStatus(event.target.value);
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
                        <select value={subjectMatter} onChange={handleChangeSelect} >
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
                             onChange={handleOptionChange}
                             checked={ status === 'Aberto' }
                            />

                            <span>Em Aberto</span>

                            <input 
                             type="radio" 
                             name="radio"
                             value="Progresso"
                             onChange={handleOptionChange}
                             checked={ status === 'Progresso' }
                            />

                            <span>Em Progresso...</span>

                            <input 
                             type="radio" 
                             name="radio"
                             value="Atentido"
                             onChange={handleOptionChange}
                             checked={ status === 'Atentido' }
                            />

                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea 
                         type="text"
                         placeholder="Descreva seu problema (opcional)."
                         value={complement}
                         onChange={(event) => setComplement(event.target.value)}
                        />

                        <button type="submit" >Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default New;