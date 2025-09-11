import { useEffect, useState } from 'react';

export default function SensorInfo({ habitat_id }) {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    fetch(`https://habitat-api.vercel.app/api/ultimo-sensor?habitat_id=${habitat_id}`)
      .then(res => res.json())
      .then(data => {
        console.log("📦 Datos recibidos:", data);
        const temp = Number(data.temperatura);
        const hum = Number(data.humedad);

        if (!isNaN(temp) && !isNaN(hum)) {
          setDatos({
            temperatura: temp,
            humedad: hum,
            timestamp: data.timestamp
          });
        } else {
          console.warn("⚠️ Datos inválidos:", data);
          setDatos(null);
        }
      })
      .catch(err => {
        console.error("❌ Error al cargar sensores:", err);
        setDatos(null);
      });
  }, [habitat_id]);

  if (!datos) return <p>🔄 Cargando sensores...</p>;

  return (
    <div>
      <p>🌡️ Temperatura: {datos.temperatura.toFixed(1)} °C</p>
      <p>💧 Humedad: {datos.humedad.toFixed(1)} %</p>
      {datos.timestamp && (
        <p>🕒 Última lectura: {new Date(datos.timestamp).toLocaleString()}</p>
      )}
    </div>
  );
}

