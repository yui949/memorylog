import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EventMemo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [memo, setMemo] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => setMemo(data.memo));
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
          minHeight: "100vh",
          background: "#FFFDF6",
          paddingLeft: "20px",
          paddingRight: "20px"
        }}
      >
        {/* memo */}
        <div
          style={{
            background: "#EEF0E9",
            borderRadius: "20px",
            padding: "20px",
            color: "#815D51",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap"//改行できるようにするコード
          }}
        >
          {memo ? memo : "メモはありません"}
        </div>
      </div>

      <Footer />
    </>
  );
}