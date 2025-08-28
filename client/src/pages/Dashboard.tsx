import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import useContent from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();
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
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  {
                    share: true,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`;

                await navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard!");
              } catch (e) {
                console.error(e);
                alert("Failed to generate link");
              }
            }}
          />
        </div>

        <div className="flex flex-wrap gap-4 p-4">
          {contents.map(({ type, title, link }) => (
            <Card key={link} title={title} type={type} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
