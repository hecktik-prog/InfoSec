import React from 'react'
import { useState } from 'react'
import { Container, Row, Form, Card, Button } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { clearMsg, encodeRecord } from '../redux/features/user/userSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const MasterPage = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const {msg} = useSelector((state) => state.user)

    const handleSubmit = () => {
        dispatch(encodeRecord({text:text}))
    }

    useEffect(() => {
        if (msg) {
            toast(msg)
            clearMsg()
        }
    }, [msg])

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{'Введите текст для шифрования'}</h2>
                <Form className="d-flex flex-column">
                <Form.Control
                        className="mt-3"
                        placeholder="Ваш текст..."
                        as="textarea"
                        rows={5}
                        style={{resize:'none'}}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Row className="d-flex justify-content-end mt-3 pl-3 pr-3">
                        <Button
                            variant={"outline-success"}
                            onClick={handleSubmit}
                        >
                            {'Зашифровать'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}