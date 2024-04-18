import React from "react";
import { signIn } from "next-auth/react";
import { IconType } from "react-icons";

interface AuthButtonProps {
  icon: IconType;
  provider: string;
  children?: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({ icon: Icon, provider, children }) => {
  const handleSignIn = async () => {
    await signIn(provider, { callbackUrl: "http://localhost:3000/dashboard" });
  };

  return (
    <button type="button" onClick={handleSignIn} className="flex justify-center items-center gap-x-2 font-semibold p-3 bg-gray-100 rounded-xl text-primary border-2 border-transparent hover:border-primary transition-colors duration-300">
      <Icon />
      {children}
    </button>
  );
};

export default AuthButton;
