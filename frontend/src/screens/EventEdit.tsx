import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, CalendarSearch, Check } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

type Person = {
  id: number;
  name: string;
};

export default function EventEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [memo, setMemo] = useState("");

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);

  // 1. データの読み込み
  useEffect(() => {
    // 全ユーザーの取得
    fetch("http://localhost:3000/people")
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((err) => console.error("People取得失敗:", err));

    // 編集対象イベントの取得
    if (id) {
      fetch(`http://localhost:3000/events/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("イベントが見つかりません");
          return res.json();
        })
        .then((data) => {
          setTitle(data.title || "");
          setPlace(data.place || "");
          setMemo(data.memo || "");
          if (data.people) {
            setSelectedPeople(data.people.map((p: any) => p.id));
          }
        })
        .catch((err) => console.error("Event取得失敗 (404等):", err));
    }
  }, [id]);

  // 2. 更新処理
  const updateEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
       body: JSON.stringify({
        title: title,
        place: place,
        memo: memo,
        people_ids: selectedPeople
        })
      });

      if (response.ok) {
        navigate("/events"); 
      } else {
        alert("更新に失敗しました。Rails側のログを確認してください。");
      }
    } catch (error) {
      alert("通信に失敗しました。");
    }
  };

  const togglePerson = (personId: number) => {
    if (selectedPeople.includes(personId)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== personId));
    } else {
      setSelectedPeople([...selectedPeople, personId]);
    }
  };

  return (
    <div style={styles.container}>
      {/* 共通ヘッダーを表示 */}
      <Header />

      {/* ヘッダーの上にタイトルとXボタンを重ねる */}
      <div style={styles.headerOverlay}>
        <h2 style={styles.title}>イベントを編集</h2>
        <X
          size={28}
          color="#FFFFFF"
          style={styles.closeIcon}
          onClick={() => navigate(`/events/${id}`)}
        />
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>title:</span>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={styles.row}>
            <span style={styles.label}>place:</span>
            <input
              style={styles.input}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.cardRow}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarSearch size={22} color="#815D51" />
            <span style={{ marginLeft: 10, color: "#815D51" }}>日付の編集（未実装）</span>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ color: "#815D51", marginBottom: "8px" }}>people:</div>
          {people.map((person) => (
            <div
              key={person.id}
              style={styles.personRow}
              onClick={() => togglePerson(person.id)}
            >
              <div style={styles.checkbox}>
                {selectedPeople.includes(person.id) && <Check size={16} color="#7CAD8D" />}
              </div>
              <span style={{ color: "#815D51" }}>{person.name}</span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
            <div style={{ color: "#815D51", marginBottom: "8px" }}>memo </div>

            <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            style={styles.textarea}
             />
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button style={styles.doneButton} onClick={updateEvent}>
            変更を保存
          </button>
        </div>
      </div>

      <Footer />
    </div>
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
  headerOverlay: {
    position: "fixed",
    top: 35,
    left: 0,
    right: 0,
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10001,
    pointerEvents: "none", // 背後の要素を邪魔しない
  },
  title: {
    color: "#FFFFFF",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  closeIcon: {
    cursor: "pointer",
    position: "absolute",
    right: "20px",
    pointerEvents: "auto", // これでクリックが効くようになります
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
  cardRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    padding: "12px 60px", 
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    pointerEvents: "auto"
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
}
};