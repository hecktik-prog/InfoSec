import React, { useEffect } from 'react'
import {Container, Card, Form, Button} from 'react-bootstrap'
import QrCode from 'react-qr-code'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { submitCode } from '../redux/features/auth/authSlice'

export const VerificationPage = () => {

    const [code, setCode] = useState('')
    const {submitted} = useSelector((state) => state.auth)
    const submition = useSelector((state) => state.auth.code)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (submitted) {
            navigate('/')
        }
    },[submitted, navigate])

    const handleSubmitCode = () => {
        try {
            dispatch(submitCode({code}))

            setCode('')

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
                <h2 className="m-auto">{'Подтверждение входа'}</h2>
                <Form className="d-flex flex-column mt-3 align-items-center">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите код авторизации..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <div className="mt-3">
                        <QrCode
                            className="mx-auto mt-20"
                            value={submition}
                        />
                    </div>
                </Form>
                <Button
                        className="mt-3"
                        variant={"outline-success"}
                        onClick={handleSubmitCode}
                    >
                        {'Отправить'}
                </Button>
            </Card>
        </Container>
    )
}