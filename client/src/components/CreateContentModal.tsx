import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import { Input } from "./Input";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {
  return (
    <div>
      {open && (
        <div
          className="w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-60 flex justify-center"
          onClick={onClose}
        >
          <div
            className="flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="bg-white opacity-100 p-4 rounded-md">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input placeholder={"Title"} onChange={() => {}} />
                <Input placeholder={"Link"} onChange={() => {}} />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  text="Submit"
                  size="md"
                  onClick={() => {}}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
