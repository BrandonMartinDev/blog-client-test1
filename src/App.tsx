// -- == [[ IMPORTS ]] == -- \\

import { Routes, Route } from 'react-router-dom';

import {

  ErrorPage,

  HomePage,
  LoginPage,

  ViewBlogPage

} from './pages/exportPages';

import { LoggedInUserContextProvider } from '@contexts/useLoggedInUser';


import { NavbarLayout } from './layouts/exportLayouts';

function App() {

  return (
    <LoggedInUserContextProvider>

      <Routes>

        <Route path='/login'>

          <Route index element={<LoginPage />} />

        </Route>

        <Route path='/' element={<NavbarLayout />}>

          <Route index element={<HomePage />} />

          <Route path='/view'>

            <Route path='/view/blog/:blog_id' element={<ViewBlogPage />} />

          </Route>

          <Route path='*' element={<ErrorPage />} />

        </Route>

      </Routes>
      
    </LoggedInUserContextProvider>
  )
}

export default App
