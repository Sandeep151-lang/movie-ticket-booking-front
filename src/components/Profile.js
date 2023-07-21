import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router'
import { Card } from 'reactstrap'
import { url } from './common';
// import LoadingSpinner from './LoadingSpinner';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './Navbar'


const Profile = () => {
    //const [loading, setloading] = useState(true);
    const history = useHistory();
    const [data, setdata] = useState([]);
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
                setdata(res.data.message);
                // console.log(res.data)
                //setloading(false);
            }
        } catch (err) {
            // toast(`please login`)
            history.push('/login')

        }
    }
    // const token = localStorage.setItem('user', JSON.stringify(data.role))
    // console.log(token)
    useEffect(() => {

        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>


            <div className='w3-container rightbar'>

                <h1 className="text-center">User Details</h1>

                <div className="container mt-5" style={{ "width": "80%", "height": "70%" }}>
                    <Card>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '20px', 'fontFamily': 'sans-serif' }}>Name :</span> <span className="text-center text-dark" style={{ 'fontSize': '19px', 'fontFamily': 'sans-serif' }}>{data.name}</span></p>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '20px', 'fontFamily': 'sans-serif' }}>Email:</span> <span className="text-dark" style={{ 'fontSize': '19px' }}>{data.email}</span></p>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '20px', 'fontFamily': 'sans-serif' }}>Role : </span><span className="text-dark" style={{ 'fontSize': '19px', 'fontFamily': 'sans-serif' }}>{data.role}</span></p>
                    </Card>
                </div>
            </div>
        </>
    )
}


export default Profile