import React, { useState } from 'react'
import { useEffect } from 'react'
import { Col, Container, Row, Form, Dropdown } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { decodeRecord, getAllRecords } from '../redux/features/user/userSlice'

export const ClientPage = () => {
    const [decrypted, setDecrypted] = useState('')
    const dispatch = useDispatch()
    const {records} = useSelector((state) => state.user)
    const {text} = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getAllRecords())

        if (text != null) {
            setDecrypted(text)
        }
    }, [dispatch, text])

    const getChoice = (choice) => {
        dispatch(decodeRecord({id:choice}))
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
        >
            <Row className="flex-column m-3">
                <Row>
                    <Col><h3>Зашифрованный текст</h3></Col>
                    <Col><h3>Мастер-ключи</h3></Col> 
                </Row>
                {records.map((record, index) =>
                    <Row key={record.id} 
                    style={{background:index % 2 === 0 ? 'lightgray' : 'transparent', 
                            padding: 10,
                            maxWidth:1000}}
                >
                        <Col className='text-break'>{record.usertext}</Col>
                        <Col className='text-break'>{record.masterkey.split(' ').join('')}</Col>
                    </Row>
                )}
                <h3>Выберите мастер-ключ:</h3>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant={'secondary'}
                        >
                            {"Выберите номер строки"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {records.map((record,index) =>
                            <Dropdown.Item
                                key={record.id}
                                onClick ={() => getChoice(record.id)}
                            >
                                {`Строка № ${index+1}`}
                            </Dropdown.Item>
                        )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>

                <Form>
                    <Form.Control
                        className="mt-3 mb-5"
                        placeholder="Здесь будет расшифрованный текст..."
                        as="textarea"
                        rows={5}
                        readOnly
                        style={{resize:'none'}}

                        value={decrypted}
                    />
                </Form>
            </Row>
        </Container>
    )
}