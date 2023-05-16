import { $host, $authHost } from ".";

export const createCartProduct = async (cartId, productIds, quantities) => {
    const {data} = await $host.post('api/cart_product', {'cartId':cartId,'productIds':productIds, 'quantities':quantities})
    return data
}

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', {'name': category})
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data.categories
}

export const fetchOneCategory = async (id) => {
    const {data} = await $host.get('api/category/' + id)
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand',{'name': brand})
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createColor = async (color) => {
    const {data} = await $authHost.post('api/color',{'name': color})
    return data
}

export const fetchColors = async () => {
    const {data} = await $host.get('api/color')
    return data
}

// export const fetchOneDifficulty = async (id) => {
//     const {data} = await $host.get('api/difficulty/' + id)
//     return data
// }

// export const deleteDifficulty = async (id) => {
//     const {data} = await $authHost.delete('api/difficulty/' + id)
//     return data
// }

export const fetchProducts = async (page) => {
    const {data} = await $host.get('api/product',{params:{page}})
    return data
}

export const fetchOneProduct = async (id) => {
    const data = await $host.get('api/product/' + id)
    return data
}

export const fetchCarts = async () => {
    const {data} = await $host.get('api/cart')
    return data
}

export const fetchOneCart = async (id) => {
    const {data} = await $host.get('api/cart/' +id)
    return data
}

export const createOrder = async (cartId, productIds, quantities) => {
    const {data} = await $authHost.post('api/order',{'cartId':cartId,'productIds':productIds, 'quantities':quantities})
    return data
}

export const fetchOrders = async () => {
    const {data} = await $host.get('api/order')
    return data
}

export const fetchOneOrder = async (id) => {
    const data = await $host.get('api/order/' + id)
    return data
}

export const fetchOrderProducts = async () => {
    const {data} = await $host.get('api/order_product')
    return data
}

export const fetchCartProducts = async () => {
    const {data} = await $host.get('api/cart_product')
    return data
}
export const fetchOneCartProducts = async (cartId) => {
    const data = await $host.get('api/cart_product/cart' + cartId)
    console.log(data)
    return data
}



// authHost CHEKLCK DZEL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! UPGRADE
export const createProduct = async (product) => {
    const {data} = await $host.post('api/product',product,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    return data
}