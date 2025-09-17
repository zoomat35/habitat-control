import { useEffect, useState } from 'react';

export default function SensorEstado({ habitat_id }) {
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    fetch(`https://habitat-api.vercel.app/api/estado-sensores?habitat_id=${habitat_id}`)
      .then(res => res.json())
      .then(data => {
        console.log("📡 Sensor recibido:", data);
        setSensor(data); // No validamos, solo mostramos
      })
      .catch(err => {
        console.error("❌ Error al obtener sensores:", err);
        setSensor(null);
      });
  }, [habitat_id]);

  if (!sensor) return <p>🔄 Cargando sensores...</p>;

  return (
    <div>
      <p>🌡️ Temp: {sensor.temperatura ? sensor.temperatura + ' °C' : 'N/A'}</p>
      <p>💧 Hum: {sensor.humedad ? sensor.humedad + ' %' : 'N/A'}</p>
      <p>🕒 {sensor.timestamp ? new Date(sensor.timestamp).toLocaleString() : 'Sin timestamp'}</p>
    </div>
  );
}
