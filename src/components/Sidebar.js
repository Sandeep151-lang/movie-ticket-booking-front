import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { BiClipboard } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa'
import { RiMovieFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className=' side w3-card-4'>

                <p className='mt-5 '><Link to='/' className='side-list' ><AiFillHome width='100' height='100' className='mx-2' /><span > Home</span></Link></p>
                <p ><Link to='/booking' className='side-list' ><BiClipboard className='mx-2' /> <span>Booking</span></Link></p>

                <p ><Link to='/create' className='side-list' ><RiMovieFill width='100' height='100' className='mx-2' /><span >Create-Movie</span></Link></p>
                <p ><Link to='/profile' className='side-list' ><FaUserAlt width='100' height='100' className='mx-2' /><span >Profile</span></Link></p>
            </div>
        </>
    )
}
// AiFillHome

export default Sidebar
