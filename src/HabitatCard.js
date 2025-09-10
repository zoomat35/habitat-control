import { useEffect, useState } from 'react';

function HabitatCard({ habitatId, releId }) {
  const [estadoRele, setEstadoRele] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarEstadoRele();
  }, []);

  async function cargarEstadoRele() {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/reles');
      const json = await res.json();

      const registros = json.datos
        .filter(r => r.habitat_id === habitatId && r.rele === releId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // más reciente primero

      if (registros.length > 0) {
        setEstadoRele(registros[0].estado); // solo el último
      }
    } catch (err) {
      console.error("Error al cargar estado del relé:", err);
    }
  }

  async function toggleRele() {
    try {
      setCargando(true);
      const nuevoEstado = !estadoRele;
      await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id: habitatId, rele: releId, estado: nuevoEstado })
      });
      setEstadoRele(nuevoEstado);
    } catch (err) {
      console.error("Error al cambiar estado del relé:", err);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>Hábitat {habitatId}</h2>
      {estadoRele !== null ? (
        <div>
          <p>Relé {releId}: {estadoRele ? '🟢 Encendido' : '⚫ Apagado'}</p>
          <button onClick={toggleRele} disabled={cargando}>
            {cargando ? 'Actualizando...' : estadoRele ? 'Apagar' : 'Encender'}
          </button>
        </div>
      ) : (
        <p>⚠️ Estado no disponible</p>
      )}
    </div>
  );
}

export default HabitatCard;
