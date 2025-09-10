import HabitatCard from './HabitatCard';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de Control de Hábitats</h1>

      {/* Hábitat 1 */}
      <HabitatCard habitatId={1} releId={1} />
      <HabitatCard habitatId={1} releId={2} />
      <HabitatCard habitatId={1} releId={3} />

      {/* Hábitat 2 */}
      <HabitatCard habitatId={2} releId={1} />
      <HabitatCard habitatId={2} releId={2} />
      <HabitatCard habitatId={2} releId={3} />
    </div>
  );
}

export default App;
