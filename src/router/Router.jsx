import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Stage from '../components/Stage'
import Wish from '../components/Wish'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path='/Stage' element = {<Stage/>}/>
            <Route path='/wish' element={<Wish/>}/>
        </Routes>
    </div>
  )
}

export default Router