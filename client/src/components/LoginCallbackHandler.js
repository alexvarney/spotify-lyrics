import React from 'react'
import {Redirect} from 'react-router-dom'

const LoginCallbackHandler = ({handlerFunc, redirect, location}) => {


    handlerFunc(location.hash)

    return (
        <Redirect to={redirect} />
    )
}

export default LoginCallbackHandler
