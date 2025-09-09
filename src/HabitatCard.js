import { useEffect, useState } from 'react';

function HabitatCard({ habitatId }) {
  const [sensor, setSensor] = useState(null);
  const [reles, setReles] = useState([]);

  useEffect(() => {
    cargarSensor();
    cargarReles();
  }, []);

  async function cargarSensor() {
    const res = await fetch('https://habitat-api.vercel.app/api/leer');
    const json = await res.json();
    setSensor(json.datos);
  }

  async function cargarReles() {
    const res = await fetch('https://habitat-api.vercel.app/api/reles');
    const json = await res.json();
    const filtrados = json.datos.filter(r => r.habitat_id === habitatId);
    setReles(filtrados);
  }

  async function controlarRele(rele, estado) {
    await fetch('https://habitat-api.vercel.app/api/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habitat_id: habitatId, rele, estado })
    });
    cargarReles();
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>Hábitat {habitatId}</h2>
      {sensor && (
        <p>🌡️ {sensor.temperatura}°C | 💧 {sensor.humedad}%</p>
      )}
      {reles.map(r => (
        <div key={r.rele}>
          <p>Relé {r.rele}: {r.estado ? '🟢 Encendido' : '⚫ Apagado'}</p>
          <button onClick={() => controlarRele(r.rele, true)}>Encender</button>
          <button onClick={() => controlarRele(r.rele, false)}>Apagar</button>
        </div>
      ))}
    </div>
  );
}

export default HabitatCard;
