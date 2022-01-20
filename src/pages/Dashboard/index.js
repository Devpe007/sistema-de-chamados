import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './styles.css';

import { FiMessageCircle, FiPlus } from 'react-icons/fi';

import Header from "../../components/Header";
import Title from '../../components/Title';

function Dashboard() {
    const [calleds, setCalleds] = useState([]);

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
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;