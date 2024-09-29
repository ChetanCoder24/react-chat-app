import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "./../assets/lottie-json"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colors = [
  'bg-[#725656] text-[#db4646] border-[2px] border-[#ea7878]',
  'bg-[#93a792] text-[#077f0d] border-[2px] border-[#1def13]',
  'bg-[#9ba0d2] text-[#132cef] border-[2px] border-[#353e99]',
  'bg-[#f8e6a5] text-[#eebd0b] border-[2px] border-[#7e744e]',
];

export const getColor = (color)=>{
  if(color>=0 && color<colors.length){
    return colors[color];
  }
}

export const animationDefaultOptions = {
  loop:true,
  autoplay:true,
  animationData,
}