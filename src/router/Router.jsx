import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Stage from '../components/Stage'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path='/Stage' element = {<Stage/>}/>
        </Routes>
    </div>
  )
}

export default Router