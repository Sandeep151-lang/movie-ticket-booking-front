import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { Container } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
import { url } from './common';


const TicketBooking = () => {
    const { _id } = useParams();
    const history = useHistory()

    const [seats, setseats] = useState([])
    const [data, setdata] = useState([])
    const [user_id, setuser] = useState([]);

    const yes = Object.assign({}, seats)

    const userdata = async () => {
        // const token = window.localStorage.getItem('jwt')
        try {

            const res = await axios.create({
                withCredentials: true,
                credentials: "include",
            }).get(`${url}/about`)
            // console.log(res.data.message)
            if (res.status === 200) {
                localStorage.getItem('jwt');
                setuser(res.data.message);
                // console.log(res.data)

            }
        } catch (err) {
            // toast(`please login`)
            // history.push('/login')

        }
    }

    const handle = (e) => {
        e.preventDefault()
        if (seats.find((x) => x === e.target.value)) {
            setseats(seats.filter((x) => x !== e.target.value))
        } else {
            setseats([...seats, e.target.value])
        }
    }

    const cardData = async () => {
        try {
            const res = await axios.get(`${url}/getMovieId/${_id}`);
            if (res.status === 200) {
                setdata(res.data.message)
            }
        } catch (error) {
            console.log(error.response)
        }
    }


    const payment = async (e) => {
        try {
            await axios.put(`${url}/updateSeats`, { yes, _id })
            cardData()
        } catch (error) {
            console.log('error')
        }
    }



    useEffect(() => {
        cardData()
        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (data.Seats === undefined) {
        console.log('undefined')
    } else {
        const yo = data.Seats.map((x) => Object.values(x))
        var s = yo.length === 0 ? [] : yo.reduce((x, y) => x.concat(y))
    }

    const date = data.date;
    const Time = data.Time;
    const Total = data.Total * seats.length;
    const Movie_name = data.Movie_name;
    const TotalSeats = seats.length
    const ticketbook = async () => {
        try {
            await axios.post('/ticketBooking', { date, Time, Total, Movie_name, TotalSeats, seats, user_id })
            alert('booked')
            cardData()
            history.push('/booking')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const login = (e) => {
        e.preventDefault()
        alert('please login')

    }

    return (
        <>

            <div className='rightbar'>
                <div className='container ticket-booking'>
                    <div className='d-flex'>
                        <Container>
                            <form onSubmit={onsubmit} className='mt-2'>
                                <p><span className='movie-time-head'>Movie Time:-</span><span className='movie-time'>{date}- {Time}</span></p>
                                <p><span className='movie-time-head'>Movie Name: - </span><span style={{ 'fontWeight': '10px', 'fontFamily': 'sans-serif' }}>{data.Movie_name}</span></p>
                                <p><span className='movie-price-head'>Price:</span><span className='movie-price'>&#8377;{data.Total}/seat</span> </p>
                                <p><span className='movie-price-head'>Total:</span><span className='movie-price'> &#8377;{Total}</span> </p>
                                <div>
                                    <p><span className='movie-time-head'>Seats:- </span>{seats.map((ele, index) => {
                                        return <>
                                            <span key={index} className='mx-2 seat-name'>{ele}</span>
                                        </>
                                    })}</p>
                                </div>
                                <p><span className='movie-time-head'>Total Seats:-</span><span className='seat-length'>{seats.length}</span></p>


                            </form>
                            {seats.length === 0 ? <button type='sumbit' className='btn btn-primary disabled btn-book'>Book</button> : user_id._id ? <StripeCheckout
                                email={user_id.email}
                                name={user_id.name}
                                amount={Total * 100}
                                currency="INR"
                                token={ticketbook}
                                stripeKey="pk_test_51K1p90SJsqVvBs7npny7nMtvteAWloxVwaITgnSKRh3gTXqoRHWThem1HW7bQpl0ldekn1jJJJJZU6cEjm6SANfw00EdhkkMey"
                            >
                                <button className="btn btn-primary btn-book" onClick={payment}>Book</button>
                            </StripeCheckout> : <button type='sumbit' className='btn btn-primary btn-book' onClick={login}>Book</button>}
                        </Container>
                        <Container>
                            <div className='mt-5'>
                                <input type="checkbox" className="form-check-input seats" disabled='disabled' /><span> Booked</span>
                                <br />
                                <input type="checkbox" className="form-check-input seats" style={{ 'backgroundColor': 'green' }} /><span> selected</span>
                                <br />
                                <input type="checkbox" className="form-check-input seats" /><span> Unselected</span>
                            </div>
                        </Container>
                    </div>
                    <p className='text-center mt-5' style={{ 'width': '68%', 'backgroundColor': 'orange', 'fontWeight': 'bold' }}>Screen</p>
                    <table className='table table-part'>
                        <thead>
                            <tr>
                                <td>seats</td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td className='seatGap'></td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A</td>
                                <td><input type="checkbox" className="form-check-input seats" value="A1" id="A1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A2" id="A2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A3" id="A3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A4" id="A4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A5" id="A5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A5' ? 'disabled' : '')} /></td>
                                <td className="seatGap"></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="A12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'A12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'A12' ? 'disabled' : '')} /></td>
                            </tr>
                            <tr>
                                <td>B</td>
                                <td><input type="checkbox" className="form-check-input seats" value="B1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="B12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'B12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'B12' ? 'disabled' : '')} /></td>
                            </tr>
                            <tr>
                                <td>C</td>
                                <td><input type="checkbox" className="form-check-input seats" value="C1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="C12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'C12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'C12' ? 'disabled' : '')} /></td>
                            </tr>
                            <tr>
                                <td>D</td>
                                <td><input type="checkbox" className="form-check-input seats" value="D1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="D12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'D12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'D12' ? 'disabled' : '')} /></td>
                            </tr>
                            <tr>
                                <td>E</td>
                                <td><input type="checkbox" className="form-check-input seats" value="E1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="E12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'E12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'E12' ? 'disabled' : '')} /></td>
                            </tr>
                            <tr className="seatVGap"></tr>
                            <tr>
                                <td>F</td>
                                <td><input type="checkbox" className="form-check-input seats" value="F1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="F12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'F12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'F12' ? 'disabled' : '')} /></td>
                            </tr>
                            <tr>
                                <td>G</td>
                                <td><input type="checkbox" className="form-check-input seats" value="G1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="G12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'G12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'G12' ? 'disabled' : '')} /></td>
                            </tr>

                            <tr>
                                <td>H</td>
                                <td><input type="checkbox" className="form-check-input seats" value="H1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="H12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'H12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'H12' ? 'disabled' : '')} /></td>
                            </tr>

                            <tr>
                                <td>I</td>
                                <td><input type="checkbox" className="form-check-input seats" value="I1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="I12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'I12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'I12' ? 'disabled' : '')} /></td>
                            </tr>

                            <tr>
                                <td>J</td>
                                <td><input type="checkbox" className="form-check-input seats" value="J1" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J1') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J1' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J2" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J2') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J2' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J3" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J3') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J3' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J4" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J4') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J4' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J5" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J5') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J5' ? 'disabled' : '')} /></td>
                                <td></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J6" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J6') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J6' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J7" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J7') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J7' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J8" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J8') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J8' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J9" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J9') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J9' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J10" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J10') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J10' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J11" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J11') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J11' ? 'disabled' : '')} /></td>
                                <td><input type="checkbox" className="form-check-input seats" value="J12" onClick={handle} style={{ backgroundColor: "" + (seats.find((x) => x === 'J12') ? "green" : " ") }} disabled={data.Seats === undefined ? '' : s === undefined ? '' : s.find((x) => x === 'J12' ? 'disabled' : '')} /></td>
                            </tr>
                        </tbody>

                    </table>


                </div>
            </div>

        </>
    )
}

export default TicketBooking
