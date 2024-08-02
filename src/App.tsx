import { Routes, Route } from 'react-router-dom';

import {

  ErrorPage,
  HomePage,

  ViewBlogPage

} from './pages/exportPages';


import { NavbarLayout } from './layouts/exportLayouts';

function App() {

  return (
    <Routes>

      <Route path='/' element={<NavbarLayout />}>

        <Route index element={<HomePage />} />

        <Route path='/view'>

          <Route path='/view/blog' element={<ViewBlogPage />} />

        </Route>

        <Route path='*' element={<ErrorPage />} />

      </Route>

    </Routes>
  )
}

export default App
