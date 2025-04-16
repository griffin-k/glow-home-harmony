
import Layout from "@/components/layout/Layout";
import LightToggleCard from "@/components/controls/LightToggleCard";
import BackButton from "@/components/navigation/BackButton";
import { mockFirebase } from "@/services/mockFirebase";
import { useEffect, useState } from "react";

const Lights = () => {
  const [controlState, setControlState] = useState<Record<string, boolean>>({});
  
  const lightsList = [
    { id: "light1", name: "Living Room" },
    { id: "light2", name: "Kitchen" },
    { id: "light3", name: "Master Bedroom" },
    { id: "light4", name: "Bathroom" },
    { id: "light5", name: "Hallway" },
    { id: "light6", name: "Office" },
  ];
  
  useEffect(() => {
    // Initialize control states
    const initialState: Record<string, boolean> = {};
    lightsList.forEach(light => {
      const state = mockFirebase.getControlState(light.id);
      initialState[light.id] = state === true;
    });
    setControlState(initialState);
    
    // Subscribe to control state changes
    const unsubscribe = mockFirebase.onDataChange("controls", (data) => {
      const updatedState: Record<string, boolean> = {};
      lightsList.forEach(light => {
        if (light.id in data) {
          updatedState[light.id] = data[light.id] === true;
        }
      });
      setControlState(prevState => ({ ...prevState, ...updatedState }));
    });
    
    return unsubscribe;
  }, []);

  const handleLightToggle = (id: string, state: boolean) => {
    console.log(`Light ${id} toggled: ${state ? "ON" : "OFF"}`);
    mockFirebase.updateControlState(id, state);
  };

  return (
    <Layout>
      <BackButton to="/" />
      <h1 className="text-3xl font-bold mb-6 text-smarthome-primary">Lights Control</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lightsList.map((light) => (
          <LightToggleCard
            key={light.id}
            name={light.name}
            initialState={!!controlState[light.id]}
            onToggle={(state) => handleLightToggle(light.id, state)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Lights;
