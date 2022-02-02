import '../../App.css'
import React, { useEffect, useState } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import MyVerticallyCenteredModal from '../../Modal'
import exportToCsv from '../../DownloadAllCSV'

const searchProduct = () => {
    let userData = document
        .getElementById('searchProduct__Name')
        .value.toUpperCase()
    let container = document.getElementById('searchProduct__Name__Body')
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

const Products = () => {
    const [data, setData] = useState([])
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        axios
            .get('https://nft-backend.unicus.one/admin/nfts', config)
            .then((result) => {
                setData(result.data.totalNfts)
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
                </div>
            ) : (
                <div className='fourth'>
                    <h1 className='fourth-H'>NFT'S</h1>
                    <button id='log'>Log Out</button>
                    <hr />
                    <div
                        className='top'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '4px',
                            margin: '0 10px',
                        }}
                    >
                        <input
                            className='inputOne'
                            placeholder='Search'
                            id='searchProduct__Name'
                            onKeyUp={searchProduct}
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
                    <div className='Products'>
                        <table className='tableTwo'>
                            <thead>
                                <tr>
                                    <td> Names </td>
                                    <td> Owner ID </td>
                                    <td> TokenId </td>
                                    <td> Royalty </td>
                                    <td> Category </td>
                                    <td> Date </td>
                                    <td> Status </td>
                                    <td> Approve Status </td>
                                    <td> Views </td>
                                    <td> Details </td>
                                </tr>
                            </thead>
                            <tbody
                                className='tr'
                                id='searchProduct__Name__Body'
                            >
                                {data.map((value) => (
                                    <tr key={value._id}>
                                        <td> {value.name}</td>
                                        <td> {value.owner} </td>
                                        <td> {value.tokenId} </td>
                                        <td> {value.royalty} </td>
                                        <td> {value.category} </td>
                                        <td> {value.createdAt} </td>
                                        <td> {value.nftStatus} </td>
                                        <td>
                                            {' '}
                                            {value.isApproved
                                                ? `✔️`
                                                : `❌`}{' '}
                                        </td>
                                        <td> {value.views} </td>
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
                        type={'NFT'}
                    />
                </div>
            )}
        </>
    )
}

export default Products