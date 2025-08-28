import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Card from "./Card";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

// @ts-ignore
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function handleCreateContentModal() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {
      console.error((e as Error).message);
    }

    onClose();
  }

  return (
    <div>
      {open && (
        <div
          className="w-screen h-screen bg-slate-300/70 fixed top-0 left-0 opacity flex justify-center"
          onClick={onClose}
        >
          <div
            className="flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white opacity-100 p-4 rounded-md">
              <div className="flex justify-end p-2">
                <h1 className="justify-center font-bold">
                  Have something on your mind?
                </h1>
                <div onClick={onClose} className="cursor-pointer ml-2">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input ref={titleRef} placeholder={"Title"} />
                <Input ref={linkRef} placeholder={"Link"} />
              </div>
              <div className="px-3">
                <h1 className="mt-1 font-bold">Type</h1>
                <div className="flex gap-1 p-4 justify-center">
                  <Button
                    text="Youtube"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                    size="md"
                  />
                  <Button
                    text="Twitter"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                    size="md"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  text="Submit"
                  size="md"
                  onClick={handleCreateContentModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
