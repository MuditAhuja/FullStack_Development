import React, { useEffect, useState } from 'react';
import { api } from '../api';

const StudentView = () => {
    const [results, setResults] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [resData, annData, timeData] = await Promise.all([
                api.getResults(),
                api.getAnnouncements(),
                api.getTimetable()
            ]);
            setResults(resData);
            setAnnouncements(annData);
            setTimetable(timeData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <div className="card mt-20">
                <h3 className="primary-text">Announcements</h3>
                {announcements.length === 0 ? <p>No new announcements.</p> : (
                    <ul>
                        {announcements.map(a => (
                            <li key={a.id} style={{ marginBottom: '10px' }}>
                                <strong>[{a.category}] {a.title}</strong> - {new Date(a.createdAt).toLocaleDateString()}
                                <p>{a.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex mt-20">
                <div className="card flex-1">
                    <h3 className="primary-text">My Results</h3>
                    {results.length === 0 ? <p>No results available.</p> : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th>Grade</th>
                                    <th>GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.semester}</td>
                                        <td>{r.subject}</td>
                                        <td>{r.marks}</td>
                                        <td>{r.grade}</td>
                                        <td>{r.gpa}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <button className="mt-20" onClick={() => window.print()}>Download Provisional Marksheet</button>
                </div>

                <div className="card flex-1">
                    <h3 className="primary-text">Weekly Timetable</h3>
                    {timetable.length === 0 ? <p>No classes scheduled.</p> : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Subject</th>
                                    <th>Room</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.map(t => (
                                    <tr key={t.id}>
                                        <td>{t.dayOfWeek}</td>
                                        <td>{t.startTime} - {t.endTime}</td>
                                        <td>{t.subject}</td>
                                        <td>{t.roomNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentView;
