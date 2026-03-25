import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

type Person = {
  id: number;
  name: string;
  group: string | null;
};

export default function PeopleList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/people`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPeople(data);
        }
      });
  }, []);

  return (
    <div style={{ background: "#FFFDF6", minHeight: "100vh" }}>
      <Header />

      {/* 1. 検索バーを画面上部に固定 */}
      <div
        style={{
          position: "fixed",
          top: "60px", // ヘッダーのすぐ下に配置（適宜調整してください）
          left: 0,
          right: 0,
          padding: "0 20px",
          display: "flex",
          justifyContent: "center",
          zIndex: 1000, // カードより手前に表示
        }}
      >
        <input
          placeholder="検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "12px",
            borderRadius: "20px",//角の丸み
            border: "none",
            outline: "none",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            color: "#815D51"
          }}
        />
      </div>

      {/* 2. メインコンテンツの余白調整 */}
      <div style={{ 
        paddingTop: "160px", // 固定バーと重ならないための余白
        paddingBottom: "120px", // フッターと重ならないための余白
        paddingLeft: "20px",
        paddingRight: "20px"
      }}>

        {/* People Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}
        >
          {people
            .filter((person) => 
              person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              (person.group && person.group.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((person) => (
            <div
              key={person.id}
              onClick={() => navigate(`/people/${person.id}`)}
              
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}

              style={{
                background: "#EEF0E9",
                borderRadius: "20px",
                padding: "16px",
                transition: "0.25s",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* アイコン */}
                <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#B9D8C2",
                    flexShrink: 0
                  }}
                />

                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontWeight: "bold", color: "#815D51", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {person.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#815D51", opacity: 0.8 }}>
                    {person.group ?? "group"}
                  </div>
                </div>
              </div>

              {/* 下の装飾用カード */}
              <div style={{ marginTop: "12px", height: "40px", background: "#E3E5DE", borderRadius: "10px" }} />
              <div style={{ marginTop: "8px", height: "40px", background: "#E3E5DE", borderRadius: "10px" }} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <FloatingButton onClick={() => navigate("/people/new")} />
    </div>
  );
}

const styles: any = {
  container: {
    backgroundColor: "#FFFDF6",
  },

  content: {
    padding: "20px",
    marginTop: "155px"
  },

  card: {
    background: "#EEF0E9",
  },

  footer: {   // ← ここに入れる！！
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999
  }
};