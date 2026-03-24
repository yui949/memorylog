import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // まとめてインポート
import Header from "../components/Header";
import { X, ChevronLeft } from "lucide-react";


// 型定義をRailsのカラム名に合わせる
type Person = {
  id: number;
  name: string;
  group: string | null;
  mbti?: string;
  blood_type?: string;
  reliability?: string; // 追加
  other?: string;       // Rails側がotherならこちらに合わせる
  next_topic?: string;
};

type EventType = {
  id: number;
  title: string;
};

export default function PeopleDetail() {
  const { id } = useParams<{ id: string }>(); 
  const [person, setPerson] = useState<Person | null>(null);
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>([]);

  // 削除処理
  const handleDelete = async () => {
    if (!window.confirm("この人を削除しますか？")) return;

    try {
      const res = await fetch(`http://localhost:3000/people/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("削除失敗");

      alert("削除しました");
      navigate("/people");
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました");
    }
  };

  // データ取得
  useEffect(() => {
  fetch(`http://localhost:3000/people/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setPerson(data.person);
      setEvents(data.events);
    })
    .catch((err) => console.error("取得エラー:", err));
}, [id]);

  if (!person) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Loading...</div>;
  }

  return (
    <>
    
      {/* 戻るボタン */}
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "20px",
          zIndex: 1000,
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={28} color="#815D51" />
      </div>

      <Header />

      <div
        style={{
          paddingTop: "150px",
          paddingBottom: "100px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {/* アイコン */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#B9D8C2",
            margin: "0 auto",
          }}
        />

        {/* 名前・グループ */}
        <h2 style={{ textAlign: "center", marginTop: "20px", color: "#815D51" }}>
          {person.name}
        </h2>
        <p style={{ textAlign: "center", color: "#815D51", marginBottom: "30px" }}>
          {person.group ?? "グループなし"}
        </p>

        {/* 情報カード */}
        <div
          style={{
            background: "#EEF0E9",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <div style={styles.infoRow}>
            <strong>MBTI :</strong> {person.mbti || "未登録"}
          </div>

          <div style={styles.infoRow}>
            <strong>血液型 :</strong> {person.blood_type || "未登録"}
          </div>

          <div style={styles.infoRow}>
            <strong>信頼度 :</strong> {person.reliability || "未登録"}
          </div>

          <div style={styles.infoRow}>
            <strong>メモ :</strong> {person.other || "なし"}
          </div>

          <div style={{ ...styles.infoRow, marginTop: "15px", borderTop: "1px solid #D1D3CC", paddingTop: "15px" }}>
            <strong>次話したいこと :</strong>
            <div style={{ marginTop: "5px" }}>{person.next_topic || "なし"}</div>
          </div>

          <div
          style={{
          ...styles.infoRow,
          marginTop: "15px",
          borderTop: "1px solid #D1D3CC",
          paddingTop: "15px",
        }}
      >
      <strong>共通イベント :</strong>

      <div
  style={{
    marginTop: "10px",
    maxHeight: "120px", // ←ここがミソ（3件分くらい）
    overflowY: "auto",
  }}
>
        {events.length === 0 ? (
          <div>なし</div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              style={{
                padding: "8px",
                borderRadius: "8px",
                background: "#FFFFFF",
                minHeight: "20px",
                marginBottom: "8px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              {event.title}
            </div>
          ))
        )}
      </div>
    </div>

        </div>

        

        {/* ボタンエリア */}
        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          <button onClick={handleDelete} style={styles.deleteButton}>
            削除
          </button>

          <button
            onClick={() => navigate(`/people/${id}/edit`)}
            style={styles.editButton}
          >
            編集
          </button>
        </div>
      </div>
    </>
  );
}

// スタイル定数
const styles: any = {
  infoRow: {
    marginBottom: "10px",
    color: "#815D51",
    fontSize: "15px",
  },
  deleteButton: {
    background: "#FFB3C1",
    border: "none",
    padding: "12px 0",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    flex: 1,
  },
  editButton: {
    background: "#88B49A",
    border: "none",
    padding: "12px 0",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    flex: 1,
  },
};