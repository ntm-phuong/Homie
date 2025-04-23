"use client";

import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Popconfirm, Typography } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
  status: "active" | "deleted";
}

const ManageUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async (search: string = "") => {
    try {
      setLoading(true);

      const response = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: search || undefined,
        },
      });

      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchText);
  }, []);

  const handleSearch = () => {
    fetchUsers(searchText);
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await axios.delete(`/api/admin/users?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers(searchText);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleRestore = async (userId: string) => {
    try {
      const response = await axios.put(
        `/api/admin/users?id=${userId}`,
        { status: "active" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("User restored successfully");
        fetchUsers(searchText);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Verify",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified: boolean) => (
        <Space>
          <span className={isVerified ? "text-green-600" : "text-red-600"}>
            {isVerified ? "Verified" : "Unverified"}
          </span>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "deleted" | "active") => (
        <Space>
          {status === "deleted" ? (
            <span className="text-red-600 ml-2">Deleted</span>
          ) : (
            <span className="text-green-600">Active</span>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space>
          {record.status === "active" ? (
            <>
              <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  className="text-red-600 hover:text-red-800"
                />
              </Popconfirm>
            </>
          ) : (
            <Popconfirm
              okButtonProps={{
                className: "bg-main",
              }}
              title="Are you sure you want to restore this user?"
              onConfirm={() => handleRestore(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                icon={<UndoOutlined />}
                className="text-green-600 hover:text-green-800"
              />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="sm:flex justify-between pb-4 gap-4">
        <Typography.Title level={2}>Manage Users</Typography.Title>
        <div className="mb-6 flex items-center gap-4">
          <Space>
            <Input
              placeholder="Search by name, email, or phone"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
              className="max-w-md"
              size="large"
            />
            <Button
              size="large"
              type="primary"
              onClick={handleSearch}
              className="bg-main"
            >
              Search
            </Button>
          </Space>
        </div>
      </div>

      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ManageUser;
