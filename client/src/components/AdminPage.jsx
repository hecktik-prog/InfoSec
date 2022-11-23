import React from 'react'
import { useEffect } from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { getAllUsers } from '../redux/features/user/userSlice'

export const AdminPage = () => {
    const dispatch = useDispatch()
    const {users} = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])


    return (
        <Container
            className="justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Row className="flex-column m-3">
                <h2 className="m-auto">{'Вы успешно зашли как администратор'}</h2>
                <h1 className='mt-3 text-left'>{'Пользователи'}</h1>
                {users.map((user, index) =>
                    <Row key={user.id} style={{background:index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        <Col>{user.username}</Col>
                        <Col>{user.email}</Col>
                        <Col>{user.role}</Col>
                    </Row>
                )}
            </Row>
        </Container>
    )
}