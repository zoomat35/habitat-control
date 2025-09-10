import { useEffect, useState } from 'react';

function ReleBoton({ habitatId, releId }) {
  const [estado, setEstado] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarEstado();
  }, []);

  async function cargarEstado() {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/estado-reles');
      const json = await res.json();
      const registro = json.datos.find(
        r => r.habitat_id === habitatId && r.rele === releId
      );
      if (registro) setEstado(registro.estado);
    } catch (err) {
      console.error("Error al cargar estado:", err);
    }
  }

  async function cambiarEstado(nuevoEstado) {
    try {
      setCargando(true);
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
      <p>Relé {releId}: {estado === null ? '⏳ Cargando...' : estado ? '🟢 Encendido' : '⚫ Apagado'}</p>
      <button onClick={() => cambiarEstado(true)} disabled={cargando}>
        Encender
      </button>
      <button onClick={() => cambiarEstado(false)} disabled={cargando} style={{ marginLeft: '1rem' }}>
        Apagar
      </button>
    </div>
  );
}

export default ReleBoton;
