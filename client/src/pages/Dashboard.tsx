import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            startIcon={<PlusIcon />}
            variant="primary"
            text="Add content"
            size={"md"}
            onClick={() => {
              setModalOpen(true);
            }}
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
    </div>
  );
}

export default Dashboard;
