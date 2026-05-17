import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Markets from './pages/Markets';
import Account from './pages/Account';
import Trade from './pages/Trade';
import SimplePage from './pages/SimplePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/account" element={<Account />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/security" element={<SimplePage />} />
        <Route path="/support" element={<SimplePage />} />
        <Route path="/rewards" element={<SimplePage />} />
        <Route path="/cart" element={<SimplePage />} />
        <Route path="/signup" element={<SimplePage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

