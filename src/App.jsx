import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import ArtDetails from "./ArtDetails"; // The component for art details
import "./styles.css";
import carpetBackground from "./high-res-carpet-image.jpg";

const API_KEY = "IF4vbuea";
const BASE_URL = `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&ps=3`;

const App = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchArt();
  }, []);

  const fetchArt = async () => {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    setLoading(true); // Set loading state to true before fetching
    try {
      const response = await axios.get(`${BASE_URL}&p=${randomPage}`);
      setArtworks(response.data.artObjects);
    } catch (error) {
      console.error("Error fetching art:", error.response || error);
    }
    setLoading(false); // Set loading state to false after fetching
  };

  return (
    <div
    className="main-page"
      style={{
        backgroundImage: `url(${carpetBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <h1>Art Gallery</h1>
                {loading ? (
                  <p>Loading art...</p>
                ) : (
                  <div className="gallery">
                    {artworks.map((art) => (
                      <div key={art.id} className="art-item">
                        {art.webImage && (
                          <Link to={`/art/${art.objectNumber}`}>
                            <img src={art.webImage.url} alt={art.title} />
                            <h3>{art.title}</h3>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={fetchArt}>Shuffle Art</button>
              </div>
            }
          />
          <Route path="/art/:objectNumber" element={<ArtDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
