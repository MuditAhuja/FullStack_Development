import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentView from './StudentView';
import AdminView from './AdminView';

const Dashboard = () => {
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div>
            <div className="navbar">
                <h2>Academic Portal</h2>
                <div>
                    <span style={{ marginRight: '20px' }}>Welcome, {name} ({role})</span>
                    <button className="btn-danger" onClick={handleLogout} style={{ marginTop: 0 }}>Logout</button>
                </div>
            </div>
            
            <div className="container">
                {role === 'ROLE_ADMIN' || role === 'ADMIN' ? <AdminView /> : <StudentView />}
            </div>
        </div>
    );
};

export default Dashboard;
