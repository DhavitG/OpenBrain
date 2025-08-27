import Button from "../components/Button";
import { Input } from "../components/Input";

function Signin() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border min-w-48 p-8 rounded-xl">
        <Input placeholder="Username" onChange={() => {}} />
        <Input placeholder="Password" onChange={() => {}} />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text="Sign In"
            size="md"
            onClick={() => {}}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
