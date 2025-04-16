
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  status?: "normal" | "warning" | "danger";
  unit?: string;
}

const SensorCard = ({ title, value, icon, status = "normal", unit }: SensorCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card-hover p-4 flex flex-col items-center justify-center animate-scale-in",
        status === "warning" && "warning-glow",
        status === "danger" && "danger-glow"
      )}
    >
      <div className="mb-2 text-smarthome-primary">{icon}</div>
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <div className="mt-2 text-2xl font-semibold flex items-end">
        <span className={cn(
          "animate-pulse-slow",
          status === "warning" && "text-amber-600",
          status === "danger" && "text-red-600",
          status === "normal" && "text-smarthome-primary"
        )}>
          {value}
        </span>
        {unit && <span className="text-sm ml-1 text-gray-500">{unit}</span>}
      </div>
    </div>
  );
};

export default SensorCard;
