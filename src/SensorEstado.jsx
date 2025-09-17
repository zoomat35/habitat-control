import { useEffect, useState } from 'react';

export default function SensorEstado({ habitat_id }) {
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(`https://habitat-api.vercel.app/api/estado-sensores?habitat_id=${habitat_id}`);
        const data = await res.json();
        console.log("📡 Sensor recibido:", data);
        setSensor(data);
      } catch (err) {
        console.error("❌ Error al obtener sensores:", err);
        setSensor(null);
      }
    };

    obtenerDatos();
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
