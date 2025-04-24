"use client";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "@/public";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    getInfoUser();
  }, []);

  const getInfoUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setFormData(data.user);
      } else {
        console.error(data.message || "Unable to fetch user information");
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const form = new FormData();
    form.append("name", formData.name || "");
    form.append("email", formData.email || "");
    form.append("phone", formData.phone || "");
    form.append("address", formData.address || "");
    if (file) {
      form.append("image", file);
    }

    try {
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setFormData(data.user);
        setIsEditing(false);
        setFile(null);
        toast.success(data.message || "Updated successfully", { position: "top-right" });
      } else {
        toast.error(data.message || "Update failed", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to connect to the server.", { position: "top-right" });
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
    setFile(null);
  };

  const _renderAvatar = () => (
    <div className="flex flex-col items-center gap-6">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : user?.avatar || IMAGE_URL.USER
          }
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </div>
  
      {isEditing && (
        <>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) setFile(selectedFile);
            }}
            className="hidden"
          />
          <label
            htmlFor="avatarInput"
            className="cursor-pointer px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
          >
            Edit Avatar
          </label>
        </>
      )}
  
      <div className="text-center">
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-500 text-md">{user?.email}</p>
      </div>
    </div>
  );
  

  const _renderUserInfo = (
    label: string,
    type: string,
    name: string,
    value: string,
    data: string
  ) => (
    <div className="p-3 sm:p-4 border border-gray-300 rounded-lg flex flex-col gap-1 sm:gap-2">
      <h4 className="font-bold text-sm sm:text-lg w-[120px] sm:w-auto">{label}</h4>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          className="border border-gray-300 w-full rounded px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base"
        />
      ) : (
        <p className="text-gray-500 mt-1 text-sm sm:text-base">{data || "Not provided"}</p>
      )}
    </div>
  );

  const _renderEditButton = () => (
    <div className="flex justify-center items-center">
      {!isEditing ? (
        <button
          className="px-6 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-6 py-2 border border-gray-500 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  if (!user) return <div>Loading...</div>;

  return (
    <div className="lg:px-38 px-4 py-8 flex flex-col gap-10">
      {_renderAvatar()}

      <div className="w-full flex flex-col justify-center items-center gap-6">
        <h3 className="text-xl font-bold mb-4">Profile Details</h3>
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {_renderUserInfo("Full Name", "text", "name", formData.name, user?.name)}
          {_renderUserInfo("Email", "email", "email", formData.email, user?.email)}
          {_renderUserInfo("Phone", "text", "phone", formData.phone, user?.phone)}
          {_renderUserInfo("Address", "text", "address", formData.address, user?.address)}
        </div>
      </div>

      {_renderEditButton()}
    </div>
  );
};

export default Profile;
