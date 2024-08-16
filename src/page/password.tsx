import React from 'react'
import NavBar from '../component/navbar'
import PasswordGenerator from '../component/password/password'

type Props = {}

const Password = (props: Props) => {
    return (
        <>
            <div className='font-Poppins'>
                <NavBar />
                <PasswordGenerator />
            </div>
        </>

    )
}

export default Password