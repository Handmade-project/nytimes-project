import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Index from './news/index';
import Clip from './clip/clip';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clip/" element={<Clip />} />
      <Route path="/*" element={<Index />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
