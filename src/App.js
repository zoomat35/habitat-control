import ReleBoton from './components/ReleBoton';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>habita_1</h1>
      <ReleBoton habitatId={1} releId={1} />
      <ReleBoton habitatId={1} releId={2} />
    </div>
  );
}

export default App;
