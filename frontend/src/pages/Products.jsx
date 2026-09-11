import { useEffect, useState } from "react"
import { api } from "../services/api";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Product(){
    const [products, setProduct] = useState([]);
    const navigate = useNavigate()
    const { hasPermission, roles  } = useAuth()
    //console.log("PRODUIT PERMISSIONS :", permissions)
    useEffect(()=>{
        
        const getProducts = async ()=>{
            try{
                //console.log('TOKEN:',localStorage.getItem('token'))
                const response = await api.get("/products")
                
                setProduct(response.data.products)
                //console.log('PRODUCT :',response.data.products)
                //console.log("PRODUIT PERMISSIONS :", permissions)
            }catch(error){
                console.error(error);
            }
            
        }
        getProducts();
    },[])
    const handleDelete = async (id) =>{
        try{
            const response = await api.delete(`/products/${id}`)
            console.log('DELETE :',response.data)
            setProduct(products.filter((product)=>product.id !== id))
        }catch(error){
            console.error(error)
        }
    };
    return <>
        <div>
            <h1>Role :{roles}</h1>
            <h1>Products</h1>
            {hasPermission("products.create") && (
                <button onClick={() => navigate("/products/create")}>
                    Create Product
                </button>
            )}
            { products.map((product)=> (
            <div key={product.id}>
                <h3>{product.name}</h3>
                <p>Id :{product.id}</p>
                <p>{product.description}</p>
                <p>{product.price} DH</p>
                <p>Stock: {product.stock}</p>
                {hasPermission("products.delete") && (
                    <button onClick={()=>handleDelete(product.id)}>Delete</button>
                )}
                {hasPermission("products.update") && (
                    <button onClick={()=>navigate(`/products/${product.id}/edit`)}>
                        Update
                    </button>
                )}
            </div>
            )) }

        </div>
    
    </>
}