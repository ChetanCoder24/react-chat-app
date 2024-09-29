import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
import { HOST } from "/utils/constants";
import { getColor } from "@/lib/utils";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-slate-600 flex items-center justify-between px-20">
      <div className="flex items-center gap-5 w-full justify-between">
        <div className="flex items-center gap-3 justify-center">
          <div className="h-12 w-12 relative">
            {
              selectedChatData.type === "contact" ? <Avatar className="h-12 w-12 rounded-full overflow-hidden ">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover rounded-full h-full w-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase w-12 h-12 text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar> : <div className="bg-black h-10 w-10 flex items-center justify-center rounded-full"> # </div>
            }
            
          </div>
              {selectedChatType === "contact" && selectedChatData.firstName ? `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email}
              {selectedChatType === "channel" && selectedChatData.name}
        </div>
        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
