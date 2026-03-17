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
  const [photos, setPhotos] = useState<File[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/people")
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  const togglePerson = (id: number) => {
    if (selectedPeople.includes(id)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== id));
    } else {
      setSelectedPeople([...selectedPeople, id]);
    }
  };

  // ⭐ これに統一（JSONのcreateEventは使わない）
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("place", place);
    formData.append("memo", memo);
    formData.append("date", date);

    // 人も送る
    selectedPeople.forEach((id) => {
      formData.append("people_ids[]", String(id));
    });

    // 写真
    photos.forEach((photo) => {
      formData.append("photos[]", photo);
    });

    const res = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      navigate("/events");
    } else {
      alert("保存失敗");
    }
  };

  return (
    <div style={styles.container}>
      {/* top */}
      <div style={styles.topBar}>
        <h2 style={styles.title}>イベントを追加</h2>
        <X size={28} color="#FFFFFF" onClick={() => navigate("/events")} />
      </div>

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

　　　　{/* カレンダー */}
        <div style={styles.card}>
            <div style={styles.row}>
                <CalendarSearch size={22} color="#815D51" />
                <span style={{ ...styles.label, marginLeft: 10 }}>date:</span>
                <input
                type="date"
                style={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
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

        {/* ⭐ picture（ここが今回の本体） */}
        <div style={styles.card}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <Camera size={22} color="#815D51" />
            <span style={{ marginLeft: 10, color: "#815D51" }}>picture</span>
          </div>

          <input type="file"
            multiple
            onChange={(e) => {
            if (e.target.files) {
            setPhotos(Array.from(e.target.files));
            }
             }}
        />

        {/* ← inputタグの外に出す！！ */}
        {photos.map((photo, index) => (
        <div key={index} style={{ marginTop: "8px" }}>
        {photo.name}
         </div>
        ))}
          /

          

          {/* 選択中の枚数表示 */}
          {photos.length > 0 && (
            <div style={{ marginTop: "8px", color: "#815D51" }}>
              {photos.length}枚選択中
            </div>
          )}
        </div>


        {/* 完了ボタン */}
        <button style={styles.doneButton} onClick={handleSubmit}>
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
    paddingTop: "100px"
  },
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "160px",
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