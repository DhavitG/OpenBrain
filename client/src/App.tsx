import Button from "./components/Button";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

function App() {
  return (
    <div className="flex gap-2">
      <Button
        startIcon={<PlusIcon />}
        variant="primary"
        text="Add content"
        size={"md"}
        onClick={() => {}}
      />
      <Button
        startIcon={<ShareIcon />}
        variant="secondary"
        text="Share Brain"
        size={"md"}
        onClick={() => {}}
      />
    </div>
  );
}

export default App;
