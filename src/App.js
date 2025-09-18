// Forzar redeploy del frontend
import SensorEstado from './SensorEstado';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🌿 Control de Hábitat 1</h1>
      <SensorEstado habitat_id={1} />

      <h1>🌿 Control de Hábitat 2</h1>
      <SensorEstado habitat_id={2} />
    </div>
  );
}

export default App;

