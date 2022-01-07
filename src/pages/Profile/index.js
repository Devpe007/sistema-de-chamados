import React from "react";

import './index.css';

import { FiSettings } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';

function Profile() {
    return (
        <div>
            <Header />

            <div className="content" >
                <Title name="Meu Perfil" >
                    <FiSettings size={25} />
                </Title>
            </div>
        </div>
    );
};

export default Profile;