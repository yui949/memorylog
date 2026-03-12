import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

type Person = {
  id: number;
  name: string;
};

type Event = {
  id: number;
  title: string;
  date: string;
  place?: string;
  memo?: string;
  people: Person[];
};

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  const dateObj = new Date(event.date);
  const displayDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

  return (
    <>
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

        {/* title & place */}
        <div
          style={{
            background: "#EEF0E9",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "15px"
          }}
        >
          <div style={{ color: "#815D51", fontSize: "18px" }}>
            title: {event.title}
          </div>

          <div style={{ color: "#815D51", marginTop: "6px" }}>
            place: {event.place ?? "XXXX"}
          </div>
        </div>

        {/* date */}
        <div
          style={{
            background: "#EEF0E9",
            borderRadius: "20px",
            padding: "15px",
            marginBottom: "15px",
            color: "#815D51"
          }}
        >
          data: {displayDate}
        </div>

        {/* people */}
        <div
          style={{
            background: "#EEF0E9",
            borderRadius: "20px",
            padding: "15px",
            marginBottom: "15px",
            color: "#815D51"
          }}
        >
          people:
          {event.people.map((p) => (
            <div key={p.id}>{p.name}</div>
          ))}
        </div>

        {/* memo */}
        <div
          style={{
            background: "#EEF0E9",
            borderRadius: "20px",
            padding: "15px",
            marginBottom: "15px",
            color: "#815D51",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          memo
          <span>›</span>
        </div>

        {/* picture */}
        <div
          style={{
            background: "#EEF0E9",
            borderRadius: "20px",
            padding: "15px",
            marginBottom: "40px",
            color: "#815D51",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          📷 picture
          <span>›</span>
        </div>

        {/* edit button */}
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              background: "#88B49A",
              border: "none",
              padding: "12px 40px",
              borderRadius: "10px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            編集
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}