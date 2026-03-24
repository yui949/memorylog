import { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import FloatingButton from "../components/FloatingButton";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  date: string;
  memo: string | null;
  place?: string;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  return (
    <div style={{ background: "#FFFDF6", minHeight: "100vh" }}>
      <Header />

     {/* 1. 検索バーを画面上部に固定（背景なし・ヘッダーに乗せる） */}
      <div
        style={{
          position: "fixed",
          top: "60px", // ヘッダーの高さに合わせて微調整してください
          left: 0,
          right: 0,
          padding: "0 20px",
          display: "flex",
          justifyContent: "center",
          zIndex: 10000, // ヘッダーより手前に
        }}
      >
        <input
          placeholder="検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "12px 20px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: "#FFFFFF", // 検索バー自体の色は残す
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // 少し浮かせて見やすくする
            outline: "none",
            color: "#815D51"
          }}
        />
      </div>

      {/* 2. メインコンテンツの余白も少し調整 */}
      <div style={{ 
        paddingTop: "140px", // 検索バーが上に上がった分、ここも少し詰める
        paddingBottom: "100px",
        paddingLeft: "20px",
        paddingRight: "20px"
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {events 
          .filter((event) => 
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (event.place && event.place.toLowerCase().includes(searchQuery.toLowerCase()))
            )
          .map((event) => {
            const dateObj = new Date(event.date);
            const displayDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

            return (
              <div
                key={event.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#EEF0E9",
                  borderRadius: "20px",
                  padding: "16px",
                  cursor: "pointer",
                  transition: "0.25s",
                }}
                onClick={() => navigate(`/events/${event.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* 左側：円形の日付アイコン */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#B9D8C2",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#815D51",
                    flexShrink: 0
                  }}
                >
                  {displayDate}
                </div>

                {/* 右側：タイトルと場所 */}
                <div style={{ marginLeft: "16px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "18px", color: "#815D51" }}>
                    {event.title}
                  </div>
                  <div style={{ fontSize: "14px", color: "#815D51", opacity: 0.8 }}>
                    {event.place ?? "place"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
      <FloatingButton onClick={() => navigate("/events/new")} />
    </div>
  );
}