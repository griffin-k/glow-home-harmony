
import Layout from "@/components/layout/Layout";
import ClimateControlCard from "@/components/controls/ClimateControlCard";
import BackButton from "@/components/navigation/BackButton";
import { mockFirebase } from "@/services/mockFirebase";
import { useEffect, useState } from "react";

interface ControlState {
  [key: string]: boolean | number;
}

const Climate = () => {
  const [controlState, setControlState] = useState<ControlState>({});
  
  const climateControls = [
    { id: "fan1", name: "Living Room Fan", type: "fan" as const },
    { id: "fan2", name: "Bedroom Fan", type: "fan" as const },
    { id: "ac1", name: "Living Room AC", type: "ac" as const },
    { id: "ac2", name: "Bedroom AC", type: "ac" as const },
  ];
  
  useEffect(() => {
    // Initialize control states
    const initialState: ControlState = {};
    climateControls.forEach(control => {
      const state = mockFirebase.getControlState(control.id);
      const levelState = mockFirebase.getControlState(`${control.id}_level`);
      
      if (state !== null) initialState[control.id] = state;
      if (levelState !== null) initialState[`${control.id}_level`] = levelState;
    });
    setControlState(initialState);
    
    // Subscribe to control state changes
    const unsubscribe = mockFirebase.onDataChange("controls", (data) => {
      setControlState(prevState => ({ ...prevState, ...data }));
    });
    
    return unsubscribe;
  }, []);

  const handleToggle = (id: string, state: boolean) => {
    console.log(`Climate control ${id} toggled: ${state ? "ON" : "OFF"}`);
    mockFirebase.updateControlState(id, state);
  };

  const handleLevelChange = (id: string, level: number) => {
    console.log(`Climate control ${id} level changed to: ${level}`);
    mockFirebase.updateControlState(`${id}_level`, level);
  };

  return (
    <Layout>
      <BackButton to="/" />
      <h1 className="text-3xl font-bold mb-6 text-smarthome-primary">Climate Control</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {climateControls.map((control) => (
          <ClimateControlCard
            key={control.id}
            type={control.type}
            name={control.name}
            initialState={!!controlState[control.id]}
            initialLevel={Number(controlState[`${control.id}_level`]) || 3}
            onToggle={(state) => handleToggle(control.id, state)}
            onLevelChange={(level) => handleLevelChange(control.id, level)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Climate;
