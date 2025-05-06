import { lazy, Suspense, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Loading from './Components/Loading';

const HomeComponent = lazy( () => import('./Containers/Home'))
const AboutComponent = lazy( () => import('./Containers/About'))
const LoginComponent = lazy( () => import('./Containers/Login'))
const ProfileComponent = lazy( () => import('./Containers/Profile'))
const SignUpComponent = lazy( () => import( './Containers/SignUp'))
const CreateListingComponent = lazy( () => import('./Containers/CreateListing'))
const SearchPageComponent = lazy( () => import('./Containers/SearchPage'))
const UpdateListingComponent = lazy( () => import( './Containers/UpdateListing'))
const ListingComponent = lazy( () => import('./Containers/Listing'))


const router = createBrowserRouter([
  {
    element : <Layout />,
    children : [
      {
        path : "/",
        element : <Suspense fallback={<Loading />} > 
          <HomeComponent />
        </Suspense>
      },
      {
        path: "/about",
        element: <Suspense fallback={<Loading />} > 
        <AboutComponent />
      </Suspense>
      },
      {
        path : "/login",
        element :<Suspense fallback={<Loading />} > 
        <LoginComponent />
      </Suspense>
      },
      {
        path : "/profile/:id",
        element : <Suspense fallback={<Loading />} > 
          <ProfileComponent />
        </Suspense>
      },

      {
        path : "/signup",
        element : <Suspense fallback={<Loading />} > 
          <SignUpComponent />
        </Suspense>
      },
      {
        path :"/createlisting",
        element : <Suspense fallback={<Loading />} > 
          <CreateListingComponent />
        </Suspense>
      },
      {
        path : "/listing/:id",
        element : <Suspense fallback={<Loading />} > 
          <ListingComponent />
        </Suspense>
      },
      {
        path : "/listing/update-listing/:id",
        element : <Suspense fallback={<Loading />} > 
          <UpdateListingComponent />
        </Suspense>
      },
      {
        path : "/search",
        element :<Suspense fallback={<Loading />} > 
          <SearchPageComponent />
        </Suspense>
      }
    ]
  }
])

function App() {
 

  return (
   <>
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
   </>
  )
}

export default App
