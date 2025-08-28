import { useRef } from "react";
import axios from "axios";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleSignUp() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      alert("You have signed up.");

      if (usernameRef.current?.value) {
        usernameRef.current.value = "";
        usernameRef.current.focus();
      }

      if (passwordRef.current?.value) passwordRef.current.value = "";
      navigate("/signin");
    } catch (e) {
      alert("Signup failed. Username or password is short/incorrect.");
      console.error((e as Error).message);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border-gray-800 min-w-48 p-8 rounded-xl">
        <h1 className="font-bold flex justify-center">Sign Up</h1>
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text="Sign up!"
            size="md"
            onClick={handleSignUp}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
