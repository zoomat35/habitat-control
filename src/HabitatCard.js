import { useEffect, useState } from 'react';

function HabitatCard({ habitatId }) {
  const [sensor, setSensor] = useState(null);
  const [reles, setReles] = useState([]);

  useEffect(() => {
    cargarSensor();
    cargarReles();
  }, []);

  async function cargarSensor() {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/leer');
      const json = await res.json();
      const datosFiltrados = json.datos.filter(d => d.habitat_id === habitatId);
      setSensor(datosFiltrados[0]);
    } catch (err) {
      console.error("Error al cargar sensores:", err);
    }
  }

  async function cargarReles() {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/reles');
      const json = await res.json();
      console.log("Relés recibidos:", json.datos); // 👈 Diagnóstico
      const filtrados = json.datos.filter(r => r.habitat_id === habitatId);
      console.log("Filtrados:", filtrados); // 👈 Diagnóstico
      setReles(filtrados);
    } catch (err) {
      console.error("Error al cargar relés:", err);
    }
  }

  async function controlarRele(rele, estado) {
    try {
      await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id: habitatId, rele, estado })
      });
      cargarReles();
    } catch (err) {
      console.error("Error al controlar relé:", err);
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>Hábitat {habitatId}</h2>

      {sensor ? (
        <p>🌡️ {sensor.temperatura}°C | 💧 {sensor.humedad}%</p>
      ) : (
        <p>🔄 Cargando sensores...</p>
      )}

      {reles.length > 0 ? (
        reles.map(r => (
          <div key={r.rele}>
            <p>Relé {r.rele}: {r.estado ? '🟢 Encendido' : '⚫ Apagado'}</p>
            <button onClick={() => controlarRele(r.rele, true)}>Encender</button>
            <button onClick={() => controlarRele(r.rele, false)}>Apagar</button>
          </div>
        ))
      ) : (
        <p>⚠️ No hay relés registrados para este hábitat.</p>
      )}
    </div>
  );
}

export default HabitatCard;
