import { useState } from "react"
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProduct(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name :"",
        description: "",
        price: "",
        stock: ""
    });

    const handleChange = (e)=>{
        setForm({
            ...form,[e.target.name] : e.target.value
        })
    }

    const handeleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            const response = await api.post('/products',form) 
            console.log('DATA :',response.data)
            navigate("/products")
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
    return<>
    <div>
        <h1>Create product</h1>
        <form onSubmit={handeleSubmit}>
            <label>Name :</label>
            <input type="text" name="name" placeholder="Product name" value={form.name} onChange={handleChange}/>
            <textarea name="description" placeholder="description" value={form.description} onChange={handleChange}></textarea>
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange}/>
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
            />
            <button type="submit" disabled={loading}>{ loading?"Creating...":"create"}</button>
        </form>
    </div>
    </>
}