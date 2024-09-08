import Link from "next/link";
type MenuItemProps = {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
  className?: string;
};

const MenuItem = ({
  icon,
  text,
  href,
  active = false,
  className = "",
}: MenuItemProps) => (
  <Link href={href}>
    <div
      className={`flex items-center gap-3 py-3 text-sm px-4 cursor-pointer ${
        active ? "bg-red-100 font-extralight text-red-700" : "hover:bg-gray-50"
      }${className}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  </Link>
);

export default MenuItem;
