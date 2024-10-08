import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import carpetBackground from "./high-res-carpet-image.jpg";

const API_KEY = "IF4vbuea";
const BASE_URL = `https://www.rijksmuseum.nl/api/en/collection`;

const ArtDetails = () => {
  const { objectNumber } = useParams(); // Get the objectNumber from the URL
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchArtDetails();
  }, [objectNumber]);

  const fetchArtDetails = async () => {
    setLoading(true); // Set loading state to true before fetching
    try {
      const response = await axios.get(
        `${BASE_URL}/${objectNumber}?key=${API_KEY}`
      );
      setArt(response.data.artObject);
    } catch (error) {
      console.error("Error fetching art details:", error.response || error);
    }
    setLoading(false); // Set loading state to false after fetching
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!art) {
    return <div>No art found</div>;
  }

  return (
    <div
      className="art-details-page"
      style={{
        backgroundImage: `url(${carpetBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Ensures background covers the entire viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="art-details">
        <h2>{art.title}</h2>
        <img src={art.webImage.url} alt={art.title} />
        <p>{art.longTitle}</p>
        <p>{art.description || "No description available."}</p>
        <Link to="/" className="back-button">
          Back to Gallery
        </Link>
      </div>
    </div>
  );
};

export default ArtDetails;
