import { $authHost, $host } from ".";
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role:'guest'})
    localStorage.setItem('token', data)
    return jwt_decode(data)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    console.log('LOGIN')
    localStorage.setItem('token', data)
    return jwt_decode(data)
}

export const check = async () => {
    console.log('CHECK')
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data)
    return jwt_decode(data)
}