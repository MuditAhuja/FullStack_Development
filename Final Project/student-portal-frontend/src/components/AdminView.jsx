import React, { useState, useEffect } from 'react';
import { api } from '../api';

const AdminView = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [announcementMsg, setAnnouncementMsg] = useState('');
    const [announcements, setAnnouncements] = useState([]);

    const [students, setStudents] = useState([]);
    
    // New Student State
    const [newStudentId, setNewStudentId] = useState('');
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentPassword, setNewStudentPassword] = useState('');
    const [studentMsg, setStudentMsg] = useState('');

    // New Result State
    const [selectedStudent, setSelectedStudent] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');
    const [grade, setGrade] = useState('');
    const [gpa, setGpa] = useState('');
    const [resultMsg, setResultMsg] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [annData, stdData] = await Promise.all([
                api.getAnnouncements(),
                api.getStudents()
            ]);
            setAnnouncements(annData);
            setStudents(stdData);
            if (stdData.length > 0) setSelectedStudent(stdData[0].id);
        } catch (err) {
            console.error("Failed to load admin data", err);
        }
    };

    const handlePostAnnouncement = async (e) => {
        e.preventDefault();
        try {
            await api.postAnnouncement({ title, content, category });
            setAnnouncementMsg('Announcement posted successfully!');
            setTitle('');
            setContent('');
            loadData();
        } catch (err) {
            setAnnouncementMsg('Error posting announcement');
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            await api.createStudent({ studentId: newStudentId, name: newStudentName, password: newStudentPassword });
            setStudentMsg('Student added successfully!');
            setNewStudentId('');
            setNewStudentName('');
            setNewStudentPassword('');
            loadData();
        } catch (err) {
            setStudentMsg('Error adding student. Make sure Student ID is unique.');
        }
    };

    const handleAddResult = async (e) => {
        e.preventDefault();
        try {
            await api.addResult(selectedStudent, { semester, subject, marks, grade, gpa });
            setResultMsg('Result added successfully!');
            setSubject('');
            setMarks('');
            setGrade('');
            setGpa('');
        } catch (err) {
            setResultMsg('Error adding result.');
        }
    };

    return (
        <div>
            <div className="flex mt-20">
                {/* Announcements Section */}
                <div className="card flex-1">
                    <h3 className="primary-text">Post New Announcement</h3>
                    {announcementMsg && <div style={{ color: 'green', margin: '10px 0' }}>{announcementMsg}</div>}
                    <form onSubmit={handlePostAnnouncement}>
                        <input type="text" placeholder="Announcement Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="General">General</option>
                            <option value="Exam">Exam</option>
                            <option value="Holiday">Holiday</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                        <textarea rows="3" placeholder="Announcement details..." value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                        <button type="submit">Post Announcement</button>
                    </form>
                </div>

                {/* Add Student Section */}
                <div className="card flex-1">
                    <h3 className="primary-text">Add New Student</h3>
                    {studentMsg && <div style={{ color: studentMsg.includes('Error') ? 'red' : 'green', margin: '10px 0' }}>{studentMsg}</div>}
                    <form onSubmit={handleAddStudent}>
                        <input type="text" placeholder="Student ID (e.g. S12346)" value={newStudentId} onChange={(e) => setNewStudentId(e.target.value)} required />
                        <input type="text" placeholder="Full Name" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} required />
                        <input type="password" placeholder="Temporary Password" value={newStudentPassword} onChange={(e) => setNewStudentPassword(e.target.value)} required />
                        <button type="submit">Register Student</button>
                    </form>
                </div>
            </div>

            {/* Add Result Section */}
            <div className="card mt-20">
                <h3 className="primary-text">Upload Marks / Add Result</h3>
                {resultMsg && <div style={{ color: resultMsg.includes('Error') ? 'red' : 'green', margin: '10px 0' }}>{resultMsg}</div>}
                <form onSubmit={handleAddResult} className="flex" style={{ flexWrap: 'wrap' }}>
                    <div className="flex-1">
                        <label>Select Student:</label>
                        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} required>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.studentId})</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label>Semester:</label>
                        <input type="text" placeholder="e.g. Fall 2026" value={semester} onChange={(e) => setSemester(e.target.value)} required />
                    </div>
                    <div className="flex-1">
                        <label>Subject:</label>
                        <input type="text" placeholder="e.g. Data Structures" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                    </div>
                    <div className="flex-1">
                        <label>Marks:</label>
                        <input type="number" placeholder="0-100" value={marks} onChange={(e) => setMarks(e.target.value)} required />
                    </div>
                    <div className="flex-1">
                        <label>Grade:</label>
                        <input type="text" placeholder="e.g. A+" value={grade} onChange={(e) => setGrade(e.target.value)} required />
                    </div>
                    <div className="flex-1">
                        <label>GPA:</label>
                        <input type="number" step="0.1" placeholder="e.g. 9.5" value={gpa} onChange={(e) => setGpa(e.target.value)} required />
                    </div>
                    <div style={{ width: '100%' }}>
                        <button type="submit">Upload Result</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminView;
