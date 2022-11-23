import React, { useEffect } from 'react'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Container, Card, Form, Row, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { clearError, registerUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {status, error} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
        if (status) {
            navigate('/registration/verification')
        }
    },[status, navigate, dispatch, error])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({username,email,password}))

            setUsername('')
            setEmail('')
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
                <h2 className="m-auto">{'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш username..."
                        value={username}
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
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
                            Есть аккаунт? <Link to='/login'>Войдите!</Link>
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={handleSubmit}
                        >
                            {'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    )
}