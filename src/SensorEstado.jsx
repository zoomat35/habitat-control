import { useEffect, useState } from 'react';

export default function SensorEstado({ habitat_id }) {
  const [sensor, setSensor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(`https://habitat-api.vercel.app/api/estado-sensores?habitat_id=${habitat_id}`);
        const data = await res.json();
        console.log("📡 Sensor recibido:", data);

        if (data && typeof data.temperatura === 'number' && typeof data.humedad === 'number') {
          setSensor(data);
          setError(null);
        } else {
          setError("⚠️ Datos inválidos o incompletos");
          setSensor(null);
        }
      } catch (err) {
        console.error("❌ Error al obtener sensores:", err);
        setError("❌ Error de conexión o formato");
        setSensor(null);
      }
    };

    obtenerDatos();
  }, [habitat_id]);

  if (error) return <p>{error}</p>;
  if (!sensor) return <p>Sensor no disponible</p>;

  return (
    <div>
      <p>🌡️ Temperatura: {sensor.temperatura} °C</p>
      <p>💧 Humedad: {sensor.humedad} %</p>
      <p>🕒 Última lectura: {new Date(sensor.timestamp).toLocaleString()}</p>
    </div>
  );
}
