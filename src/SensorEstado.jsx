import { useEffect, useState } from 'react';

function SensorEstado({ habitat_id }) {
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    fetch(`https://habitat-api.vercel.app/api/ultimo-sensor?habitat_id=${habitat_id}`)
      .then(res => res.json())
      .then(json => {
        console.log(`📡 Sensor recibido para hábitat ${habitat_id}:`, json);
        setSensor(json.datos || null);
      })
      .catch(err => {
        console.error('Error al cargar sensor:', err);
        setSensor(null);
      });
  }, [habitat_id]);

  if (!sensor || typeof sensor.temperatura !== 'number') {
    return <p>Sensor no disponible</p>;
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <p>🌡️ Temperatura: {sensor.temperatura} °C</p>
      <p>💧 Humedad: {sensor.humedad} %</p>
      <p>🕒 Última lectura: {sensor.timestamp}</p>
    </div>
  );
}

export default SensorEstado;
