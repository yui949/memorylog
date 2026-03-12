import { Users, SquareChartGantt } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeColor = "#815D51";
  const normalColor = "#B9D8C2";

  const isPeople = location.pathname === "/people";
  const isEvents = location.pathname === "/events";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "80px",
        backgroundColor: "#B9D8C2",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
      }}
    >
      {/* Peopleボタン */}
      <button
        onClick={() => navigate("/people")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Users
          size={36}
          color={isPeople ? activeColor : "white"}
        />
      </button>

      {/* Eventsボタン */}
      <button
        onClick={() => navigate("/events")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex:"auto"
        }}
      >
        <SquareChartGantt
          size={36}
          color={isEvents ? activeColor : "white"}
        />
      </button>
    </div>
  );
}