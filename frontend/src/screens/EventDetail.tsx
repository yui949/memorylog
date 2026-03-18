import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { X, Check, Camera, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import FloatingButton from "../components/FloatingButton";
import { useNavigate, useParams } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleDelete = async () => {
  if (!window.confirm("このイベントを削除してもよろしいですか？")) return;

  const res = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    navigate("/events");
  } else {
    alert("削除に失敗しました");
  }
};
  

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
     <div style={{
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

        {/* カレンダー表示部分 */}
        <div style={styles.card}>
            <div style={{ display: "flex", alignItems: "center" }}>
            <Calendar size={22} color="#815D51" />
            <span style={{ marginLeft: 10, color: "#815D51", width: "60px" }}>date:</span>
            <span style={{ color: "#815D51", fontWeight: "bold" }}>
            {/* event.date が "2026-03-12" の形式であることを確認して分割 */}
            {event.date && typeof event.date === "string" && event.date.includes("-") ? (
            (() => {
            const parts = event.date.split("-");
            const month = parts[1].replace(/^0/, "");
            const day = parts[2].replace(/^0/, "");
            return `${month}/${day}`;
             })()
            ) : (
             "未設定"
            )}
            </span>
            </div>
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
         {event.people?.map((p) => (
            <div key={p.id}>{p.name}</div>
        ))}
        </div>

        

        {/* memo */}
        <div
        onClick={() => navigate(`/events/${id}/memo`)}
         style={{
            background: "#EEF0E9",
            borderRadius: "20px",
            padding: "15px",
            marginBottom: "15px",
            color: "#815D51",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer"
            }}
            >
            memo
            <ChevronRight size={20} color="#815D51" />
        </div>
        {/* picture */}
        <div 
         onClick={() => navigate(`/events/${id}/photos`)}
         style={{
        background: "#EEF0E9",
        borderRadius: "20px",
        padding: "15px",
        marginBottom: "40px",
        color: "#815D51",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
        }}
        >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Camera size={20} color="#815D51" />
        picture
        </div>

        <ChevronRight size={20} color="#815D51" />
        </div>

        {/* edit button */}
        {/* ボタンエリア */}
        <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleDelete}
            style={{
            background: "#FFB3C1", // 削除っぽい赤系
            border: "none",
            padding: "12px 0",
            borderRadius: "10px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            flex: 1
             }}
            >
            削除
            </button>
  
            <button onClick={() => navigate(`/events/${id}/edit`)}
            style={{
            background: "#88B49A",
            border: "none",
            padding: "12px 0",
            borderRadius: "10px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            flex: 1
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

const styles: any = {
  container: {
    backgroundColor: "#FFFDF6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingTop: "100px"
  },
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "170px",
    zIndex: 9999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  title: {
    color: "#FFFFFF",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    textAlign: "center",
    marginLeft: "30px"
  },
  content: {
    padding: "20px",
    flex: 1
  },
  card: {
    background: "#EEF0E9",
    padding: "16px",
    borderRadius: "10px",
    marginBottom: "16px"
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px"
  },
  label: {
    width: "60px",
    color: "#815D51"
  },
  input: {
    border: "2px solid #7CAD8D",
    borderRadius: "6px",
    padding: "0 8px",
    height: "28px",
    flex: 1,
    color: "#815D51",
    outline: "none",
    backgroundColor: "white"
  },
  personRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
    cursor: "pointer"
  },
  checkbox: {
    width: "22px",
    height: "22px",
    border: "2px solid #7CAD8D",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  doneButton: {
    background: "#7CAD8D",
    border: "none",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    width: "100%",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "bold"
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    border: "2px solid #7CAD8D",
    borderRadius: "8px",
    padding: "8px",
    color: "#815D51",
    outline: "none",
    resize: "none",
    boxSizing: "border-box"
  },
};