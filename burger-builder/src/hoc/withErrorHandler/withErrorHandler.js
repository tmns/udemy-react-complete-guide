// import React, { useState, useEffect } from 'react';
import React from 'react'

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        // now uses custom hook '../../hooks/http-error-handler

        // const [error, setError] = useState(null);

        // //componenWillMount () {
        //     const reqInterceptor = axios.interceptors.request.use(req => {
        //         //this.setState({error: null});
        //         setError(null);
        //         return req;
        //     });
        //     const resInterceptor = axios.interceptors.response.use(res => res, err => {
        //         // this.setState({error: err});
        //         setError(err);
        //     });
        // //}

        // useEffect(() => {
        //     return () => {
        //         axios.interceptors.request.eject(reqInterceptor);
        //         axios.interceptors.response.eject(resInterceptor);
        //     }
        // }, [reqInterceptor, resInterceptor])

        // // make sure we remove our interceptors to prevent memory leaks
        // // componentWillUnmount () {
        // //   //  console.log('Will unmount', this.reqInterceptor, this.resInterceptor);  
        // //     axios.interceptors.request.eject(this.reqInterceptor);
        // //     axios.interceptors.response.eject(this.resInterceptor);
        // // }

        // const errorConfirmedHandler = () => {
        //     //this.setState({error: null});
        //     setError(null)
        // }

        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Modal 
                    show={error}
                    // modalClosed={errorConfirmedHandler}
                    modalClosed={clearError}
                >{error ? error.message : null}</Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;