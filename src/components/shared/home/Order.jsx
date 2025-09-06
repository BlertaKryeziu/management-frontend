import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const socket = io("http://localhost:8095");

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({
    table_number: "",
    waiter: "",
    items: [],
    status: "Pending",
  });

  //fetch orders dhe socket
  useEffect(() => {
    fetchOrders();
    fetchWaiters();
    fetchProducts();

    socket.on("newOrder", (order) => setOrders(prev => [order, ...prev]));
    socket.on("updateOrder", (updatedOrder) => setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o)));
    socket.on("deleteOrder", ({id}) => setOrders(prev => prev.filter(o => o.id !== id)));

    return () => socket.off("newOrder").off("updateOrder").off("deleteOrder");
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:8095/api/orders");
    setOrders(res.data);
  };

  const fetchWaiters = async () => {
    const res = await axios.get("http://localhost:8095/api/waiter");
    setWaiters(res.data.map(w => w.name));
  };

  const fetchProducts = async() => {
    const res = await axios.get("http://localhost:8095/api/products");
    setProducts(res.data.map(p => p.name));
  };

  const addOrder = async() => {
    if (!newOrder.waiter || newOrder.items.length === 0 || !newOrder.table_number){
      alert("Ploteso te gjitha fushat!");
      return;
    }

    await axios.post("http://localhost:8095/api/orders", {
      ...newOrder,
      items: newOrder.items.join(",")
    });

    setNewOrder({ table_number: "", waiter: "", items: [], status: "Pending"});
  };

  const handleEdit = async(id) => {
    const newStatus = prompt("Vendos statusin e ri (Pending / Done / Cancelled) : ");
    if(!newStatus) return;
    await axios.put(`http://localhost:8095/api/orders/${id}`, {status : newStatus});
    fetchOrders();
  };

  const handleDelete = async(id) => {
    if(!confirm("A je i sigurt qe doni ta fshini kete porosi?")) return;
    await axios.delete(`http://localhost:8095/api/orders/${id}`);
    fetchOrders();
  };

  //Toggle item
  const toggleItem = (item) => {
    setNewOrder(prev => {
      if (prev.items.includes(item)) {
        return {...prev, items: prev.items.filter(i => i !== item)};
      } else {
        return {...prev, items: [...prev.items, item]};
      }
    });
  };

  return(
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="mb-6 flex flex-col gap-2 max-w-md">
        <Input
        placeholder="Table number"
        value={newOrder.table_number}
        onChange={e => setNewOrder({...newOrder, table_number: e.target.value})}
        />

        {/*dropdown waiter */}
        <select
        value={newOrder.waiter}
        onChange={e => setNewOrder({...newOrder, waiter: e.target.value})}
        className="p-2 border rounded">

    <option value="">Zgjidh Waiter</option>
    {waiters.map(w => <option key={w} value={w}>{w}</option>)}
        </select>

        
        {/*items select */}
        <div className="flex flex-wrap gap-2">
          {products.map(p => (
            <button
            key={p}
            onClick={() => toggleItem(p)}
            className={`px-3 py-1 border rounded 
              ${newOrder.items.includes(p) ? "bg-blue-500 text-white" : "bg-white"}`}
              >{p}
              </button>
          ))}
        </div>

        <Button onClick={addOrder} className="mt-2 bg-green-500 text-white">Add Order</Button>
      </div>


<div className="max-h-[200px] overflow-y-auto border rounded">
  <Table>
    <TableHeader className="bg-gray-200 sticky top-0 z-10"> 
      <TableRow>
        <TableHead>Table</TableHead>
        <TableHead>Waiter</TableHead>
        <TableHead>Items</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {orders.map(order => (
        <TableRow key={order.id}>
            <TableCell>{order.table_number}</TableCell>
            <TableCell>{order.waiter}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell className="flex gap-2">
              <Button size="sm" className="bg-blue-500 text-white" onClick={() => handleEdit(order.id)}>Edit</Button>
              <Button size="sm" className="bg-red-500 text-white" onClick={() => handleDelete(order.id)}>Delete</Button>
            </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

    </div>
  );
}