import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './styles.css';

import { 
  FiMessageCircle, 
  FiPlus,
  FiSearch,
  FiEdit2,
} from 'react-icons/fi';

import Header from "../../components/Header";
import Title from '../../components/Title';

function Dashboard() {
    const [calleds, setCalleds] = useState([1]);

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