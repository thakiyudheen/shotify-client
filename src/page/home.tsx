import React from 'react'
import FeatureList from '../component/features/feature'
import NavBar from '../component/navbar'
import ShortURLGenerator from '../component/linkshorner.tsx/LinkShortner'

type Props = {}

const Home = (props: Props) => {
    return (
        <>
            <div className='font-Poppins'>
                <NavBar />
                <ShortURLGenerator />
                <FeatureList />
            </div>
        </>

    )
}

export default Home