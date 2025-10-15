import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { LogOut, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { authUser, logOut, updateProfile, isUpdating } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const bas64Image = reader.result;
      setSelectedImg(bas64Image);
      await updateProfile({ profilePic: bas64Image });
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar online">
            <button
              disabled={isUpdating}
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/img/avatar.png"}
                alt="User Image"
                className={`size-full object-cover transition-opacity duration-300 ${
                  isUpdating ? "opacity-50" : "opacity-100"
                }`}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Username and online */}
          <div className="text-slate-200 font-medium text-base max-w-[180px] truncate">
            <h3>{authUser.fullName}</h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logOut}
          >
            <LogOut className="size-5" />
          </button>

          {/* Sound toggle Button */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
