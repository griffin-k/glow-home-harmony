
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface ControlCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
}

const ControlCard = ({ title, description, icon, to }: ControlCardProps) => {
  return (
    <Link to={to} className="block">
      <div className="glass-card-hover p-6 h-full flex flex-col items-center text-center transition-all duration-300">
        <div className="w-16 h-16 flex items-center justify-center text-smarthome-primary mb-4 animate-float">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-smarthome-primary">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default ControlCard;
