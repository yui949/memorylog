import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { ChevronLeft } from "lucide-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Person = {
  id: number;
  name: string;
  group: string | null;
  mbti?: string;
  blood_type?: string;
  memo?: string;
  next_topic?: string;
};

export default function PeopleDetail() {

  const { id } = useParams();   // URLのid取得
  const [person, setPerson] = useState<Person | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
  if (!window.confirm("この人を削除しますか？")) return;

  try {
    const res = await fetch(`http://localhost:3000/people/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("削除失敗");
    }

    alert("削除しました");
    navigate("/people");
  } catch (error) {
    console.error(error);
    alert("削除に失敗しました");
  }
};

  useEffect(() => {
    fetch(`http://localhost:3000/people/${id}`)
      .then(res => res.json())
      .then(data => setPerson(data));
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

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
          paddingTop: "150px",
          paddingBottom: "100px",
          paddingLeft: "20px",
          paddingRight: "20px"
        }}
      >

        {/* アイコン */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#B9D8C2",
            margin: "0 auto"
          }}
        />

        {/* 名前 */}
        <h2 style={{ textAlign: "center", marginTop: "20px" ,color: "#815D51" }}>
          {person.name}
        </h2>

        {/* group */}
        <p style={{ textAlign: "center", color: "#815D51" }}>
          {person.group ?? "group"}
        </p>

        {/* 情報カード */}
        <div
          style={{
            marginTop: "30px",
            background: "#EEF0E9",
            padding: "20px",
            borderRadius: "20px"
          }}
        >

          <div style={{ marginBottom: "10px", color: "#815D51" }}>
           MBTI : {person.mbti ?? "未登録"}
          </div>

          <div style={{ marginBottom: "10px", color: "#815D51" }}>
           血液型 : {person.blood_type ?? "未登録"}
          </div>

          <div style={{ marginBottom: "10px", color: "#815D51" }}>
           メモ : {person.memo ?? "なし"}
          </div>

          <div style={{ marginTop: "15px", color: "#815D51" }}>
           次話したいこと : {person.next_topic ?? "なし"}
          </div>

        </div>
<div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
  <button
    onClick={handleDelete}
    style={{
      background: "#FFB3C1",
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

  <button
    onClick={() => navigate(`/people/${id}/edit`)}
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
      
    </>
  );
}