import Button from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (e) {
      alert("Signin failed. Username or password is short/incorrect.");
      console.error((e as Error).message);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white min-w-48 p-8 rounded-xl">
        <h1 className="font-bold flex justify-center">Sign In</h1>
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text="Sign In"
            size="md"
            onClick={handleSignIn}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
