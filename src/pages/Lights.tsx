import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import LightToggleCard from "@/components/controls/LightToggleCard";
import BackButton from "@/components/navigation/BackButton";

// ✅ Firebase setup
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALgmMR6B22JBUrGOj9OjnOOVuk6yImi3Q",
  authDomain: "confrnce-cb336.firebaseapp.com",
  databaseURL: "https://confrnce-cb336-default-rtdb.firebaseio.com",
  projectId: "confrnce-cb336",
  storageBucket: "confrnce-cb336.appspot.com",
  messagingSenderId: "479608003523",
  appId: "1:479608003523:web:5aebafb19ff0f4fb6c3b76"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Lights = () => {
  const [controlState, setControlState] = useState<Record<string, boolean>>({});

  // ✅ Light ID for Firebase, name for UI
  const lightsList = [
    { id: "fan1", name: "Light 1" },
    { id: "fan2", name: "Light 2" },
    { id: "Light3", name: "Light 3" },
    { id: "Light4", name: "Light 4" },
  ];

  useEffect(() => {
    const controlsRef = ref(database, "Controls");

    const unsubscribe = onValue(controlsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newState: Record<string, boolean> = {};
        for (const key in data) {
          newState[key] = data[key] === "ON";
        }
        setControlState(newState);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLightToggle = (id: string, state: boolean) => {
    const status = state ? "ON" : "OFF";
    set(ref(database, `Controls/${id}`), status)
      .then(() => console.log(`✅ ${id} set to ${status}`))
      .catch((err) => console.error(`❌ Error updating ${id}:`, err));
  };

  return (
    <Layout>
      <BackButton to="/" />
      <h1 className="text-3xl font-bold mb-6 text-center text-smarthome-primary">Lights Control</h1>
      <div className="flex justify-center mb-4">
        <hr className="w-16 border-t-4 border-green-800 mb-6 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lightsList.map((light) => (
          <LightToggleCard
            key={light.id}
            id={light.id} // Firebase path: Light1
            name={light.name} // UI: Light 1
            initialState={!!controlState[light.id]}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Lights;
