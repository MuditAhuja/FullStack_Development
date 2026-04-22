const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

export const api = {
    login: async (studentId, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, password })
        });
        if (!response.ok) throw new Error('Invalid credentials');
        return response.json();
    },

    getResults: async () => {
        const response = await fetch(`${API_BASE_URL}/student/results`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch results');
        return response.json();
    },

    getAnnouncements: async () => {
        const response = await fetch(`${API_BASE_URL}/student/announcements`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch announcements');
        return response.json();
    },

    getTimetable: async () => {
        const response = await fetch(`${API_BASE_URL}/student/timetable`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch timetable');
        return response.json();
    },

    postAnnouncement: async (announcement) => {
        const response = await fetch(`${API_BASE_URL}/admin/announcements`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(announcement)
        });
        if (!response.ok) throw new Error('Failed to post announcement');
        return response.json();
    },

    getStudents: async () => {
        const response = await fetch(`${API_BASE_URL}/admin/students`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch students');
        return response.json();
    },

    createStudent: async (student) => {
        const response = await fetch(`${API_BASE_URL}/admin/students`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(student)
        });
        if (!response.ok) throw new Error('Failed to create student');
        return response.json();
    },

    addResult: async (studentId, result) => {
        const response = await fetch(`${API_BASE_URL}/admin/students/${studentId}/results`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(result)
        });
        if (!response.ok) throw new Error('Failed to add result');
        return response.json();
    }
};
