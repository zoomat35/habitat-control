import { useEffect, useState } from 'react';

export default function SensorEstado({ habitat_id }) {
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    fetch(`https://habitat-api.vercel.app/api/estado-sensores?habitat_id=${habitat_id}`)
      .then(res => res.json())
      .then(data => {
        console.log("📡 Sensor recibido:", data);
        if (data && typeof data.temperatura === 'number' && typeof data.humedad === 'number') {
          setSensor(data);
        } else {
          console.warn("⚠️ Datos inválidos o incompletos:", data);
          setSensor(null);
        }
      })
      .catch(err => {
        console.error("❌ Error al obtener sensores:", err);
        setSensor(null);
      });
  }, [habitat_id]);

  if (!sensor) return <p>Sensor no disponible</p>;

  return (
    <div>
      <p>🌡️ Temperatura: {sensor.temperatura} °C</p>
      <p>💧 Humedad: {sensor.humedad} %</p>
      <p>🕒 Última lectura: {new Date(sensor.timestamp).toLocaleString()}</p>
    </div>
  );
}
