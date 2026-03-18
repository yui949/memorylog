import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PeopleEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [mbti, setMbti] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [reliability, setReliability] = useState("");
  const [other, setOther] = useState("");
  const [nextTopic, setNextTopic] = useState(""); // ステート追加

  useEffect(() => {
    if (!id) return;
    const fetchPerson = async () => {
      try {
        const res = await fetch(`http://localhost:3000/people/${id}`);
        if (res.ok) {
          const data = await res.json();
          setName(data.name || "");
          setGroup(data.group || "");
          setMbti(data.mbti || "");
          setBloodType(data.blood_type || "");
          setReliability(data.reliability || "");
          setOther(data.other || "");
          setNextTopic(data.next_topic || ""); // 修正：setNextTopicを使用
        }
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };
    fetchPerson();
  }, [id]);

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3000/people/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        person: {
          name,
          group,
          mbti,
          blood_type: bloodType,
          reliability,
          other,
          next_topic: nextTopic, // Railsに送るデータ
        },
      }),
    });

    if (res.ok) {
      navigate("/people");
    } else {
      alert("保存に失敗しました");
    }
  };

  return (
    <div style={styles.container}>
      {/* --- ここを追加：トップバー --- */}
      <div style={styles.topBar}>
        <h2 style={styles.title}>人を編集</h2>
        <X size={28} color="#FFFFFF" onClick={() => navigate("/people")} style={{ cursor: "pointer" }} />
      </div>

      <Header />
      
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>name:</span>
            <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={styles.row}>
            <span style={styles.label}>group:</span>
            <input style={styles.input} value={group} onChange={(e) => setGroup(e.target.value)} />
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ color: "#815D51", marginBottom: "8px" }}>memo</div>
          <div style={styles.row}><span style={styles.label}>MBTI:</span><input style={styles.input} value={mbti} onChange={(e) => setMbti(e.target.value)} /></div>
          <div style={styles.row}><span style={styles.label}>血液型:</span><input style={styles.input} value={bloodType} onChange={(e) => setBloodType(e.target.value)} /></div>
          <div style={styles.row}><span style={styles.label}>信頼度:</span><input style={styles.input} value={reliability} onChange={(e) => setReliability(e.target.value)} /></div>
          <div style={styles.row}><span style={styles.label}>メモ:</span><textarea style={styles.textarea} value={other} onChange={(e) => setOther(e.target.value)} /></div>
          <div style={styles.row}>
            <span style={styles.label}>次話す:</span>
            <textarea style={styles.textarea} value={nextTopic} onChange={(e) => setNextTopic(e.target.value)} />
          </div>
        </div>
        <button style={styles.doneButton} onClick={handleSubmit}>保存</button>
      </div>
      <Footer />
    </div>
  );
}

// styles は現状のままでOKです

const styles: any = {
  container: {
    backgroundColor: "#FFFDF6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingTop: "100px",
  },
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "155px",
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
    marginLeft: "30px",
  },
  content: {
    padding: "20px",
    flex: 1,
  },
  card: {
    background: "#EEF0E9",
    padding: "16px",
    borderRadius: "10px",
    marginBottom: "16px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  label: {
    width: "60px",
    color: "#815D51",
  },
  input: {
    border: "2px solid #7CAD8D",
    borderRadius: "6px",
    padding: "0 8px",
    height: "28px",
    flex: 1,
    color: "#815D51",
    outline: "none",
    backgroundColor: "white",
  },
  doneButton: {
    display: "block",
    background: "#7CAD8D",
    border: "none",
    color: "white",
    margin: "20px auto 0",
    padding: "12px",
    borderRadius: "6px",
    width: "50%",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  textarea: {
    border: "2px solid #7CAD8D",
    borderRadius: "8px",
    padding: "8px",
    flex: 1,
    color: "#815D51",
    outline: "none",
    resize: "none",
    minHeight: "80px",
  },
};