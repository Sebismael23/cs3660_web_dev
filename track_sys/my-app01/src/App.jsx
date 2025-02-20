import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { About } from './components/About';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* Homepage Route */}
        <Route 
          path="/" 
          element={
            <>
              <Banner />
              <Features />
            </>
          } 
        />
        {/* About Route */}
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;