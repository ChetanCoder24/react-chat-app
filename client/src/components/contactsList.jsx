import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "/utils/constants.js";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
    selectedChatData,
  } = useAppStore();
  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };
  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 mb-3 transition-all duration-300 cursor-pointer ${
            selectedChatData && (selectedChatData._id === contact._id)
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-slate-800"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 justify-start items-center text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover rounded-full h-full w-full bg-black"
                  />
                ) : (
                  <div
                    className={` ${selectedChatData && selectedChatData._id === contact._id ? "bg-white border border-white/70" : getColor(contact.color)}
                      uppercase w-10 h-10 text-lg border-[1px] flex justify-center items-center rounded-full`}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift()
                      : contact.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && <div className="bg-black h-10 w-10 flex items-center justify-center rounded-full"> # </div>}
            {isChannel ? <span>{contact.name}</span> : <span>{contact.firstName ? `${contact.firstName} ${contact.lastName}` : contact.email}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
