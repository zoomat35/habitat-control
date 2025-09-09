import { useEffect, useState } from 'react';

function HabitatCard({ habitatId, releId }) {
  const [sensor, setSensor] = useState(null);
  const [estadoRele, setEstadoRele] = useState(null);

  useEffect(() => {
    cargarSensor();
    cargarEstadoRele();
  }, []);

  async function cargarSensor() {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/leer');
      const json = await res.json();
      const datosFiltrados = json.datos
        .filter(d => d.habitat_id === habitatId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // más reciente primero
      setSensor(datosFiltrados[0]);
    } catch (err) {
      console.error("Error al cargar sensores:", err);
    }
  }

  async function cargarEstadoRele() {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/reles');
      const json = await res.json();
      const registros = json.datos
        .filter(r => r.habitat_id === habitatId && r.rele === releId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // más reciente primero
      if (registros.length > 0) {
        setEstadoRele(registros[0].estado);
      }
    } catch (err) {
      console.error("Error al cargar relé:", err);
    }
  }

  async function toggleRele() {
    try {
      const nuevoEstado = !estadoRele;
      await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id: habitatId, rele: releId, estado: nuevoEstado })
      });
      setEstadoRele(nuevoEstado);
    } catch (err) {
      console.error("Error al cambiar estado del relé:", err);
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

      {estadoRele !== null ? (
        <div>
          <p>Relé {releId}: {estadoRele ? '🟢 Encendido' : '🔴 Apagado'}</p>
          <button onClick={toggleRele}>
            {estadoRele ? 'Apagar' : 'Encender'}
          </button>
        </div>
      ) : (
        <p>⚠️ No hay estado registrado para el relé {releId}.</p>
      )}
    </div>
  );
}

export default HabitatCard;
