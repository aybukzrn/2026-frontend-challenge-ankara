import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonDetailPage from './pages/PersonDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/person/:personId" element={<PersonDetailPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;