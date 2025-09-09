import HabitatCard from './HabitatCard';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de Control de Hábitats</h1>
      <HabitatCard habitatId={1} />
      <HabitatCard habitatId={2} />
    </div>
  );
}

export default App;
