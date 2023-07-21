import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { url } from './common'


const Logout = (props) => {
    const { dispatch } = props
    const history = useHistory();
    useEffect(() => {
        axios.create({
            //baseURL: "http://localhost:5000",
            withCredentials: true,
            credentials: "include",
        }).get(`${url}/logout`).then((res) => {
            history.push('/login', { replace: true })
            dispatch({ type: 'USER', payload: false })

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='rightbar'>
            <h1>Logout page</h1>
        </div>
    )
}

export default Logout