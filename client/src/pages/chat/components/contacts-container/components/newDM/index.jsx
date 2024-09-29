import {
  DialogContent,
  DialogHeader,
  Dialog,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTE } from "/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { HOST } from "/utils/constants.js";
import { useAppStore } from "@/store";
const NewDM = () => {
  const { setSelectedChatData,setSelectedChatType } = useAppStore();
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if(response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      } 
    } catch (error) {
      console.log({ error });
    }
  };
  const selectNewContact = (contact) => {
    setOpenNewContactModel(false);
    setSearchedContacts([]);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-300 text-opacity-90 font-light hover:text-white text-start cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="border-none mb-1 p-3 bg-slate-800 text-white">
            Select new contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-gray-950 text-white flex flex-col h-[400px] w-[400px] border-none">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription>
              <div>
                <Input
                  placeholder="Search Contacts"
                  className="border-none mt-4 p-6 bg-gray-800 rounded-lg"
                  onChange={(e) => searchContacts(e.target.value)}
                />
              </div>
              <ScrollArea >
                <div className="flex flex-col gap-5 mt-3">
                  {searchedContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="flex gap-3 items-center cursor-pointer"
                      onClick={() => selectNewContact(contact)}
                    >
                      <div className="h-12 w-12 relative">
                        <Avatar className="h-12 w-12 rounded-full overflow-hidden ">
                          {contact.image ? (
                            <AvatarImage
                              src={`${HOST}/${contact.image}`}
                              alt="profile"
                              className="object-cover rounded-full h-full w-full bg-black"
                            />
                          ) : (
                            <div
                              className={`uppercase w-12 h-12 text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                                contact.color
                               )}`}
                            >
                              {contact.firstName
                                ? contact.firstName.split("").shift()
                                : contact.email.split("").shift()}
                            </div>
                          )
                          }
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white">
                          {contact.firstName && contact.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : `${contact.email}`}
                        </span>
                        <span className="text-xs text-white">
                          {contact.email}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {searchedContacts.length == 0 && (
                <div className="flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all">
                  <Lottie
                    isClickToPauseDisabled={true}
                    height={100}
                    width={100}
                    options={animationDefaultOptions}
                  />
                  <div className="text-white text-opacity-80 flex flex-col items-center transition-all duration-300 text-center">
                    <div>
                      <h3 className="poppins-medium text-xl lg:text-2xl mt-5">
                        Hi<span className="text-purple-500">!</span>Search new{" "}
                        <span className="text-purple-500">Contact</span>
                      </h3>
                    </div>  
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
