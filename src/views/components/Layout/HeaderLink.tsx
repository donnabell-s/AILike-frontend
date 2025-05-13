import { useNavigate } from "react-router"

interface SideNavLinkProps {
    label: string;
    selected: boolean;
    path: string;
}

const HeaderLink: React.FC<SideNavLinkProps> = ({ label, selected, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (!selected) {
        navigate(path);
      }
    };

    return (
        <div
            onClick={handleClick}
            className={`
                flex items-center justify-between p-2 cursor-pointer
                text-[#1F2937] text-md font-medium relative
                after:content-['']
                after:absolute after:left-0 after:bottom-0
                after:h-[2px] after:w-full
                after:transition-transform after:duration-300
                after:origin-left
                ${selected ? 'after:scale-x-100 after:bg-[#A17C9B] text-[#A17C9B]' : 'after:scale-x-0 after:bg-[#A17C9B] hover:after:scale-x-100'}
            `}
        >
            <p>{label}</p>
        </div>
    )
}

export default HeaderLink;