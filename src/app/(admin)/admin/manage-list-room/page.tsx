'use client';

import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import axios from 'axios';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import RoomDetailModal from '@/src/components/ModalRoomDetail/ModalRoomDetail';

export interface ParamsRoom {
  room_id: number;
  name: string;
  address: string;
  rental_date: string;
  price: number;
  image: string;
  rating: number;
  description_room: string;
  check_in: string;
  check_out: string;
  status: string;
  bed_rooms: number;
  bath_room: number;
  occupancy_limit: number;
}

const RoomListPage = () => {
  const [rooms, setRooms] = useState<ParamsRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<ParamsRoom | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getListRoom();
  }, []);

  const getListRoom = async (query: string = '') => {
    try {
      setLoading(true);
      const response = await axios.get('/api/get-list-rooms', {
        params: query ? { search_room: query } : {},
      });

      if (Array.isArray(response.data.data)) {
        setRooms(response.data.data);
      } else {
        setRooms([]);
        toast.warning('No rooms found.');
      }
    } catch (error) {
      toast.error('Failed to load room data.');
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    getListRoom(searchText.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleUpdateRoom = async (updatedRoom: ParamsRoom) => {
    try {
      const formData = new FormData();
      formData.append('room_id', updatedRoom.room_id.toString());
      formData.append('name', updatedRoom.name);
      formData.append('address', updatedRoom.address);
      formData.append('rentalDate', updatedRoom.rental_date);
      formData.append('price', updatedRoom.price.toString());
      formData.append('rating', updatedRoom.rating.toString());
      formData.append('description_room', updatedRoom.description_room);
      formData.append('check_in', updatedRoom.check_in);
      formData.append('check_out', updatedRoom.check_out);
      formData.append('status', updatedRoom.status);
      formData.append('bed_rooms', updatedRoom.bed_rooms.toString());
      formData.append('bath_room', updatedRoom.bath_room.toString());
      formData.append('occupancy_limit', updatedRoom.occupancy_limit.toString());

      if (updatedRoom.image) {
        const imageBlob = await fetch(updatedRoom.image).then(res => res.blob());
        formData.append('image', imageBlob, 'image.jpg');
      }
      const response = await axios.put(`/api/update-room/${updatedRoom.room_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success('Room updated successfully!');
      getListRoom();
    } catch (error) {
      toast.error('Failed to update room!');
    }
  };

  const columns = [
    {
      title: 'Room ID',
      dataIndex: 'room_id',
      key: 'room_id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img
          src={image}
          alt="room"
          className="w-24 h-20 object-cover rounded-md shadow-sm"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => `${rating}/5`,
    },
    {
      title: 'Bedrooms',
      dataIndex: 'bed_rooms',
      key: 'bed_rooms',
    },
    {
      title: 'Bathrooms',
      dataIndex: 'bath_room',
      key: 'bath_room',
    },
    {
      title: 'Occupancy Limit',
      dataIndex: 'occupancy_limit',
      key: 'occupancy_limit',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Room List</h1>

        <div className="flex flex-row gap-4 items-center">
          <Input
            placeholder="Search by room name or address"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mb-4 max-w-[350px] h-[40px]"
          />
          <Button
            className="bg-main py-2 px-4 !font-[500] !text-white rounded-md cursor-pointer"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </Button>
        </div>

        <Table
          dataSource={rooms}
          columns={columns}
          rowKey="room_id"
          loading={loading}
          bordered
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedRoom(record);
              setIsModalVisible(true);
            },
            style: { cursor: 'pointer' }
          })}
        />
      </div>
      <RoomDetailModal
        isModalVisible={isModalVisible}
        selectedRoom={selectedRoom}
        onClose={() => setIsModalVisible(false)}
        onUpdate={handleUpdateRoom}
      />
    </div>
  );
};

export default RoomListPage;
