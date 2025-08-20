import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Order()  {
  const [orders, setOrders] = useState([])
  const [newOrder, setNewOrder] = useState({
    table:"",
    waiter:"",
    items:"",
    status:"Pending"
  })  

  const addOrder = () =>{
    setOrders([...orders, {...newOrder, id: Date.now() }])
    setNewOrder({ table:"", waiter: "", items: "", status: "Pending"})
  }


  return (
    <div className='p-6'>
        <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>Orders</h1>


            <Dialog>
                <DialogTrigger asChild>
                    <Button>+ Add Order</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Order</DialogTitle>
                    </DialogHeader>


                    <div className='space-y-3'>
                        <Input
                        placeholder="Table number"
                        value={newOrder.table}
                        onChange={(e) => setNewOrder({...newOrder, table: e.target.value })}/>


                        <Input
                        placeholder="Waiter Name"
                        value={newOrder.waiter}
                        onChange={(e) => setNewOrder({...newOrder, waiter: e.target.value })}/>


                        <Input
                        placeholder="Items"
                        value={newOrder.items}
                        onChange={(e) => setNewOrder({...newOrder, items: e.target.value })}/>

                        <Button onClick={addOrder}>Save Order</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>


        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Waiter</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.table}</TableCell>
                        <TableCell>{order.waiter}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.status}</TableCell>
                    </TableRow>

                ))}
            </TableBody>
        </Table>
    </div>
  )
}
