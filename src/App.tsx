import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonDetailPage from './pages/PersonDetailPage';
import Test from './test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/person/:personId" element={<PersonDetailPage />} />
        <Route path="/test" element={<Test />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;