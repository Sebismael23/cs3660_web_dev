import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Contact } from './components/Contact';
import MainLayout from './layouts/MainLayout';
import AuthRoute from './components/AuthRoute';
import Login from './components/Login';
import Admin  from './components/admin/Admin';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/products';
import AdminLayout from './layouts/AdminLayout';
import Geofencing_alerts from './components/geofencing_alerts';
import Assets_management from './components/assets_management';
import Settings from './components/Settings';
import Reports_Analytics from './components/Reports_Analytics';


const NotFound = () => <h1>NotFound</h1>;
function App() {
  return(
    <div className='App'>

      <Routes>
        <Route path='/' element={
          <MainLayout title="Home">
            <Banner />
            <Features />
            <Contact />
          </MainLayout>
        } />

        <Route path='/about' element={<About />} />
        <Route path='login' element={<Login />} />

        <Route element = {<AuthRoute />}>
          <Route element={<AdminLayout />}>
            {/* <Route path='/admin' element = {<Admin />} /> */}
            <Route path='/admin/dashboard' element = {<Dashboard /> } />
            <Route path='/admin/products' element = {<Products /> } />
            <Route path='/admin/assets_management' element = {<Assets_management /> } />
            <Route path='/admin/geofencing_alerts' element = {<Geofencing_alerts /> } />
            <Route path='/admin/reports_Analytics' element = {<Reports_Analytics /> } />
            <Route path='/admin/products' element = {<Products /> } />
            <Route path='/admin/settings' element = {<Settings /> } />
            {/* <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} /> */}
          </Route>
        </Route> 
        

        <Route NotFound="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;



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