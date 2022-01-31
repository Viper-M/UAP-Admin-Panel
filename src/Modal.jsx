import { Modal, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MyVerticallyCenteredModal({
    show,
    setShow,
    details,
    type,
}) {
    console.log(Object.entries(details))
    const handleClose = () => setShow(false)
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{type} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className='containerDetails'
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '60vh',
                            overflow: 'scroll',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                        }}
                    >
                        {Object.entries(details).map((data) => {
                            console.log(
                                data[0],
                                data[1],
                                typeof data[1] !== 'object'
                            )
                            return (
                                <>
                                    {data[0] !== 'password' &&
                                        data[0] !== 'backgroundUrl' &&
                                        data[0] !== '__v' &&
                                        data[1] !== '' &&
                                        data[0] !== 'jsonHash' &&
                                        data[0] !== 'cloudinaryUrl' && (
                                            <div
                                                className='row'
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                {Array.isArray(data[1]) ? (
                                                    <p
                                                        style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {data[0].toUpperCase()}{' '}
                                                        :-
                                                    </p>
                                                ) : (
                                                    <p
                                                        style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {data[0] === '_id'
                                                            ? 'ID'
                                                            : data[0].toUpperCase()}
                                                    </p>
                                                )}

                                                {Array.isArray(data[1]) ? (
                                                    data[0] === 'tags' ? (
                                                        <ol
                                                            type='1'
                                                            style={{
                                                                marginLeft:
                                                                    '16px',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {data[1].map(
                                                                (data, key) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                key
                                                                            }
                                                                            style={{
                                                                                display:
                                                                                    'flex',
                                                                                alignItems:
                                                                                    'center',
                                                                                justifyContent:
                                                                                    'space-between',
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    flex: 1,
                                                                                    fontWeight: 600,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    data.propertyType
                                                                                }{' '}
                                                                                :
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    flex: 1,
                                                                                    fontWeight:
                                                                                        'normal',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    data.propertyName
                                                                                }
                                                                            </p>
                                                                        </li>
                                                                    )
                                                                }
                                                            )}
                                                        </ol>
                                                    ) : (
                                                        <ol
                                                            type='1'
                                                            style={{
                                                                marginLeft:
                                                                    '16px',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {data[1].map(
                                                                (data, key) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                key
                                                                            }
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontWeight:
                                                                                        'normal',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    data
                                                                                }
                                                                            </p>
                                                                        </li>
                                                                    )
                                                                }
                                                            )}
                                                        </ol>
                                                    )
                                                ) : (
                                                    <p style={{ flex: 1 }}>
                                                        {data[1] === true
                                                            ? 'YES'
                                                            : data[1] === false
                                                            ? 'NO'
                                                            : data[1]}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                </>
                            )
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant='primary'>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
