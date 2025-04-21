"use client";
import { useState } from "react";
import { IMAGE_URL } from "@/public";

const Profile = () => {

  const initialUser = {
    name: "Mai Phuong",
    email: "ntmphuonglao@gmail.com",
    preferredName: "",
    phone: "",
    address: "",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const _renderAvatar = () => {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-main">
          <img
            src={IMAGE_URL.USER}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500 text-md">{user.email}</p>
        </div>
      </div>
    );
  };

  const _renderUserInfo = (label:string, type: string,name: string, value: string, data:string) => {
    return (
      <div className="p-4 border border-gray-300 rounded-lg flex flex-col gap-2">
        <h4 className="font-bold text-lg">{label}</h4>
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="border border-gray-300 w-full rounded px-3 py-2"
          />
        ) : (
          <p className="text-gray-500 mt-1">{data}</p>
        )}
      </div>
    )
  };

  const _renderEditButton = () => {
    return (
      <div className="flex justify-center items-center">
        {!isEditing ? (
          <button
            className="px-6 font-semibold py-2 bg-main text-white rounded-lg cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh sửa hồ sơ
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              className="px-6 font-semibold py-2 bg-main text-white rounded-lg cursor-pointer"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="px-6 font-semibold py-2 border border-black text-black rounded-lg cursor-pointer"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    )
  };

  return (
    <div className="lg:px-38 px-4 py-8 flex flex-col gap-10">
      {_renderAvatar()}
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <h3 className="text-xl font-bold mb-4">Chi tiết hồ sơ</h3>
        <div className="grid md:grid-cols-2 gap-6 min-w-[750px]">
          {_renderUserInfo("Họ tên", "text", "name", formData.name, user.name)}
          {_renderUserInfo("Email", "email", "email", formData.email, user.email)}
          {_renderUserInfo("Phone", "text", "phone", formData.phone, user.phone ? user.phone : "Chưa cung cấp")}
          {_renderUserInfo("Address", "text", "address", formData.address, user.address ? user.address : "Chưa cung cấp")}
        </div>
      </div>
      {_renderEditButton()}
    </div>
  );
};

export default Profile;