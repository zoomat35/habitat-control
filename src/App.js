import { useEffect, useState } from 'react';

function App() {
  const [reles, setReles] = useState([]);

  useEffect(() => {
    fetch('https://habitat-api.vercel.app/api/estado-reles')
      .then(res => res.json())
      .then(json => setReles(json.datos))
      .catch(err => console.error('Error al cargar reles:', err));
  }, []);

  async function controlarRele(habitat_id, rele, estado) {
    try {
      await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id, rele, estado })
      });
      setReles(prev =>
        prev.map(r =>
          r.habitat_id === habitat_id && r.rele === rele
            ? { ...r, estado }
            : r
        )
      );
    } catch (err) {
      console.error('Error al controlar relé:', err);
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Panel de Control de Hábitats</h1>
      {reles.map(({ habitat_id, rele, estado }) => (
        <div key={`${habitat_id}-${rele}`} style={{ marginBottom: '1rem' }}>
          <h2>Hábitat {habitat_id}</h2>
          <p>Relé {rele}: {estado ? '🟢 Encendido' : '⚫ Apagado'}</p>
          <button onClick={() => controlarRele(habitat_id, rele, true)}>Encender</button>
          <button onClick={() => controlarRele(habitat_id, rele, false)} style={{ marginLeft: '1rem' }}>Apagar</button>
        </div>
      ))}
    </div>
  );
}

export default App;
