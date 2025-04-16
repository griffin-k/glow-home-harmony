
import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    // Simulate occasional connection issues
    const interval = setInterval(() => {
      const connected = Math.random() > 0.05; // 5% chance of disconnection
      setIsConnected(connected);
      
      if (!connected) {
        // Show label for 5 seconds when disconnected
        setShowLabel(true);
        setTimeout(() => setShowLabel(false), 5000);
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2">
      <div 
        className={cn(
          "transition-all duration-300 flex items-center gap-2 py-1 px-3 rounded-full",
          isConnected 
            ? showLabel ? "bg-green-100" : "bg-transparent" 
            : "bg-red-100"
        )}
      >
        {isConnected ? (
          <Wifi size={18} className="text-green-600" />
        ) : (
          <WifiOff size={18} className="text-red-600 animate-pulse" />
        )}
        
        <span 
          className={cn(
            "text-sm transition-all duration-300 whitespace-nowrap",
            isConnected 
              ? showLabel ? "text-green-700 max-w-40 opacity-100" : "max-w-0 opacity-0" 
              : "text-red-700 max-w-40 opacity-100"
          )}
        >
          {isConnected ? "Connected to Firebase" : "Connection lost"}
        </span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
