import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './component/navbar'
import ShortURLGenerator from './component/linkshorner.tsx/LinkShortner'
import FeatureList from './component/features/feature'
import PasswordGenerator from './component/password/password'
import { Routes, Route } from 'react-router-dom';
import Home from './page/home'
import Password from './page/password'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password" element={<Password />} />
        {/* <Route path="categories" element={<Category/>} /> */}

      </Routes>

    </>
  )
}

export default App
