import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

type Person = {
  id: number;
  name: string;
  group: string | null;
};

export default function PeopleList() {
  const [people, setPeople] = useState<Person[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/people")
      .then(res => res.json())
      .then(data => setPeople(data));
  }, []);

  return (
    <>
      <Header />

      <div style={{ paddingTop: "180px", paddingBottom: "120px" }}>

        {/* 検索バー */}
        <div
          style={{
            padding: "0 20px",
            marginTop: "-120px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: 20
          }}
        >
          <input
            placeholder="検索"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "12px",
              borderRadius: "20px",
              border: "none"
            }}
          />
        </div>

        {/* People Grid */}
        <div
          style={{
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            position: "relative",
            zIndex: 10
          }}
        >
          {people.map((person) => (
            <div
              key={person.id}
              onClick={() => {
              console.log("clicked");
              navigate(`/people/${person.id}`);
              }}
             
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0,0,0,0.1)";
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                {/* アイコン */}
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#B9D8C2"
                  }}
                />

                <div>
                  <div style={{ fontWeight: "bold" ,color: "#815D51" }}>{person.name}</div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#815D51"
                    }}
                  >
                    {person.group ?? "group"}
                  </div>
                </div>
              </div>

              {/* 下のカード */}
              <div
                style={{
                  marginTop: "12px",
                  height: "40px",
                  background: "#E3E5DE",
                  borderRadius: "10px"
                }}
              />

              <div
                style={{
                  marginTop: "8px",
                  height: "40px",
                  background: "#E3E5DE",
                  borderRadius: "10px"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}