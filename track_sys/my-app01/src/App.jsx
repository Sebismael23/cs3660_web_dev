import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { About } from './components/About';
import MainLayout from './layouts/MainLayout';
import AuthRoute from './components/AuthRoute';
import Login from './components/Login';
import Admin  from './components/admin/Admin';



const NotFound = () => <h1>NotFound</h1>;

// Without the main layout
// function App() {
//   return (
//     <div className="App">
//       <NavBar />
//       <Routes>
//         {/* Homepage Route */}
//         <Route 
//           path="/" 
//           element={
//             <>
//               <Banner />
//               <Features />
//             </>
//           } 
//         />
//         {/* About Route */}
//         <Route path="/about" element={<About />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }


//When using the main layout
function App() {
  return(
    <div className='App'>
      <Routes>
        <Route path='/' element={
          <MainLayout title="Home">
            <Banner />
            <Features />
          </MainLayout>
        } />

        <Route path='/about' element={<About />} />

        <Route path='login' element={<Login />} />

        <Route element = {<AuthRoute />}>
          <Route path='/admin' element = {<Admin />} />
        </Route> 

        <Route NotFound="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;