function App() {
  async function controlarRele(estado) {
    try {
      await fetch('https://habitat-api.vercel.app/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitat_id: 1, rele: 1, estado })
      });
      alert(`Relé ${estado ? 'encendido' : 'apagado'} correctamente`);
    } catch (err) {
      alert('Error al controlar el relé');
      console.error(err);
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>habita_1</h1>
      <button
        onClick={() => controlarRele(true)}
        style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
      >
        Encender
      </button>
      <button
        onClick={() => controlarRele(false)}
        style={{ padding: '0.5rem 1rem' }}
      >
        Apagar
      </button>
    </div>
  );
}

export default App;
