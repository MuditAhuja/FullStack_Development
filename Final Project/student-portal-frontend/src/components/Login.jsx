import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const Login = () => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await api.login(studentId, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('name', data.name);
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Invalid Student ID or Password');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
            <div className="card text-center">
                <h2 className="primary-text" style={{ marginBottom: '20px' }}>Student Portal Login</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Student ID / Admin Username" 
                        value={studentId} 
                        onChange={(e) => setStudentId(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" style={{ width: '100%' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
