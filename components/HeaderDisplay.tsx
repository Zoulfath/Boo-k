import { RectangleStackIcon } from "@heroicons/react/24/outline";

const HeaderDisplay = ({shelfData}: any) => (
  <div
    className={`flex items-center justify-between gap-4 py-8 bg-white m-4 rounded-sm text-sm px-4 cursor-pointer`}
  >
    <div className={`flex items-center gap-4`}>
      <span className="p-4 border rounded-full">
        <RectangleStackIcon className="size-5" />
      </span>
      <div className="flex flex-col">
        <span className="text-4xl">{shelfData?.title}</span>
      </div>
    </div>
  </div>
);

export default HeaderDisplay;
