import React, { useContext } from "react";

import { AuthContext } from '../../contexts/auth';

import Header from "../../components/Header";

function Dashboard() {
    const { signOut } = useContext(AuthContext);

    return (
        <div>
            <Header />

            <h1>PAGINA DASHBOARD</h1>
        </div>
    );
};

export default Dashboard;