import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronLeft } from "lucide-react";

// 1. 写真データの型を定義（文字列か、urlを持つオブジェクト）
type PhotoType = string | { url: string };

export default function EventPhoto() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. useStateに型を指定する
  const [photos, setPhotos] = useState<PhotoType[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        // オブジェクトの中に photos 配列がある場合を想定
        const photoData = Array.isArray(data) ? data : data.photos;
        setPhotos(photoData || []);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setPhotos([]);
      });
  }, [id]);

  return (
    <>
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
        <h2 style={{ color: "#815D51", marginBottom: "20px" }}>photos</h2>

        {photos.length === 0 && (
          <div style={{ color: "#815D51" }}>まだ写真がありません</div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}
        >
          {photos.map((photo, index) => {
            // 3. 安全にURLを取り出す（photoがオブジェクトなら .url を見る）
            const photoUrl = typeof photo === "string" ? photo : photo?.url;

            if (!photoUrl) return null;

            return (
              <img
                key={index}
                src={photoUrl.startsWith("http") ? photoUrl : `http://localhost:3000${photoUrl}`}
                alt="event"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "15px",
                  objectFit: "cover"
                }}
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}