import { useEffect, useState } from 'react';
import SensorEstado from './SensorEstado';

function App() {
  const [reles, setReles] = useState([]);

  useEffect(() => {
    fetch('https://habitat-api.vercel.app/api/estado-reles')
      .then(res => res.json())
      .then(json => {
        console.log('Relés recibidos:', json);
        setReles(Array.isArray(json.datos) ? json.datos : []);
      })
      .catch(err => {
        console.error('Error al cargar reles:', err);
        setReles([]);
      });
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

      {[1, 2].map(habitat_id => (
        <div key={habitat_id} style={{ marginBottom: '2rem' }}>
          <h2>Hábitat {habitat_id}</h2>
          <SensorEstado habitat_id={habitat_id} />

          {reles.filter(r => r.habitat_id === habitat_id).length > 0 ? (
            [...reles]
              .filter(r => r.habitat_id === habitat_id)
              .sort((a, b) => a.rele - b.rele)
              .map(({ rele, estado }) => (
                <div key={`${habitat_id}-${rele}`} style={{ marginTop: '1rem' }}>
                  <p>Relé {rele}: {estado ? '🟢 Encendido' : '⚫ Apagado'}</p>
                  <button onClick={() => controlarRele(habitat_id, rele, true)}>Encender</button>
                  <button onClick={() => controlarRele(habitat_id, rele, false)} style={{ marginLeft: '1rem' }}>Apagar</button>
                </div>
              ))
          ) : (
            <p>🔌 Relés no disponibles</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
