import { useEffect, useState } from 'react';

function ReleBoton({ habitatId, releId }) {
  const [estado, setEstado] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarEstado();
  }, []);

  async function cargarEstado() {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/reles');
      const json = await res.json();
      const registros = json.datos
        .filter(r => r.habitat_id === habitatId && r.rele === releId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      if (registros.length > 0) {
        setEstado(registros[0].estado);
      }
    } catch (err) {
      console.error("Error al cargar estado:", err);
    }
  }

  async function cambiarEstado() {
    try {
      setCargando(true);
      const nuevoEstado = !estado;
      await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id: habitatId, rele: releId, estado: nuevoEstado })
      });
      setEstado(nuevoEstado);
    } catch (err) {
      console.error("Error al cambiar estado:", err);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <p>Relé {releId} ({estado ? '🟢 Encendido' : '⚫ Apagado'})</p>
      <button onClick={cambiarEstado} disabled={cargando}>
        {cargando ? 'Actualizando...' : estado ? 'Apagar' : 'Encender'}
      </button>
    </div>
  );
}

export default ReleBoton;
