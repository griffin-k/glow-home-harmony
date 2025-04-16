
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  to: string;
  label?: string;
}

const BackButton = ({ to, label = "Back to Dashboard" }: BackButtonProps) => {
  return (
    <Link 
      to={to} 
      className="inline-flex items-center mb-6 text-smarthome-primary hover:underline gap-1 group transition-all duration-200"
    >
      <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
      <span>{label}</span>
    </Link>
  );
};

export default BackButton;
