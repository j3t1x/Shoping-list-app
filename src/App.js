import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ShoppingListDetail from './components/ShoppingListDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/shopping-lists/1" />} />
        <Route path="/shopping-lists/:id" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
