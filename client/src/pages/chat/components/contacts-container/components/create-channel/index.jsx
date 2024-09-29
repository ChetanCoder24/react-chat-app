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
  import { useEffect, useState } from "react";
  import { FaPlus } from "react-icons/fa";
  import { apiClient } from "@/lib/api-client";
  import { useAppStore } from "@/store";
import { GET_ALL_CONTACT_ROUTES } from "/utils/constants.js";
import MultipleSelector from "@/components/ui/multipleselect";
import { CREATE_CHANNEL_ROUTE } from "/utils/constants.js";
  const CreateChannel = () => {
    const { setSelectedChatData,setSelectedChatType,addChannel } = useAppStore();
    const [newChannelModel, setNewChannelModel] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
        const getData = async () => {
            const response = await apiClient.get(GET_ALL_CONTACT_ROUTES,{withCredentials:true});
            setAllContacts(response.data.contacts);
        }
        getData();
    },[]);
    const createChannel = async () => {
        try{
            if(channelName.length > 0 && selectedContacts.length > 0){
              const response = await apiClient.post(CREATE_CHANNEL_ROUTE,{
                  name:channelName,
                  members:selectedContacts.map((contact) => contact.value),
              },{withCredentials:true});
              if(response.status === 201){
                setChannelName("");
                setSelectedContacts([]);
                setNewChannelModel(false);
                addChannel(response.data.channel);
              }
            }
        }catch(error){
            console.log({error});
        }
    };
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus
                className="text-neutral-300 text-opacity-90 font-light hover:text-white text-start cursor-pointer transition-all duration-300"
                onClick={() => setNewChannelModel(true)}
              />
            </TooltipTrigger>
            <TooltipContent className="border-none mb-1 p-3 bg-slate-800 text-white">
              Create New Channel
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
          <DialogContent className="bg-gray-950 text-white flex flex-col h-[400px] w-[400px] border-none">
            <DialogHeader>
              <DialogTitle>Please fill up the details for new channel</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
                <div>
                  <Input
                    placeholder="Channel Name"
                    className="border-none mt-4 p-6 bg-gray-800 rounded-lg"
                    onChange={(e) => setChannelName(e.target.value)}
                    value={channelName}
                  />
                </div>
                <div>
                    <MultipleSelector className="rounded-lg bg-slate-700 text-white py-2 border-none"
                    defaultOptions = {allContacts}
                    placeholder = "Search contacts"
                    value = {selectedContacts}
                    onChange = {setSelectedContacts}
                    emptyIndicator = {
                        <p className="text-center text-lg leading-10 text-gray-600">No results found.</p>
                    }
                    /> 
                </div>
                <div>
                    <button className="w-full p-2 bg-purple-700 hover:bg-purple-900 transition-all duration-300 rounded-lg" onClick={createChannel}>
                        Create Channel
                    </button>
                </div>              
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default CreateChannel;
  