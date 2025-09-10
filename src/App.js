import ReleBoton from './components/ReleBoton';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de Control de Hábitats</h1>

      <h2>Hábitat 1</h2>
      <ReleBoton habitatId={1} releId={1} />
      <ReleBoton habitatId={1} releId={2} />
      <ReleBoton habitatId={1} releId={3} />

      <h2>Hábitat 2</h2>
      <ReleBoton habitatId={2} releId={1} />
      <ReleBoton habitatId={2} releId={2} />
    </div>
  );
}

export default App;
