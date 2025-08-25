import Button from "./components/Button";
import PlusIcon from "./icons/PlusIcon";

function App() {
  return (
    <div>
      <Button
        startIcon={<PlusIcon size="md" />}
        variant="primary"
        text="Add"
        size={"md"}
        onClick={() => {}}
      />
      <Button
        startIcon={<PlusIcon size="md" />}
        variant="secondary"
        text="Share"
        size={"md"}
        onClick={() => {}}
      />
    </div>
  );
}

export default App;
