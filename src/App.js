function App() {
  async function controlarRele(estado) {
    try {
      const res = await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id: 1, rele: 1, estado })
      });

      const json = await res.json();
      console.log('Respuesta del backend:', json);
      alert(`Relé ${estado ? 'encendido' : 'apagado'} correctamente`);
    } catch (err) {
      console.error('Error al enviar al backend:', err);
      alert('Error al controlar el relé');
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>habita_1</h1>
      <button onClick={() => controlarRele(true)}>Encender</button>
      <button onClick={() => controlarRele(false)} style={{ marginLeft: '1rem' }}>Apagar</button>
    </div>
  );
}

export default App;
