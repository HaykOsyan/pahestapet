import { $host, $authHost } from ".";

export const createClient = async(name,phone,type) => {
    const {data} = await $authHost.post('api/client',{'name': name, 'phone':phone, 'type':type})
    return data
}

export const fetchClients = async () => {
    const {data} = await $host.get('api/client')
    return data
}