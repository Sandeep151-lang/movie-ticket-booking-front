import React, { useState, useEffect } from 'react'
import { Card, CardTitle, CardText, Row, Col, CardImg } from 'reactstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { url } from './common';


const Homepage = () => {
    const history = useHistory()
    const [movie, setmovie] = useState([]);
    const moviesdata = async () => {
        try {
            const res = await axios.get(`${url}/getMovie`);
            if (res.status === 200) {
                setmovie(res.data.message)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        moviesdata()
    }, [])

    const card = (e) => {
        history.push(`/ticket/${e._id}`)
    }

    return (
        <>
            <div className='rightbar'>
                <div className='container ml-5'>

                    <Row>{
                        movie.map((element, index) => {

                            const { Image, Time, date, Movie_name, Total } = element
                            return <>
                                <Col key={index} sm="3" className='my-5'>
                                    <Card className='card-part' onClick={(e) => card(element)} >
                                        <CardTitle><span className='movie-time-head'>Time: </span><span className='movie-time'>{date}- {Time}</span></CardTitle>
                                        <CardImg top src={Image} alt="Card image cap" height={200} style={{ objectFit: 'cover' }} />
                                        <CardText><span className='movie-name'>Movie Name: </span> <span className='movie-name-p'>{Movie_name}</span> </CardText>
                                        <CardText><span className='movie-price-head'>Price: </span> <span className='movie-price'>&#8377;{Total}</span></CardText>
                                    </Card>
                                </Col>
                            </>
                        })
                    }
                    </Row>
                </div>
            </div>

        </>
    )
}

export default Homepage
