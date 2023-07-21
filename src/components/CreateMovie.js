import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from 'axios';
import { url } from './common';





const CreateMovie = () => {
    const [Image, setImage] = useState('');
    const [Movie_name, setMovie_name] = useState('')
    //const [Time, setTime] = useState('')
    const [Total, setTotal] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    // const [date, setdate] = useState('');

    const date = moment(startDate).format('DD/MM')
    const Time = moment(startDate).format('HH:MM A')
    //console.log(moment(startDate).format('DD/MM'))
    //console.log(moment(startDate).format('HH:MM A'))

    const create = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/createMovie`, { Image, Movie_name, date, Time, Total })
            if (res === 204) {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    const imageFunc = (e) => {
        setImage(e.target.value)

    }

    const movieFunc = (e) => {
        setMovie_name(e.target.value)
    }

    const priceFunc = (e) => {
        setTotal(e.target.value)
    }
    return (
        <>

            <div className='rightbar'>

                <h1 className='text-center'>Create Movie</h1>

                <div className='container create-movie'>
                    <form >
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Image:</label>
                            <input type="text" className="form-control" placeholder="Enter Image link" name="Image" onChange={imageFunc} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Movie Name:</label>
                            <input type="text" className="form-control" id="Total" placeholder="Enter Movie Name" name="Total" onChange={movieFunc} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Price:</label>
                            <input type="text" className="form-control" id="Total" placeholder="Enter Price" name="Total" onChange={priceFunc} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Select Movie Time:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={setStartDate}
                                showTimeSelect
                                dateFormat="Pp"

                                className='form-control'
                            />
                        </div>

                        <button type="submit" onClick={create} className="btn btn-primary create-movie-btn">Submit</button>
                    </form>

                </div>

            </div>
        </>
    )
}

export default CreateMovie
