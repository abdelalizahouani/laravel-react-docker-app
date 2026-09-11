import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../services/api"

export default function EditProduct(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        description:"",
        price: "",
        stock: "",
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    useEffect(()=>{
        const getProduct = async ()=>{
            try{
                const response =await api.get(`/products/${id}`) 
                console.log('PRODUCT :',response.data)
                const product = response.data.product;
                setForm({
                    name: product.name,
                    description: product.description ?? "",
                    price: product.price,
                    stock: product.stock
                });
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        getProduct();    
    },[id])

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    };

    const handeleSubmit = async (e)=>{
        e.preventDefault();
        setSaving(true)
        try{
            const response = await api.put(`/products/${id}`,form)
            console.log("UPDATED :",response.data)
            navigate('/products');
        }catch(error){
            console.error(error)
        }finally{
            setSaving(false)
        }
    };
    if(loading){
        return <p>Loading...</p>
    }
    return <>
        <h1>Edit Product</h1>
        <form onSubmit={handeleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange}/>
            <textarea name="description" value={form.description} onChange={handleChange}/>
            <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
            />
            <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
            />
            <button type="submit" disabled={saving}>
                {saving ?"Updating...":"Update"}
            </button>
        </form>
    </>
}