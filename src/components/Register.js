import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { url } from './common';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './Navbar';



const Register = () => {
    const history = useHistory();

    const [initialValues, setinitialvalues] = useState({
        name: '',
        email: '',
        password: ''
    })

    //validation for adding users data 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
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
                    var post = await axios.post(`${url}/register`, values)
                    alert('register successfully')

                    setinitialvalues(post)
                    history.push("/login")

                } catch (error) {

                    // toast(`Email already Exist`)
                    alert(error.response.data.message)

                }
            }}>


            {({ errors, touched }) => {
                return (
                    <>
                        <div className='rightbar'>
                            <div className="container text-center"><h1 className="font-weight-bold text-dark">Register</h1></div>
                            <Form className="container  center register-form" style={{ 'width': '50%', 'marginBottom': '20px' }}>

                                <div className="form-row my-3">
                                    <div className="form-group col-12 ">
                                        <label className='mt-4'>Name</label>
                                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
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
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary my-3 mr-2" type="submit">Submit</button>
                                    <button className="btn btn-success my-3 mx-2" type="reset">Reset</button>
                                    {/* <ToastContainer /> */}
                                    <span>Already SingUp please <Link to='/login'>LogIn</Link></span>
                                </div>
                            </Form>
                        </div>
                    </>
                );
            }}
        </Formik>

    );
}

export default Register;