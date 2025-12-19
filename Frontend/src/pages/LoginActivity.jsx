import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginActivity = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/activity/login");
            setLogs(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching logs:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    if (loading) {
        return <p>Loading logs...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login Activity Logs</h2>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Activity</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>No activity found</td>
                        </tr>
                    ) : (
                        logs.map((log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.user_id}</td>
                                <td>{log.email}</td>
                                <td>{log.activity}</td>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LoginActivity;
