import "./index.css";

export function App() {
  return (
    <div>
      <div className="bg-primary h-36 text-secondary">Primary</div>
      <div className="bg-secondary text-primary h-36"> Secondary</div>
      <div className="bg-tertiary text-secondary h-36">Tertiary</div>
      <div className="bg-success text-secondary h-36">Success</div>
      <div className="bg-error text-secondary h-36">Error</div>
    </div>
  );
}
