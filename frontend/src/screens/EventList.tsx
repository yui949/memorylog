import { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import FloatingButton from "../components/FloatingButton";
import { useParams } from "react-router-dom";
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
  const navigate = useNavigate();

 useEffect(() => {
  fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setEvents(data);
    });
}, []);

  return (
    <>
      <Header />

      {/* PeopleListと同じ余白設定 */}
      <div style={{ paddingTop: "180px", paddingBottom: "120px", minHeight: "100vh", background: "#FFFDF6" }}>

        {/* 検索バー (PeopleListのスタイルを継承) */}
        <div
          style={{
            padding: "0 20px",
            marginTop: "-120px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: 20
          }}
        >
          <input
            placeholder="検索"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "12px",
              borderRadius: "20px",
              border: "none"
            }}
          />
        </div>

        {/* Event List (PeopleListのグリッドではなく、1列のリスト形式) */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            position: "relative",
            zIndex: 10
          }}
        >
          {events.map((event) => {
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
                // ホバーエフェクトをPeopleListに合わせる
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
    </>
  );
}