import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router'
import { url } from './common';
// import LoadingSpinner from './LoadingSpinner';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const Booking = () => {
    //const [loading, setloading] = useState(true);
    const history = useHistory();
    const [data, setdata] = useState([]);
    const [lis, setlist] = useState([])
    const userdata = async () => {
        try {
            const res = await axios.create({
                withCredentials: true,
                credentials: "include",
            }).get('http://localhost:5000/about')

            if (res.status === 200) {
                localStorage.getItem('jwt');

                setdata(res.data.message);
                // console.log(res.data)

            }
        } catch (err) {
            // toast(`please login`)
            // history.push('/login')
            console.log('error')

        }
    }


    const list = async () => {
        try {
            const res = await axios.create({
                //baseURL: "http://localhost:5000",
                withCredentials: true,
                credentials: "include",
            }).get(`${url}/getdetails`)
            if (res.status === 200) {
                localStorage.getItem('jwt');
                setlist(res.data.message)
            }
        } catch (err) {
            history.push('/login')
        }
    }


    useEffect(() => {
        list()
        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className=' rightbar'>
                <table className="table caption-top">
                    <caption>Bookings</caption>
                    <thead>
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Movie_name</th>
                            <th scope="col">Time</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">No of Seats</th>
                            <th scope="col">Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lis.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.Movie_name}</td>
                                        <td>{item.Time}</td>
                                        <td>&#8377;{item.Total}/-</td>
                                        <td>{item.TotalSeats}</td>
                                        {item.seats.map((i, index) => {
                                            return <span>{i}</span>
                                        })}
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}


export default Booking
