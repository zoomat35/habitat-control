import React from 'react';
import SensorInfo from './SensorInfo';

function App() {
  const controlarRele = async (habitat_id, rele, estado) => {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id, rele, estado }),
      });

      const data = await res.json();
      console.log('✅ Estado actualizado:', data);
    } catch (error) {
      console.error('❌ Error al controlar el relé:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🌿 Control de Hábitat 1</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => controlarRele(1, 1, true)}>Encender</button>
        <button onClick={() => controlarRele(1, 1, false)}>Apagar</button>
      </div>

      <SensorInfo habitat_id={1} />
    </div>
  );
}

export default App;
