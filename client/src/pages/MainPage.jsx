import React from 'react'
import { AdminPage } from '../components/AdminPage'
import { UserPage } from '../components/UserPage'
import { ClientPage } from '../components/ClientPage'
import { MasterPage } from '../components/MasterPage'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const MainPage = () => {
    const {submitted, role} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    //если пользователь не прошел 2FA, то переход на авторизацию
    useEffect(() => {
        if (!submitted) {
            navigate('/login')
        }
    }, [submitted,navigate])

    const main_element = (role === 'USER') ? <UserPage/> : ((role === 'ADMIN') ? <AdminPage/> : 
    ((role === 'CLIENT') ? <ClientPage/>: <MasterPage/>))

    return (
        <div>
            {main_element}
        </div>
    )
}