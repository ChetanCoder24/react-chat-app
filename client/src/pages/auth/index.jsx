import React, { useState } from "react";
import Victory from "./../../assets/victory.svg";
import LoginImg from "./../../assets/login2.png";
import { Tabs, TabsContent, TabsTrigger } from "./../../components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Input } from "./../../components/ui/input";
import { Button } from "./../../components/ui/button";
import { toast } from "sonner";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "./../../../utils/constants.js";
import { apiClient } from "@/lib/api-client.js";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
const Auth=()=>{
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const validateSignup = async()=>{
    if(!email.length){
      toast.error("Email is required!");
      return false; 
    }
    if(!password.length){
      toast.error("Password is required!");
      return false; 
    }
    if(password !== ConfirmPassword){
      toast.error("Password and Confirm Password should be the same.");
      return false;
    }
    return true;
  }
  const validateLogin = async()=>{
    if(!email.length){
      toast.error("Email is required!");
      return false; 
    }
    if(!password.length){
      toast.error("Password is required!");
      return false; 
    }
    return true;
  }
  const handleLogin = async()=>{
    if(validateLogin()){
      const response = await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true});
      console.log(response); 
      if(response.data.user.id){
        setUserInfo(response.data.user);
        if(response.data.user.profileSetup) navigate('/chat');
        else navigate('/profile');
      } 
    }
  };
  const handleSignUp = async()=>{
    if(validateSignup()){
      const response = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true});
      console.log({response});
      if(response.status === 200){
        setUserInfo(response.data.user);
        navigate('/profile');
      }  
    }
  };
  
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] shadow-2xl bg-white border-2 text-opacity-90 border-white w-[80vw]  md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl  font-bold">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="text-center font-medium">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="Login" className="w-3/4">
              <TabsList className="w-full bg-transparent ">
                <TabsTrigger value="Login" className="w-1/2 p-3 data-[state=active]:bg-transparent border-b-2 rounded-none data-[state=active]:border-purple-600  text-black opacity-90 font-normal data-[state=active]:font-semibold transition-all duration-300">Login</TabsTrigger>
                <TabsTrigger value="signup" className="w-1/2 p-3 data-[state=active]:bg-transparent border-b-2 rounded-none data-[state=active]:border-purple-600  text-black opacity-90 font-normal data-[state=active]:font-semibold transition-all duration-300">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="Login" className="flex flex-col gap-5">
              <Input placeholder="Email" type="Email" className="rounded-full p-3" value={email} onChange={(e)=>{setEmail(e.target.value)}} />

              <Input placeholder="Password" type="Password" className="rounded-full p-3" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

              <Button className="rounded-full p-3" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
              <Input placeholder="Email" type="Email" className="rounded-full p-3" value={email} onChange={(e)=>{setEmail(e.target.value)}} />

              <Input placeholder="Password" type="Password" className="rounded-full p-3" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

              <Input placeholder="Confirm Password" type="Password" className="rounded-full p-3" value={ConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} />

              <Button className="rounded-full p-3" onClick={handleSignUp}>Sign up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <img src={LoginImg} alt="Login image" className="hidden xl:flex flex-col justify-center items-center size-11/12"/>
      </div>
    </div>
  );
}

export default Auth;
