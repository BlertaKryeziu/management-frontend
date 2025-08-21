import BottomNav from '@/components/shared/BootomNav'; 
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const TablesPage = () => {

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  // per create
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("available");
  const [room, setRoom] = useState("family");

  // per edit
  const [editOpen, setEditOpen] = useState(false);
  const [editTableId, setEditTableId] = useState(null);
  const [editNumber, setEditNumber] = useState("");
  const [editStatus, setEditStatus] = useState("available");
  const [editRoom, setEditRoom] = useState("family");

  // funksion për me kriju tavolinë
  const createTable = (e) => {
    e.preventDefault()
    const newTable = {
      id: Date.now(),
      number,
      status,
      room
    }
    setTables([...tables, newTable])
    setNumber("")
    setStatus("")
    setRoom("")
  }

  // delete
  const deleteTable = (id) => {
    setTables(tables.filter(t => t.id !== id))
  }

  // open edit dialog
  const openEditDialog = (table) => {
    setEditId(table.id)
    setEditNumber(table.number)
    setEditStatus(table.status)
    setEditRoom(table.room)
    setEditOpen(true)
  }

  // update
  const updateTable = (e) => {
    e.preventDefault()
    setTables(tables.map(t => t.id === editId ? { ...t, number: editNumber, status: editStatus, room: editRoom } : t))
    setEditOpen(false)
  }

  return (
    <div>
        <Card className="w-[350px] ml-8 mt-8">
            <CardHeader>
                <CardTitle>Create Tables</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={createTable}>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor="number">Table Number:</Label>
                            <Input type="number" id="number" placeholder="Number of your table"
                            onChange={(e) => setNumber(e.target.value)}/>
                        </div>

                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor="framework">Status:</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="available">E lire</SelectItem>
                                    <SelectItem value="reserved">E rezervuar</SelectItem>
                                    <SelectItem value="occupied">E zene</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor="framework">Rooms:</Label>
                            <Select value={room} onValueChange={setRoom}>

                                <SelectTrigger id="room">
                                    <SelectValue placeholder="Select"/>
                                </SelectTrigger>
                                <SelectContent position="proper">
                                    <SelectItem value="family">Family Room</SelectItem>
                                    <SelectItem value="vip">VIP Lounge</SelectItem>
                                    <SelectItem value="normal">Garden Room</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <CardFooter className="flex justify-between">
                            <Button>Create</Button>
                        </CardFooter>
                    </div>
                </form>
            </CardContent>
        </Card>


        <h2 className='text-xl mt-8 mb-4 ml-8'>Lista e tavolinave</h2>
        <div className='flex flex-wrap gap-6 ml-8'>
            {tables.map((table) => (
                <div
                key={table.id}
                className={`p-4 rounded-md text-white
                    ${table.status === "available" ? "bg-green-500"
                        : table.status === "reserved" ? "bg-orange-500"
                        : "bg-red-500"}`}>



                            <p>Tavolina {table.number}</p>
                            <p>Statusi {table.status}</p>
                            <p>Rooms {table.room}</p>
                            <div className='mt-2 flex gap-5'>
                                <Button onClick={() => deleteTable(table.id)}>Delete</Button>
                            </div>

                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                <DialogTrigger asChild>
                                    <Button className="mt-2" onClick={() => openEditDialog(table)}>Edit Table</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit Table</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={updateTable} className='grid gap-4 py-4'>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor="editNumber" className="text-right">
                                                Table Number
                                            </Label>
                                            <Input
                                            id="editNumber"
                                            type="number"
                                            value={editNumber}
                                            onChange={(e) => setEditNumber(e.target.value)}
                                            className="col-span-3"/>
                                        </div>
                                        
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editStatus" className="text-right">
                          Status
                 </Label>
            <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger id="editStatus">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="available">E lire</SelectItem>
                  <SelectItem value="reserved">E rezervuar</SelectItem>
                  <SelectItem value="occupied">E zene</SelectItem>
                 </SelectContent>
              </Select>
              </div> 

                 <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="editStatus" className="text-right">
              Rooms
            </Label>
            <Select value={editRoom} onValueChange={setEditRoom}>
                <SelectTrigger id="editRoom">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="family">Family Room</SelectItem>
                  <SelectItem value="vip">VIP Lounge</SelectItem>
                  <SelectItem value="normal">Garden Room</SelectItem>
                 </SelectContent>
              </Select>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
                 </form>
            </DialogContent>
         </Dialog>
        </div>
            ))}
        </div>

        <BottomNav/>
    </div>
  )
}

export default TablesPage