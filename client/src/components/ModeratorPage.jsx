import React from 'react'
import {Container} from 'react-bootstrap'

export const ModeratorPage = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
           <h2 className="m-auto">{'Вы успешно зашли как модератор'}</h2>
        </Container>
    )
}