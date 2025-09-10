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
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      if (registros.length > 0) {
        setEstadoRele(registros[0].estado);
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
    <div style={{ marginBottom: '1rem' }}>
      <p>Relé {releId}: {estadoRele ? '🟢 Encendido' : '⚫ Apagado'}</p>
      <button onClick={toggleRele} disabled={cargando}>
        {cargando ? 'Actualizando...' : estadoRele ? 'Apagar' : 'Encender'}
      </button>
    </div>
  );
}

export default HabitatCard;

