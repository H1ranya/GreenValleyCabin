import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import bgImage from "./assets/bg-header.jpg";
import logo from "./assets/logo.png";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="loading-overlay">
          <img src={logo} alt="Green Valley Logo" className="loading-logo" />
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
