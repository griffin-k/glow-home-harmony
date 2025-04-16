
import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface LightToggleCardProps {
  name: string;
  initialState?: boolean;
  onToggle?: (isOn: boolean) => void;
}

const LightToggleCard = ({ 
  name, 
  initialState = false, 
  onToggle 
}: LightToggleCardProps) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = (checked: boolean) => {
    setIsOn(checked);
    if (onToggle) {
      onToggle(checked);
    }
  };

  return (
    <div className={cn(
      "glass-card p-4 flex flex-col items-center transition-all duration-300",
      isOn && "sensor-glow bg-white/40"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300",
        isOn ? "text-yellow-400" : "text-gray-400"
      )}>
        <Lightbulb size={28} className={cn(
          "transition-all duration-300",
          isOn && "animate-pulse-slow"
        )} />
      </div>
      <h3 className="text-lg font-medium mb-3 text-smarthome-primary">{name}</h3>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-sm font-medium",
          isOn ? "text-smarthome-primary" : "text-gray-500"
        )}>
          {isOn ? "ON" : "OFF"}
        </span>
        <Switch 
          checked={isOn} 
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-smarthome-primary"
        />
      </div>
    </div>
  );
};

export default LightToggleCard;
