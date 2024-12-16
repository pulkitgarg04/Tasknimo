import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputBox: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  id: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ label, type, placeholder, id, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
};

const Signup: React.FC = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen sm:h-screen items-center justify-center p-5 gap-5 font-poppins">
      <div className="flex-1 flex flex-col items-center justify-start bg-gray-800 rounded-lg h-full p-5 relative">
        <h1 className="text-white text-2xl font-bold absolute top-5 left-5 sm:text-3xl md:text-4xl">
          Tasknimo
        </h1>
        <img
          src="home.webp"
          alt="Tasknimo"
          className="w-full sm:w-3/5 md:w-2/3 lg:w-1/2 max-w-md mt-36"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-5 rounded-lg h-full border-2 sm:w-1/2 md:w-3/5 lg:w-2/5">
        <div className="m-10 sm:m-20">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-4">Signup</h2>

          <InputBox
            label="Username"
            type="text"
            placeholder="pulkitgarg04"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputBox
            label="Email"
            type="email"
            placeholder="email@example.com"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="mt-1 p-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-yellow-400 py-2 px-4 text-sm sm:text-base font-medium rounded w-full hover:bg-yellow-300 transition duration-300 ease-in-out"
          >
            Signup
          </button>

          <p className="text-sm sm:text-base mt-4 text-center text-gray-800 font-medium">
            Already have an account?
            <a href="/login" className="mx-1 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
