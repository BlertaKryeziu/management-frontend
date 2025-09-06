import React, {useState} from "react";
import { useEffect } from "react";

export default function OrderLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8095/api/orderLogs")
        .then(res => res.json())
        .then(data => setLogs(data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Order Logs - MongoDB</h2>
            <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px"}}>
            <ul>
                {logs.map(log => (
                    <li key={log._id}>
                        {log.table_number} - {log.waiter} - {log.items} - {log.status} - {new Date(log.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}