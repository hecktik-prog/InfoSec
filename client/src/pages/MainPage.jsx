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
    let main_element

    //если пользователь не прошел 2FA, то переход на авторизацию
    useEffect(() => {
        if (!submitted) {
            navigate('/login')
        }
    }, [submitted,navigate])

    switch (role) {
        case 'USER':
            main_element = <UserPage/>
            break
        
        case 'ADMIN':
            main_element = <AdminPage/>
            break

        case 'CLIENT':
            main_element = <ClientPage/>
            break

        case 'MASTER':
            main_element = <MasterPage/>
            break

        default:
            break
    }

    return (
        <div>
            {main_element}
        </div>
    )
}