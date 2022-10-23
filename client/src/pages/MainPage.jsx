import React from 'react'
import { AdminPage } from '../components/AdminPage'
import { ModeratorPage } from '../components/ModeratorPage'
import { UserPage } from '../components/UserPage'

export const MainPage = () => {
    const role = 'MODER'
    const main_element = role === 'USER'? <UserPage/> :
    (role === 'ADMIN'? <AdminPage/> : <ModeratorPage/>)

    return (
        <div>
            {main_element}
        </div>
    )
}