import axios from 'axios'
export const api = axios.create({
    baseURL : 'http://localhost:8000/api',
    headers :{
        'Content-Type':'application/json',
        'Accept': 'application/json'
    },
})
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const getCategories = () => {
    return api.get('/categories')
}

export const getDishes = () => {
    return api.get('/dishes')
}
export const getDish = (id) => {
    return api.get(`/dishes/${id}`)
}
export const createDish = (dish) => {
    return api.post("/dishes", dish,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export const updateDish = (id, dish) => {
    return api.post(`/dishes/${id}?_method=PUT`, dish,{
        headers:{
            'Content-type':'multipart/form-data'
        }
    })
}

export const deleteDish = (id) => {
    return api.delete(`/dishes/${id}`)
}

export const createOrder = (orderData) => {
    return api.post('/orders', orderData)
}

export const getOrders = () => {
    return api.get('/orders')
}

export const getMyOrders = () => {
    return api.get('/my-orders')
}

export const getOrder = (id) => {
    return api.get(`/orders/${id}`)
}