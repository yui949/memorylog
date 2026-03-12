export default function Header() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left:0,
        width: "100%",
        height: "110px",
        background: "#B9D8C2",
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        zIndex: 1,
        pointerEvents: "none"
      }}
    />
  );
}