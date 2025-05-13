import { Link } from "react-router-dom";

interface AuthLayoutWrapperProps {
  variant: "login" | "signup";
  children: React.ReactNode;
}

const AuthLayoutWrapper: React.FC<AuthLayoutWrapperProps> = ({ variant, children }) => {
  const isLogin = variant === "login";

  const title = isLogin ? "Sign Into Account" : "Create an Account";
  const footerText = isLogin ? "First time here?" : "Already have an account?";
  const footerLinkText = isLogin ? "Create an account." : "Sign in now.";
  const footerLinkHref = isLogin ? "/account/signup" : "/account/login";

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-5 py-5 text-[#8E939A]">
      <div className="w-full max-w-[500px] flex flex-col gap-5 lg:gap-8 h-full">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-semibold text-[32px] md:text-[40px] lg:text-[48px] text-[#C53771]">
            {title}
          </p>
          <div className="w-20 h-1 bg-[#C53771] rounded-full" />
        </div>

        {/* Main Form Content */}
        {children}

        {/* Footer */}
        <div className="flex flex-col justify-center">
          <p className="text-center text-[16px]">
            {footerText}{" "}
            <Link to={footerLinkHref} className="text-[#86CAA3]">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
