import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment, GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { UPLOAD_FILE_ROUTE } from "/utils/constants.js";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const {
    userInfo,
    selectedChatData,
    selectedChatType,
    setIsUploading,
    setFileUploadProgress,
  } = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const socket = useSocket();
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => (msg = msg + emoji.emoji));
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [useRef]);

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }else if (selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender: userInfo.id,
        content: message,
        channelId: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
    setMessage("");
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
        setFileUploadProgress(0);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round((100*data.loaded)/data.total))
          }
        });
        if (response.status === 200 && response.data) {
          setIsUploading(false);
          setFileUploadProgress(0);
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          }else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
              sender: userInfo.id,
              content: undefined,
              channelId: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          }
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="h-[10vh] bg-slate-800 flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-blue-950 rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 rounded-md p-5 bg-transparent focus:border-none focus:outline-none"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleAttachmentClick}
        >
          <GrAttachment className="2xl" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachmentChange}
        />
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              autoFocusSearch={false}
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-purple-700 p-4 focus:border-none focus:outline-none focus:text-white duration-300 transition-all hover:bg-purple-800"
        onClick={handleSendMessage}
      >
        <IoSend className="2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
