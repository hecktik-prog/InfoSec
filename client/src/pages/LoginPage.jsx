import React, { useEffect } from 'react'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Card, Form, Row, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/features/auth/authSlice'


export const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {status} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status) {
            navigate('/verification')
        }
    },[status, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({username, password}))

            setUsername('')
            setPassword('')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{'Авторизация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш username..."
                        value={username}
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            Нет аккаунта? <Link to='/registration'>Зарегистрируйтесь!</Link>
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={handleSubmit}
                        >
                            {'Войти'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    )
}