import React, { useState, useEffect } from "react";
import { Fan } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALgmMR6B22JBUrGOj9OjnOOVuk6yImi3Q",
  authDomain: "confrnce-cb336.firebaseapp.com",
  databaseURL: "https://confrnce-cb336-default-rtdb.firebaseio.com",
  projectId: "confrnce-cb336",
  storageBucket: "confrnce-cb336.appspot.com",
  messagingSenderId: "479608003523",
  appId: "1:479608003523:web:5aebafb19ff0f4fb6c3b76"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface ClimateControlCardProps {
  id: string;      // Firebase ID (e.g., Light4)
  name: string;    // Display name (e.g., Fan 1)
  initialState?: boolean;
  onToggle: (id: string, state: boolean) => void;  // Added callback to parent
}

const ClimateControlCard = ({ id, name, initialState = false, onToggle }: ClimateControlCardProps) => {
  const [isOn, setIsOn] = useState(initialState);

  useEffect(() => {
    setIsOn(initialState);
  }, [initialState]);

  const handleToggle = (checked: boolean) => {
    setIsOn(checked);
    onToggle(id, checked);  // Pass state change back to parent

    const status = checked ? "ON" : "OFF";
    const dbPath = `Controls/${id}`;

    set(ref(database, dbPath), status)
      .then(() => console.log(`✅ ${id} updated to ${status}`))
      .catch((error) => console.error("❌ Firebase update failed:", error));
  };

  return (
    <div className={cn(
      "glass-card p-4 flex flex-col items-center transition-all duration-300",
      isOn && "sensor-glow bg-white/40"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300",
        isOn ? "text-blue-500" : "text-gray-400"
      )}>
        <Fan size={28} className={cn(
          "transition-all duration-300",
          isOn && "animate-spin-slow"
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

export default ClimateControlCard;
