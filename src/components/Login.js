import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { url } from './common';
// import { MyContext } from '../App'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
//import Navbar from './Navbar';
// import { Navbar } from 'reactstrap';



const Login = (props) => {
    const { dispatch } = props
    const history = useHistory();
    //const { dispatch } = useContext(MyContext)
    const [initialValues, setinitialvalues] = useState({
        email: '',
        password: ''
    })

    //validation for adding users data 
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Please Enter your password'),
        email: Yup.string().matches(
            "^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$",
            "At least five alphanumeric characters and Must contain @gmail.com"
        )
            .email('Email is invalid')
            .required('Email is required'),

    });



    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={async (values) => {
                // same shape as initial values
                try {
                    const post = await axios.create({
                        withCredentials: true,
                        credentials: 'include'
                    }).post(`${url}/login`, values)


                    alert('Login successfully')
                    setinitialvalues(post)
                    history.push("/")
                    dispatch({ type: 'USER', payload: true })



                } catch (error) {
                    alert(error.response.data.message)
                }
            }}>


            {({ errors, touched }) => {
                return (
                    <div className='rightbar'>

                        <div className="container text-center"><h1 className="font-weight-bold text-dark">Login</h1></div>

                        <Form className="container center register-form" autoComplete="nope" style={{ 'width': '50%', 'marginBottom': '20px' }}>
                            <div className="form-row my-3">
                                <div className="form-group col-12">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row my-3">
                                <div className="form-group col-12">
                                    <label>Password</label>
                                    <Field name="password" type="password" id='hidden' autoComplete="off" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary my-3 mr-2" type="submit">Submit</button>
                                <button className="btn btn-success my-3 mx-2" type="reset">Reset</button>
                                <span>Don't have account please <Link to='Register'>Register</Link></span>

                            </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>

    );
}

export default Login;
