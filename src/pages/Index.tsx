
import Layout from "@/components/layout/Layout";
import SensorCard from "@/components/dashboard/SensorCard";
import ControlCard from "@/components/dashboard/ControlCard";
import { Thermometer, Droplet, AlarmSmoke, Flame, Lightbulb, Fan } from "lucide-react";
import { mockFirebase } from "@/services/mockFirebase";
import { useEffect, useState } from "react";

const Index = () => {
  // Initialize with mock data from our service
  const [sensorData, setSensorData] = useState(mockFirebase.getSensorData());
  
  useEffect(() => {
    // Subscribe to sensor data updates
    const unsubscribe = mockFirebase.onDataChange("sensors", (data) => {
      setSensorData(data);
    });
    
    // Cleanup on unmount
    return unsubscribe;
  }, []);

  return (
    <Layout>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-smarthome-primary">Sensors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SensorCard
            title="Temperature"
            value={sensorData.temperature}
            unit="°C"
            icon={<Thermometer size={32} />}
            status={sensorData.temperature > 30 ? "danger" : sensorData.temperature > 25 ? "warning" : "normal"}
          />
          <SensorCard
            title="Humidity"
            value={sensorData.humidity}
            unit="%"
            icon={<Droplet size={32} />}
            status={sensorData.humidity < 30 ? "warning" : "normal"}
          />
          <SensorCard
            title="Smoke"
            value={sensorData.smoke}
            icon={<AlarmSmoke size={32} />}
            status={sensorData.smoke === "Smoke Detected" ? "danger" : "normal"}
          />
          <SensorCard
            title="Flame"
            value={sensorData.flame}
            icon={<Flame size={32} />}
            status={sensorData.flame === "Flame Detected" ? "danger" : "normal"}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-smarthome-primary">Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ControlCard
            title="Lights Control"
            description="Control all lights in your home"
            icon={<Lightbulb size={40} />}
            to="/lights"
          />
          <ControlCard
            title="Climate Control"
            description="Control fan and AC units"
            icon={<Fan size={40} />}
            to="/climate"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
