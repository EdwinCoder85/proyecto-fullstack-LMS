import { signIn } from "next-auth/react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  provider: string;
  children?: React.ReactNode;
}

export function ButtonSignIn({ icon: Icon, provider, children }: Props) {
  const handleSignIn = async () => {
    await signIn(provider, { callbackUrl: "http://localhost:3000/dashboard" });
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="flex justify-center items-center gap-x-2 font-semibold p-3 bg-gray-100 rounded-xl text-primary-600 border-2 border-transparent hover:border-primary-600 transition-colors duration-300"
    >
      <Icon />
      {children}
    </button>
  );
}
