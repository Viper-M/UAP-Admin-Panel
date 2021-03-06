import '../../App.css'
import React, { useEffect, useState } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import MyVerticallyCenteredModal from '../../Modal'
import exportToCsv from '../../DownloadAllCSV'
import { parseOriginalDate } from '../../data'

const searchCategory = () => {
    let userData = document
        .getElementById('searchCategory__Name')
        .value.toUpperCase()
    let container = document.getElementById('searchCategory__Name__Body')
    let tr = container.getElementsByTagName('tr')

    for (let i = 0; i < tr.length; i++) {
        const element = tr[i]

        let text = element.getElementsByTagName('td')
        let tdText = ''

        // console.log(text);

        for (let j = 0; j < text.length; j++) {
            tdText += text[j].innerText
        }
        // console.log(cardText);

        let textValue = tdText
        if (textValue.toUpperCase().indexOf(userData) > -1) {
            element.style.display = ''
        } else {
            element.style.display = 'none'
        }
    }
}

const Category = ({ logoutAdminUser }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [details, setDetails] = useState({})

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        axios
            .get('https://media-prime-backend.herokuapp.com/admin/nftStates', config)
            .then((result) => {
                setData(result.data.totalNftStates)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])
    return (
        <>
            {loading ? (
                <div
                    className='flex items-center justify-center'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <Spinner
                        animation='border'
                        role='status'
                        style={{ width: '6rem', height: ' 6rem' }}
                    />
                    <h3 style={{marginTop: '1rem'}}>Loading NFT Status List...</h3>
                </div>
            ) : (
                <div className='third'>
                    <div className='top__box__container'>
                        {/* <h1 className='third-H'> NFT STATUS </h1> */}
                        <Button
                            variant='primary'
                            onClick={(e) => logoutAdminUser(e)}
                        >
                            Logout
                        </Button>
                    </div>
                    <hr />
                    <div
                        className='top'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '4px',
                            padding: '0 5px',
                        }}
                    >
                        <input
                            className='inputThree'
                            placeholder='Search'
                            id='searchCategory__Name'
                            onKeyUp={searchCategory}
                            style={{
                                width: '100%',
                            }}
                        />
                        <Button
                            variant='primary'
                            onClick={(e) => exportToCsv(e, data)}
                        >
                            Download
                        </Button>
                    </div>
                    <br />
                    <div className='Category'>
                        <table className='tableFour'>
                            <thead>
                                <tr>
                                    <th> State </th>
                                    <th> Price </th>
                                    <th> From </th>
                                    <th> To </th>
                                    <th> Date </th>
                                    <th> Details </th>
                                </tr>
                            </thead>
                            <tbody
                                className='tr'
                                id='searchCategory__Name__Body'
                            >
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td> {value.state} </td>
                                        <td>
                                            {' '}
                                            {value.price
                                                ? value.price / Math.pow(10, 18)
                                                : ''}{' '}
                                        </td>
                                        <td> {value.from} </td>
                                        <td> {value.to} </td>
                                        <td>
                                            {' '}
                                            {parseOriginalDate(value.date)}{' '}
                                        </td>
                                        <td>
                                            <Button
                                                variant='primary'
                                                onClick={() => {
                                                    setDetails(value)
                                                    setModalShow(true)
                                                }}
                                            >
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        setShow={setModalShow}
                        details={details}
                        type={'User'}
                    />
                </div>
            )}
        </>
    )
}

export default Category
