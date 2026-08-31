import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Developmnet from './components/Development';
import NotFound from './components/Notfound'

export default function App() {
    return (
        <> 
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Developmnet />} />
                <Route path="/about" element={<Developmnet />} />
                <Route path="/contact" element={<Developmnet />} />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    )
}    
