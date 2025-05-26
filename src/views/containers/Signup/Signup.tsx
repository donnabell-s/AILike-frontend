import * as Components from "../../components";
import { useState } from "react";
import * as Service from "../../../services";
import { useNavigate } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa6";

const PRONOUN_CHOICES = [
  { value: "", label: "Select Pronouns" },
  { value: "he/him", label: "He/Him" },
  { value: "she/her", label: "She/Her" },
  { value: "they/them", label: "They/Them" },
];

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FloatingLabelSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FloatingLabelInput = ({
  label,
  type = "text",
  value,
  onChange,
}: FloatingLabelInputProps) => (
  <div className="relative w-full">
    <span className="absolute top-2 left-3 text-[10px] text-[#8E939A] uppercase tracking-wide z-10">
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="bg-[#F5F5F5] text-[#1F2937] rounded-md pt-6 pb-2 px-3 h-[50px] text-[16px] outline-none w-full"
    />
  </div>
);

const FloatingLabelSelect = ({
  label,
  options,
  value,
  onChange,
}: FloatingLabelSelectProps) => (
  <div className="relative w-full">
    <span className="absolute top-2 left-3 text-[10px] text-[#8E939A] uppercase tracking-wide z-10">
      {label}
    </span>
    <select
      value={value}
      onChange={onChange}
      className="bg-[#F5F5F5] text-[#1F2937] rounded-md pt-5 pb-2 px-3 h-[50px] text-[16px] outline-none w-full appearance-none pr-8"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.value === ""}
          hidden={option.value === ""}
        >
          {option.label}
        </option>
      ))}
    </select>
    <FaCaretLeft className="absolute right-3 top-[62%] transform -translate-y-1/2 text-[#8E939A] pointer-events-none text-[16px]" />
  </div>
);

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Service.RegisterUser(
        username,
        email,
        password,
        first_name,
        last_name,
        pronouns,
        date_of_birth
      );
      await Service.GetTokens(username, password);
      console.log("Signup successful");
      navigate("/user/home");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center">
      <Components.AuthLayoutWrapper variant="signup">
        <form
          onSubmit={handleSignup}
          className="flex flex-col justify-between gap-6 text-[16px] h-[390px]"
        >
          <div className="flex flex-col gap-3">
            <FloatingLabelInput
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FloatingLabelInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FloatingLabelInput
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex flex-row gap-3">
              <FloatingLabelInput
                type="text"
                label="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FloatingLabelInput
                type="text"
                label="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-2">
              <FloatingLabelSelect
                label="Pronouns"
                options={PRONOUN_CHOICES}
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
              />
              <FloatingLabelInput
                type="date"
                label="Date of Birth"
                value={date_of_birth}
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-[#C53771] to-[#F282B0] font-medium text-white rounded-md py-2 hover:from-[#a82d5c] hover:to-[#d65888] transition-colors h-[60px] text-[18px]"
          >
            Sign Up
          </button>

        </form>
      </Components.AuthLayoutWrapper>
    </div>
  );
};

export default Signup;
