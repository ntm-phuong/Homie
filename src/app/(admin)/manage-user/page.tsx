"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Modal,
  Form,
  Button,
  Space,
  Popconfirm,
  Switch,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = async (search: string = "") => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users", {
        params: {
          search: search || undefined,
        },
      });
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
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

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await axios.delete(`/api/users?id=${userId}`);
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers(searchText);
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleRestore = async (userId: string) => {
    try {
      const response = await axios.put(`/api/users?id=${userId}`, {
        status: "active",
      });
      if (response.data.success) {
        toast.success("User restored successfully");
        fetchUsers(searchText);
      }
    } catch (error) {
      toast.error("Failed to restore user");
    }
  };

  const handleUpdate = async (values: any) => {
    if (!editingUser) return;

    try {
      const response = await axios.put(
        `/api/users?id=${editingUser._id}`,
        values
      );
      if (response.data.success) {
        toast.success("User updated successfully");
        setIsModalVisible(false);
        fetchUsers(searchText);
      }
    } catch (error) {
      toast.error("Failed to update user");
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
      title: "Is verified",
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
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
                className="text-blue-600 hover:text-blue-800"
              />
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
      <div className="flex justify-between pb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>
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

      <Modal
        title="Edit User"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={editingUser || {}}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input size="large" disabled />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input size="large" />
          </Form.Item>
          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-main">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUser;
