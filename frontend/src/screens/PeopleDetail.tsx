import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

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
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
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

          <div style={{ marginBottom: "10px" }}>
            MBTI : XXXX
          </div>

          <div style={{ marginBottom: "10px" }}>
            血液型 : X
          </div>

          <div>
            メモ : ここにメモ
          </div>

          <div>
           <h3>次話したいこと</h3>
           <p>{person.next_topic}</p>
          </div>

        </div>

      </div>
    </>
  );
}