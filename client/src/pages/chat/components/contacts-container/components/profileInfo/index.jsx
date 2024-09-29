import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { HOST } from "/utils/constants";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import { LOGOUT_ROUTE } from "/utils/constants";

const ProfileInfo = () => {
    const {userInfo,setUserInfo} = useAppStore();
    const navigate = useNavigate();
    const logOut = async (req,res,next)=>{
        try{
            const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true});
            if(response.status === 200){
                navigate('/auth');
                setUserInfo(null);
            }
        }catch(error){
            console.log({error});
        }
    };
    return (
    <div className="absolute h-16 bottom-0 flex items-center justify-between px-10 w-full bg-slate-700">
        <div className="flex items-center justify-center gap-3 ">
            <div className="h-12 w-12 relative rounded-full overflow-hidden">
                <Avatar className="h-12 w-12 rounded-full overflow-hidden ">
                    {userInfo.image ? (
                        <AvatarImage
                        src={`${HOST}/${userInfo.image}`}
                        alt="profile"
                        className="object-cover h-full w-full bg-black"
                        />
                    ) : (
                        <div
                        className={`uppercase w-12 h-12 md:w-48 md:h-48 text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                            userInfo.color
                        )}`}
                        >
                        {userInfo.firstName
                            ? userInfo.firstName.split("").shift()
                            : userInfo.email.split("").shift()}
                        </div>
                    )}
                </Avatar>
            </div>
            <div>
                {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}`:""
                }
            </div>
        </div>
        <div className="flex gap-5 pl-2">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><FiEdit2 className="text-purple-500 text-xl font-medium" onClick={()=>navigate('/profile')}/></TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-none text-white p-2 rounded-full">Edit Profile</TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </div>
        <div className="flex gap-5 pl-4">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><IoPowerSharp className="text-red-600 text-xl font-medium" onClick={logOut}/></TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-none text-white p-2 rounded-full">LogOut</TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </div>
    </div>
  )
}

export default ProfileInfo;