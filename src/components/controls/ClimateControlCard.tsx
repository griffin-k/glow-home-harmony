
import { useState } from "react";
import { Fan, Thermometer, ChevronUp, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ClimateControlCardProps {
  type: "fan" | "ac";
  name: string;
  initialState?: boolean;
  initialLevel?: number;
  onToggle?: (isOn: boolean) => void;
  onLevelChange?: (level: number) => void;
}

const ClimateControlCard = ({
  type,
  name,
  initialState = false,
  initialLevel = 3,
  onToggle,
  onLevelChange,
}: ClimateControlCardProps) => {
  const [isOn, setIsOn] = useState(initialState);
  const [level, setLevel] = useState(initialLevel);

  const handleToggle = (checked: boolean) => {
    setIsOn(checked);
    if (onToggle) {
      onToggle(checked);
    }
  };

  const handleLevelChange = (value: number[]) => {
    const newLevel = value[0];
    setLevel(newLevel);
    if (onLevelChange) {
      onLevelChange(newLevel);
    }
  };

  return (
    <div
      className={cn(
        "glass-card p-5 transition-all duration-300",
        isOn && "sensor-glow bg-white/40"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isOn ? "text-smarthome-primary" : "text-gray-400"
            )}
          >
            {type === "fan" ? (
              <Fan size={24} className={isOn ? "animate-spin" : ""} />
            ) : (
              <Thermometer size={24} />
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-smarthome-primary">{name}</h3>
            <p className="text-sm text-gray-500">
              {isOn ? (
                type === "fan" ? (
                  `Speed: ${level}`
                ) : (
                  `Temperature: ${20 + level}°C`
                )
              ) : (
                "Off"
              )}
            </p>
          </div>
        </div>
        <Switch
          checked={isOn}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-smarthome-primary"
        />
      </div>

      {isOn && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              {type === "fan" ? "Fan Speed" : "Temperature"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLevelChange([Math.max(1, level - 1)])}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <ChevronDown size={16} />
              </button>
              <span className="text-sm font-medium w-8 text-center">
                {type === "fan" ? level : `${20 + level}°`}
              </span>
              <button
                onClick={() => handleLevelChange([Math.min(5, level + 1)])}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
          <Slider
            value={[level]}
            min={1}
            max={5}
            step={1}
            onValueChange={handleLevelChange}
            className={cn(
              "mt-2",
              isOn && "accent-smarthome-primary"
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ClimateControlCard;
