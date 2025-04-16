interface SensorData {
  temperature: number;
  humidity: number;
  smoke: string;
  flame: string;
}

interface ControlState {
  [key: string]: boolean | number;
}

// Simulate sensor data updates with random fluctuations
class MockFirebaseService {
  private sensorData: SensorData = {
    temperature: 23.5,
    humidity: 45,
    smoke: "No Smoke",
    flame: "No Flame"
  };

  private controlState: ControlState = {
    "light1": false,
    "light2": false,
    "light3": false,
    "light4": false,
    "light5": false,
    "light6": false,
    "fan1": false,
    "fan1_level": 3,
    "fan2": false,
    "fan2_level": 3,
    "ac1": false,
    "ac1_level": 3,
    "ac2": false,
    "ac2_level": 3
  };

  private listeners: { [key: string]: Array<(data: any) => void> } = {
    "sensors": [],
    "controls": []
  };

  constructor() {
    // Simulate sensor data updates
    setInterval(() => {
      // Small random fluctuations
      this.sensorData = {
        temperature: parseFloat((this.sensorData.temperature + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        humidity: Math.round(this.sensorData.humidity + (Math.random() * 2 - 1)),
        smoke: Math.random() > 0.95 ? "Smoke Detected" : "No Smoke",
        flame: Math.random() > 0.98 ? "Flame Detected" : "No Flame"
      };
      
      // Notify listeners
      this.notifyListeners("sensors", this.sensorData);
    }, 3000);
  }

  // Get current sensor data
  getSensorData(): SensorData {
    return { ...this.sensorData };
  }

  // Get control state
  getControlState(controlId: string): boolean | number | null {
    return this.controlState[controlId] ?? null;
  }

  // Update control state
  updateControlState(controlId: string, value: boolean | number): void {
    this.controlState[controlId] = value;
    this.notifyListeners("controls", this.controlState);
  }

  // Listen for data changes
  onDataChange(path: "sensors" | "controls", callback: (data: any) => void): () => void {
    if (!this.listeners[path]) {
      this.listeners[path] = [];
    }
    
    this.listeners[path].push(callback);
    
    // Return function to unsubscribe
    return () => {
      this.listeners[path] = this.listeners[path].filter(listener => listener !== callback);
    };
  }

  // Notify all listeners
  private notifyListeners(path: string, data: any): void {
    if (this.listeners[path]) {
      this.listeners[path].forEach(callback => callback(data));
    }
  }
}

// Export singleton instance
export const mockFirebase = new MockFirebaseService();
