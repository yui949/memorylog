import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronLeft } from "lucide-react";

export default function EventPhoto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos || []);
      });
  }, [id]);

  return (
    <>
      {/* 戻るボタン */}
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "20px",
          zIndex: 1000,
          cursor: "pointer"
        }}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={28} color="#815D51" />
      </div>

      <Header />

      <div
        style={{
          paddingTop: "180px",
          paddingBottom: "120px",
          paddingLeft: "20px",
          paddingRight: "20px",
          minHeight: "100vh",
          background: "#FFFDF6"
        }}
      >
        <h2 style={{ color: "#815D51", marginBottom: "20px" }}>
          photos
        </h2>

        {photos.length === 0 && (
          <div style={{ color: "#815D51" }}>
            まだ写真がありません
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}
        >
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt="event"
              style={{
                width: "100%",
                borderRadius: "15px",
                objectFit: "cover"
              }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}