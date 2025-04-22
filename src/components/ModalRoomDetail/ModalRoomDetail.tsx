import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { ParamsRoom } from '@/src/app/(admin)/admin/manage-list-room/page';
import { toast } from 'react-toastify';

interface RoomDetailModalProps {
  isModalVisible: boolean;
  selectedRoom: ParamsRoom | null;
  onClose: () => void;
  onUpdate: (updatedRoom: ParamsRoom) => void; 
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ isModalVisible, selectedRoom, onClose, onUpdate }) => {
   const [formData, setFormData] = useState({
      image: null as File | null,
      name: '',
      address: '',
      rentalDate: '',
      price: '',
      rating: '',
      description_room: '',
      check_in: '',
      check_out: '',
      status: '',
      bed_rooms: '',
      bath_room: '',
      occupancy_limit: '',
    });
  
    const [previewImage, setPreviewImage] = useState<string | null>(null);
  
    useEffect(() => {
      if (selectedRoom) {
        setFormData({
          image: null, 
          name: selectedRoom.name,
          address: selectedRoom.address,
          rentalDate: selectedRoom.rental_date,
          price: selectedRoom.price.toString(),
          rating: selectedRoom.rating.toString(),
          description_room: selectedRoom.description_room,
          check_in: selectedRoom.check_in,
          check_out: selectedRoom.check_out,
          status: selectedRoom.status,
          bed_rooms: selectedRoom.bed_rooms.toString(),
          bath_room: selectedRoom.bath_room.toString(),
          occupancy_limit: selectedRoom.occupancy_limit.toString(),
        });
        setPreviewImage(selectedRoom.image);
      }
    }, [selectedRoom]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        setPreviewImage(URL.createObjectURL(file)); 
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (!formData.image && !previewImage) {
        toast.warning('Please upload an image or leave it unchanged.');
        return;
      }
      const updatedRoom: ParamsRoom = {
        ...selectedRoom!,
        ...formData,
        image: previewImage || selectedRoom?.image || '', 
        price: Number(formData.price),
        rating: Number(formData.rating),
        bed_rooms: Number(formData.bed_rooms),
        bath_room: Number(formData.bath_room),
        occupancy_limit: Number(formData.occupancy_limit),
      };
    
      onUpdate(updatedRoom);
      onClose();
    };
    
  
    const _renderInput = (label: string, name: keyof typeof formData, type: string) => {
      return (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <Input
            type={type}
            name={name}
            value={formData[name] as string}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[50px]"
          />
        </div>
      );
    };
  
    const _renderInputImage = () => {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image:</label>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => document.getElementById('fileInput')?.click()}
              className='bg-main w-[150px] h-[50px] text-white font-semibold rounded-md cursor-pointer'
            >
              Upload Image
            </button>
            <div className='w-[300px]'>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full  h-auto rounded-md border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Modal
        title="Edit Room"
        open={isModalVisible}
        onCancel={onClose}
        footer={null}
        width={800}
      >
        <div className="w-full flex flex-col items-center justify-center gap-20 p-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">Edit Room</h1>
          <form onSubmit={handleSubmit} className="max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
            {_renderInputImage()}
            {_renderInput("Name Room:", "name", "text")}
            {_renderInput("Address:", "address", "text")}
            {_renderInput("Rental Date:", "rentalDate", "date")}
            {_renderInput("Price:", "price", "number")}
            {_renderInput("Rating:", "rating", "text")}
            {_renderInput("Description:", "description_room", "text")}
            {_renderInput("Check In:", "check_in", "date")}
            {_renderInput("Check Out:", "check_out", "date")}
            {_renderInput("Status:", "status", "text")}
            {_renderInput("Bedrooms:", "bed_rooms", "number")}
            {_renderInput("Bathrooms:", "bath_room", "number")}
            {_renderInput("Occupancy Limit:", "occupancy_limit", "number")}
            <button
              type="submit"
              className="w-full h-[50px] px-4 bg-main text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      </Modal>
    );
};

export default RoomDetailModal;
