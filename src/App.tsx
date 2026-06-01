import './index.css';
import MovieDetailPage from "@/pages/movieDetailPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/homePage"; 

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
           <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
