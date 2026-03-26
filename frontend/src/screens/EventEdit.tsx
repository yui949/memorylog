import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Check, Camera, CalendarSearch } from "lucide-react";

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

  const [photos, setPhotos] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<any[]>([]);
  const [removePhotoIds, setRemovePhotoIds] = useState<number[]>([]);

  const [date, setDate] = useState("");

   const togglePerson = (personId: number) => {
  if (selectedPeople.includes(personId)) {
    setSelectedPeople(selectedPeople.filter((p) => p !== personId));
  } else {
    setSelectedPeople([...selectedPeople, personId]);
  }
};


  useEffect(() => {
  // ⭐① 全員の人を取得（これが大事）
  fetch(`${process.env.REACT_APP_API_URL}/people`)
    .then((res) => res.json())
    .then((data) => setPeople(data));

  // ⭐② 編集中イベントのデータ取得
  if (id) {
    fetch(`${process.env.REACT_APP_API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setPlace(data.place || "");
        setMemo(data.memo || "");
        setDate(data.date || "");

        // ⭐選択状態セット
        if (data.people) {
          setSelectedPeople(data.people.map((p: any) => p.id));
        }

        setExistingPhotos(data.photos || []);
      });
  }
}, [id]);

  const updateEvent = async () => {
  try {
    const formData = new FormData();
   
    // 基本データ
    formData.append("title", title);
    formData.append("place", place);
    formData.append("memo", memo);
    formData.append("date", date);

    // 人
    selectedPeople.forEach((id) => {
      formData.append("people_ids[]", String(id));
    });

    // 🔥 新しく追加した画像
    photos.forEach((file :File) => {
      formData.append("photos[]", file);
    });

    // 🔥 削除する画像
    removePhotoIds.forEach((id) => {
      formData.append("remove_photo_ids[]", String(id));
    });

    const res = await fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
      method: "PATCH",
      body: formData // ←これが重要
    });

    if (res.ok) {
      navigate(`/events/${id}`);
    } else {
      alert("更新失敗（Railsログ見て）");
    }
  } catch (error) {
    alert("通信失敗");
  }
};

  return (
    <div style={styles.container}>
      {/* ⭐上部バーをNewと統一 */}
      <div style={styles.topBar}>
        <h2 style={styles.title}>イベントを編集</h2>
        <X size={28} color="#815D51" onClick={() => navigate(`/events/${id}`)} /> {/* ⭐変更 */}
      </div>

      <Header />

      <div style={styles.content}>
        {/* title & place */}
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

        {/* ⭐ people UI完全修正 */}
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
          <div style={{ color: "#815D51", marginBottom: "8px" }}>memo</div>

          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* ⭐ picture */}
        <div style={styles.card}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <Camera size={22} color="#815D51" /> {/* ⭐変更 */}
            <span style={{ marginLeft: 10, color: "#815D51" }}>picture</span>
          </div>

          {/* ⭐既存画像 */}
          {existingPhotos.map((photo, index) => (
            <div key={photo.id}>
            <img src={photo.url} style={{ width: "100px" }} />

            <button onClick={() => {
        // UIから消す
        setExistingPhotos(existingPhotos.filter(p => p.id !== photo.id));

        // 🔥 Railsに送る削除ID
        setRemovePhotoIds([...removePhotoIds, photo.id]);
        }}
        >
        削除
        </button>
    </div>
    ))}

          {/* ⭐新規追加 */}
          <input
            type="file"
            multiple
            onChange={(e) => {
              if (!e.target.files) return;
              setPhotos(Array.from(e.target.files));
            }}
          />

          {/* ⭐新規プレビュー */}
          {photos.map((photo, index) => (
            <div key={index} style={{ marginTop: "8px" }}>
              {photo.name}
              <button
                onClick={() => {
                  const newPhotos = photos.filter((_, i) => i !== index);
                  setPhotos(newPhotos);
                }}
              >
                削除
              </button>
            </div>
          ))}
        </div>

        {/* ⭐ボタンも統一 */}
        <button style={styles.doneButton} onClick={updateEvent}>
          保存
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
    padding: "100px 20px 20px 20px",
    flex: 1
  },

  // ⭐Newと揃えた
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "150px",
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
    paddingTop: "90px", 
    paddingBottom: "200px",
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
  }
};