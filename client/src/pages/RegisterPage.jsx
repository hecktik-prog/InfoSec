import React from 'react'
import {Container, Card, Form, Row, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
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
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            Есть аккаунт? <Link to='/login'>Войдите!</Link>
                        </div>

                        <Button
                            variant={"outline-success"}
                        >
                            {'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    )
}