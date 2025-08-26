import Button from "./components/Button";
import Card from "./components/Card";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

function App() {
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
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

      <div className="flex gap-4">
        <Card
          title="Watch"
          type="twitter"
          link="https://x.com/aaditsh/status/1959178840967905489?s=48"
        />

        <Card
          title="Interesting"
          type="youtube"
          link="https://www.youtube.com/watch?v=KHSI0Qu4ovQ"
        />
      </div>
    </div>
  );
}

export default App;
