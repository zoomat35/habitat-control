import React, { useState } from 'react';

function RelesControl({ habitat_id }) {
  const [estado, setEstado] = useState({ rele1: false, rele2: false });

  const toggleRele = (num, encender) => {
    fetch(`https://tu-backend.com/api/rele/${habitat_id}/${num}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: encender }),
    });
    setEstado(prev => ({ ...prev, [`rele${num}`]: encender }));
  };

  return (
    <div>
      <h3>Relés del Hábitat {habitat_id}</h3>
      {[1, 2].map(num => (
        <div key={num}>
          <p>Relé {num}: {estado[`rele${num}`] ? '🟢 Encendido' : '⚫ Apagado'}</p>
          <button onClick={() => toggleRele(num, true)}>Encender</button>
          <button onClick={() => toggleRele(num, false)}>Apagar</button>
        </div>
      ))}
    </div>
  );
}

export default RelesControl;
