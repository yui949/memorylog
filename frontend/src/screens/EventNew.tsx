import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Camera, CalendarSearch, Check } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

type Person = {
  id: number;
  name: string;
};

export default function EventNew() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
　const [memo, setMemo] = useState(""); 
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);

  // 人一覧取得
  useEffect(() => {
    fetch("http://localhost:3000/people")
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  // チェック切り替え
  const togglePerson = (id: number) => {
    if (selectedPeople.includes(id)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== id));
    } else {
      setSelectedPeople([...selectedPeople, id]);
    }
  };

  // イベント保存
  const createEvent = async () => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
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
      alert("保存失敗");
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. 一番上にタイトルバーを配置 */}
      <div style={styles.topBar}>
        <h2 style={styles.title}>イベントを追加</h2>
        <X
          size={28}
          color="#FFFFFF"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/events")}
        />
      </div>

      {/* 2. その下に共通ヘッダー */}
      <Header />

      <div style={styles.content}>
        {/* title place */}
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

        {/* date */}
        <div style={styles.cardRow}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarSearch size={22} color="#815D51" />
            <span style={{ marginLeft: 10, color: "#815D51" }}> : 3/X</span>
          </div>
        </div>

        {/* people */}
        <div style={styles.card}>
          <div style={{ color: "#815D51", marginBottom: "8px" }}>people:</div>
          {people.map((person) => {
            const selected = selectedPeople.includes(person.id);
            return (
              <div
                key={person.id}
                style={styles.personRow}
                onClick={() => togglePerson(person.id)}
              >
                <div style={styles.checkbox}>
                  {selected && <Check size={16} color="#7CAD8D" />}
                </div>
                <span style={{ color: "#815D51" }}>{person.name}</span>
              </div>
            );
          })}
        </div>

        {/* memo */}
        <div style={styles.card}>
            <div style={{ color: "#815D51", marginBottom: "8px" }}>
            memo
            </div>

            <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            style={styles.textarea}
             />
        </div>

        {/* picture */}
        <div style={styles.cardRow}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Camera size={22} color="#815D51" />
            <span style={{ marginLeft: 10, color: "#815D51" }}>picture</span>
          </div>
          <span style={{ color: "#815D51" }}>›</span>
        </div>

        {/* 完了ボタン */}
        <button style={styles.doneButton} onClick={createEvent}>
          完了
        </button>
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
    // コンテンツがヘッダーに隠れないよう調整
    paddingTop: "100px" 
  },
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "170px",
    zIndex: 9999, // 最前面に持ってくる
    
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
  cardRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#EEF0E9",
    padding: "16px",
    borderRadius: "10px",
    marginBottom: "16px"
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
    background: "#7CAD8D", // 元のボタンの色をキープ
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