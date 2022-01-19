import React, { useState } from "react";
import { toast } from 'react-toastify';

import './styles.css';

import { FiUser } from 'react-icons/fi';

import firebase from '../../connections/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

function Customers() {
    const [copanyName, setCompanyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [adress, setAdress] = useState('');

    async function handleAdd(event) {
        event.preventDefault();
        
        if(copanyName !== '' && cnpj !== '' && adress !== '') {
            await firebase.firestore().collection('customers')
             .add({
                copanyName: copanyName,
                cnpj: cnpj,
                addres: adress,
             })
             .then(() => {
                setCompanyName('');
                setCnpj('');
                setAdress('');
            
                toast.info('Empresa cadastrada com sucesso!');
             })
             .catch((error) => {
                toast.error('Erro ao finalizar o cadastro!');
             });
        } else {
            toast.error('Preecha todos os campos!');
        };
    };

    return (
        <div>
            <Header />

            <div className="content" >
                <Title name="Clientes" >
                    <FiUser size={25} />
                </Title>

                <div className="container" >
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome fantasia</label>
                        <input type="text"
                         placeholder="Nome da sua empresa"
                         value={copanyName} 
                         onChange={(e) => setCompanyName(e.target.value)} 
                        />

                        <label>CNPJ</label>
                        <input type="text"
                         placeholder="Seu CNPJ"
                         value={cnpj} 
                         onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label>Endereço</label>
                        <input type="text"
                         placeholder="Endereço da empresa"
                         value={adress}
                         onChange={(e) => setAdress(e.target.value)}
                        />

                        <button type="submit" >Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Customers;