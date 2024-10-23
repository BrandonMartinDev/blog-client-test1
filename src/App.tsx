// -- == [[ IMPORTS ]] == -- \\

import { Routes, Route } from 'react-router-dom';

import {

  ErrorPage,
  UnauthorizedPage,
  
  HomePage,
  LoginPage,
  
  ViewBlogPage,
  
  EditBlogPage,

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

          <Route path='/edit'>

            <Route path='/edit/blog/:blog_id' element={<EditBlogPage />} />

          </Route>

          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path='*' element={<ErrorPage />} />

        </Route>

      </Routes>
      
    </LoggedInUserContextProvider>
  )
}

export default App
