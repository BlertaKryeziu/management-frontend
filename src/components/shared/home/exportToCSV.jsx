export const exportToCSV = (orders) => {
    if (orders.length === 0) return;

    const csvRows = [];
    const headers = ["Table Number", "Waiter", "Items", "Status"];
    csvRows.push(headers.join(","));

    orders.forEach(order => {
        const row = [
            order.table_number,
            order.waiter,
            `"${order.items}"`,
            order.status,
        ];
        csvRows.push(row.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "orders.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};