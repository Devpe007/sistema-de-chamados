import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import './styles.css';

import { FiPlusCircle } from 'react-icons/fi';

import firebase from "../../connections/firebaseConnection";

import Header from '../../components/Header';
import Title from '../../components/Title';

import { AuthContext } from '../../contexts/auth';

function New() {
    const { user } = useContext(AuthContext);

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [subjectMatter, setSubjectMatter] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complement, setComplement] = useState('');

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
             .get()
             .then((snapshot) => {
                let list = [];
                
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        copanyName: doc.data().copanyName,
                    });
                });

                if(list.length === 0) {
                    toast.warn('Nenhuma empresa encontrada!');
                    setCustomers([ { id: '1', copanyName: '' } ]);
                    setLoadCustomers(false);

                    return;
                };

                setCustomers(list);
                setLoadCustomers(false);
             })
             .catch((error) => {
                toast.error(error);
                setLoadCustomers(false);
                setCustomers([ { id: '1', copanyName: '' } ]);
             });
        };

        loadCustomers();
    }, []);

    async function handleRegister(event) {
        event.preventDefault();
        
        await firebase.firestore().collection('calls')
         .add({
            created: new Date(),
            client: customers[customerSelected].copanyName,
            clientId: customers[customerSelected].id,
            subjectMatter: subjectMatter,
            status: status,
            complement: complement,
            userId: user,
         })
         .then(() => {
            toast.success('Chamado registrado com sucesso!');
            setComplement('');
            setCustomerSelected(0);
         })
         .catch((error) => {
            toast.error('Ops, erro ao registrar, tente novamente agora ou mais tarde!');
            console.log(error);
         });
    };

    // Chama quando troca o assunto;
    function handleChangeSelect(event) {
        setSubjectMatter(event.target.value);
    };

    // Chama quando troca o status;
    function handleOptionChange(event) {
        setStatus(event.target.value);
    };

    // Chamado quando troca de clienteq
    function handleChangeCustomers(event) {
        setCustomerSelected(event.target.value);
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

                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Carregando clientes..." />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers} >
                                {customers.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.copanyName}
                                        </option>
                                    )
                                })}
                            </select>
                        )}

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