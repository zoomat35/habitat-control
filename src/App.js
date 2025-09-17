import SensorEstado from './SensorEstado';

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
      <SensorEstado habitat_id={1} />
      <div style={{ marginBottom: '1rem' }}>
        <p>🔌 Relé 1</p>
        <button onClick={() => controlarRele(1, 1, true)}>Encender</button>
        <button onClick={() => controlarRele(1, 1, false)}>Apagar</button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <p>🔌 Relé 2</p>
        <button onClick={() => controlarRele(1, 2, true)}>Encender</button>
        <button onClick={() => controlarRele(1, 2, false)}>Apagar</button>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h1>🌿 Control de Hábitat 2</h1>
      <SensorEstado habitat_id={2} />
      <div style={{ marginBottom: '1rem' }}>
        <p>🔌 Relé 1</p>
        <button onClick={() => controlarRele(2, 1, true)}>Encender</button>
        <button onClick={() => controlarRele(2, 1, false)}>Apagar</button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <p>🔌 Relé 2</p>
        <button onClick={() => controlarRele(2, 2, true)}>Encender</button>
        <button onClick={() => controlarRele(2, 2, false)}>Apagar</button>
      </div>
    </div>
  );
}

export default App;

