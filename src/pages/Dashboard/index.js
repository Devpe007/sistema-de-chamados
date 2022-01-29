import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { format } from 'date-fns';

import './styles.css';

import { 
  FiMessageCircle, 
  FiPlus,
  FiSearch,
  FiEdit2,
} from 'react-icons/fi';

import firebase from "../../connections/firebaseConnection";

import Header from "../../components/Header";
import Title from '../../components/Title';

const listRef = firebase.firestore().collection('calls').orderBy('created', 'desc');

function Dashboard() {
    const [calleds, setCalleds] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const [isEmpty, setIsEmpty] = useState(false);
    
    const [lastDocs, setLastDocs] = useState();

    useEffect(() => {
        loadCalls();

        return () => {
            
        }
    }, []);

    async function loadCalls() {
        await listRef.limit(5)
         .get()
         .then((snapshot) => {
            updateState(snapshot);
         })
         .catch((error) => {
            toast.error('Erro ao carregar chamados!');

            console.log(error);
            setLoadingMore(false);
         });

        setLoading(false);
    };

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty) {
            let list = [];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    subjectMatter: doc.data().subjectMatter,
                    client: doc.data().client,
                    clientId: doc.data().clientId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complement: doc.data().complement,
                });
            });

            // Pegando o ultimo documento buscado;
            const lastDoc = snapshot.docs[snapshot.docs.length -1];

            setCalleds(calleds => [...calleds, ...list]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        };

        setLoadingMore(false);
    };

    return (
        <div>
            <Header />

            <div className="content" >
                <Title name="Atendimentos" >
                    <FiMessageCircle size={25} />
                </Title>

                {calleds.length === 0 ? (
                    <div className="container dashboard" >
                        <span>Nenhum chamado registrado...</span>

                        <Link to="/new" className="new">
                          <FiPlus size={25} color="#fff" />
                          Novo Chamado
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#fff" />
                            Novo chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" >Cliente</th>
                                    <th scope="col" >Assunto</th>
                                    <th scope="col" >Status</th>
                                    <th scope="col" >Cadastrado em</th>
                                    <th scope="col" >#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="client" >Sujeito</td>
                                    <td data-label="subject-matter" >Suporte</td>
                                    <td data-label="status" >
                                        <span 
                                         className="badge" 
                                         style={{ backgroundColor: '#5cb85c' }} 
                                        >
                                          Em aberto
                                        </span>
                                    </td>
                                    <td data-label="register" >20/06/21</td>
                                    <td data-label="#">
                                        <button  className="action" style={{ backgroundColor: '#3583f6' }}>
                                            <FiSearch color="#fff" size={17} />
                                        </button>
                                        <button className="action" style={{ backgroundColor: '#f6a935' }} >
                                            <FiEdit2 color="#fff" size={17} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;