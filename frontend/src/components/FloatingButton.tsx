import { Plus } from "lucide-react";

type Props = {
  onClick?: () => void;
};

export default function FloatingButton({ onClick }: Props) {
  return (
     <div
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80px",
        height: "80px",
        background: "#7CAD8D",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        cursor: "pointer",
        zIndex: 1000
       }}
      >
       <Plus size={40} color="#FFFFFF" />
    </div>
 );
}