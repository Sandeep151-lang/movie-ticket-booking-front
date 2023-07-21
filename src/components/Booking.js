import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router'
import { url ,token,id} from './common';
// import LoadingSpinner from './LoadingSpinner';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const Booking = () => {
    //const [loading, setloading] = useState(true);


    // const history = useHistory();
    const [lis, setlist] = useState([])
    const userdata = async () => {
        try {
            const res = await axios.post(`${url}/about`,{token})

            if (res.status === 200) {

                // console.log(res.data)

            }
        } catch (err) {
            // toast(`please login`)
            // history.push('/login')
            console.log('error')

        }
    }

// const d ="http://localhost:5000"
    const list = async () => {
        try {
            const res = await axios.post(`${url}/getdetails`,{id})
            if (res.status === 200) {
                // localStorage.getItem('jwt');
                setlist(res?.data?.message)
            }
        } catch (err) {
            // history.push('/login')
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
                        {lis?.length ===0 ?
                            lis?.map((item, index) => {
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
                            : <p>No Booking Available</p>
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}


export default Booking
