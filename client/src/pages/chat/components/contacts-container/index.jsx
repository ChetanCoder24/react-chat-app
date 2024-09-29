import { useEffect } from "react";
import NewDM from "./components/newDM";
import ProfileInfo from "./components/profileInfo";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACT_ROUTES } from "/utils/constants.js";
import { useAppStore } from "@/store";
import ContactList from "@/components/contactsList";
import CreateChannel from "./components/create-channel";
import { GET_USER_CHANNEL_ROUTE } from "/utils/constants.js";

const ContactsContainer = () => {
  const { directMessagesContacts,setDirectMessagesContacts,channels,setChannels } = useAppStore();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACT_ROUTES,{withCredentials:true});
      if(response.data.contacts){
        setDirectMessagesContacts(response.data.contacts);
      }
    }
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNEL_ROUTE,{withCredentials:true});
      if(response.data.channels){
        setChannels(response.data.channels);
      }
    }
    getContacts();
    getChannels();
  },[])
  return (
    <div className="relative md:w-[35vw] l:w-[30vw] xl:w-[20vw] bg-slate-800 border-r-2 border-slate-900 w-full"><div className="pt3">
      <Logo />
      </div>
      <div className="my-10">
        <div className="flex items-center justify-between pr-5">
          <Title text="Direct Messages"/>
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto"> 
          {/* Is scrollbar-hidden added? */}
          <ContactList contacts={directMessagesContacts}/>
        </div>
        <div className="flex items-center justify-between pr-5">
          <Title text="Channels"/>  
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden"> 
          <ContactList contacts={channels} isChannel={true}/>
        </div>
      </div>
      <ProfileInfo />
      </div>
  )
}

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold ">Syncronus</span>
    </div>
  );
};
const Title = ({text})=>{
  return (
    <h6 className=" uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
}