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
  const [contents, setContents] = useContent();

  const handleDelete = async (id: string) => {
    try {
      setContents((prev) => {
        const updated = prev.filter((item) => item._id !== id);
        return updated;
      });

      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete content. Please try again.");

      window.location.reload();
    }
  };
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
          {contents.map(({ type, title, link, _id }) => (
            <Card
              key={_id}
              title={title}
              type={type}
              link={link}
              _id={_id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
