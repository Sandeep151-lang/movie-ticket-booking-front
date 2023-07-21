import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { url } from './common'


const Logout = (props) => {
    const { dispatch } = props
    const history = useHistory();
    useEffect(() => {
      axios.get(`${url}/logout`).then((res) => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
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