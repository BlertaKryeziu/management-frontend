import React, { useEffect, useState } from 'react'
import BottomNav from '@/components/shared/BootomNav';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import  { Label } from "@/components/ui/label"
import { Pencil, Plus, Trash, Trash2 } from 'lucide-react';


const Products = () => {
    const [Products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", image:"", price:""})
    const [editId, setEditId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:8095/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.log("Gabim gjate ngarkimit te produkteve:", error.message);
            }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? "PUT" : "POST";
        const url = editId
        ? `http://localhost:8095/api/products/update/${editId}`
        :  `http://localhost:8095/api/products/create`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if(!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Gabim gjate ruajtjes.");
            }

            setForm({ name: "", image: "", price: ""});
            setEditId(null);
            setDialogOpen(false);
            fetchProducts();
        } catch (error) {
            console.log("Gabim gjate ruajtjes:", error.message);
            
        }
    };

    const handleEdit = (product) => {
        setForm({ name: product.name, image: product.image, price: product.price || ""});
        setEditId(product.id);
        setDialogOpen(true);
    };


    const handleDelete = async (id) => {
        const confirm = window.confirm("A jeni i sigurt qe deshironi ta fshini?");
        if(!confirm) return;

        try {
            const res = await fetch(`http://localhost:8095/api/products/delete/${id}`, {
                method: "DELETE",
            });

            if(!res.ok) throw new Error("Gabim gjate fshirjes.");
            fetchProducts();
        } catch (error) {
            console.error("Gabim gjate fshirjes:", error.message);
        }
    };


  return (
<>
 <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogTrigger asChild>
    <Button variant="outline" className="bg-gray-300 mt-8">Create Porducts<Plus className="ml-2"/></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{editId ? "Update Product": "Create Product"}</DialogTitle>
    </DialogHeader>

    <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor="name" className="text-right">
                Name
            </Label>
            <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            className="col-span-3"
            required/>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor="name" className="text-right">
                Image Url
            </Label>
            <Input
            id="image"
            value={form.image}
            onChange={(e) => setForm({...form, image: e.target.value})}
            className="col-span-3"
            required/>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor="name" className="text-right">
                Price
            </Label>
            <Input
            id="price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({...form, price: e.target.value})}
            className="col-span-3"
            />
        </div>

        <DialogFooter>
            <Button type="submit">{editId ? "Update" : "Add"}</Button>
        </DialogFooter>
    </form>
  </DialogContent>
</Dialog>




<Table className="bg-amber-50 mt-8">
  <TableCaption>A list of products</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Image</TableHead>
      <TableHead>Price</TableHead>
      <TableHead className="text-center">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {Products.map((product) => (
        <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <img src={product.image} alt={product.name} className='w-14 h-14 object-cover rounded'/>
        </TableCell>


      <TableCell>{product.price ? `${product.price} €` : "0 €"}</TableCell>

      <TableCell className="text-center">
          <div className='flex justify-center gap-2'>
            <Button variant="ghost" onClick={() => handleEdit(product)}>
                <Pencil className='w-5 h-5'/>
            </Button>
            <Button variant="ghost" onClick={() => handleDelete(product.id)}>
                <Trash className='w-5 h-5 text-red-500'/>
            </Button>

          </div>
        </TableCell>

    </TableRow>
     ))}
  </TableBody>
</Table>
<BottomNav/>
</>
  )
}

export default Products