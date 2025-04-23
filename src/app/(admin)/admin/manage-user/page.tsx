"use client";

import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SearchOutlined,
  DeleteOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Button,
  Box,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

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
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    userId: string | null;
    action: "delete" | "restore" | null;
  }>({ open: false, userId: null, action: null });

  const token = localStorage.getItem("token");

  const fetchUsers = async (search: string = "") => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { search: search || undefined },
      });

      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers(searchText);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  const handleRestore = async (userId: string) => {
    try {
      const response = await axios.put(
        `/api/admin/users?id=${userId}`,
        { status: "active" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success("User restored successfully");
        fetchUsers(searchText);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error restoring user");
    }
  };

  const handleDialogConfirm = () => {
    if (confirmDialog.action === "delete" && confirmDialog.userId) {
      handleDelete(confirmDialog.userId);
    } else if (confirmDialog.action === "restore" && confirmDialog.userId) {
      handleRestore(confirmDialog.userId);
    }
    setConfirmDialog({ open: false, userId: null, action: null });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => (a.name || "").localeCompare(b.name || ""),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Verify",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified: boolean) => (
        <Typography color={isVerified ? "green" : "error"}>
          {isVerified ? "Verified" : "Unverified"}
        </Typography>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "deleted" | "active") => (
        <Typography color={status === "deleted" ? "error" : "green"}>
          {status === "deleted" ? "Deleted" : "Active"}
        </Typography>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Stack direction="row" spacing={1}>
          {record.status === "active" ? (
            <Button
              color="error"
              onClick={() =>
                setConfirmDialog({
                  open: true,
                  userId: record._id,
                  action: "delete",
                })
              }
            >
              <DeleteOutlined />
            </Button>
          ) : (
            <Button
              color="success"
              onClick={() =>
                setConfirmDialog({
                  open: true,
                  userId: record._id,
                  action: "restore",
                })
              }
            >
              <UndoOutlined />
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" mb={3}>
        <Typography variant="h5" component="h2">
          Manage Users
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Input
            placeholder="Search by name, email, or phone"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined />}
            className="max-w-md"
            size="large"
          />
          <button
            className="bg-main p-2 rounded-sm text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </Stack>
      </Box>

      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 5,
          responsive: true,
          showSizeChanger: true,
        }}
      />

      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() =>
          setConfirmDialog({ open: false, userId: null, action: null })
        }
      >
        <DialogTitle>
          {confirmDialog.action === "delete"
            ? "Are you sure you want to delete this user?"
            : "Are you sure you want to restore this user?"}
        </DialogTitle>
        <DialogActions>
          <button
            className="p-2 rounded-sm"
            onClick={() =>
              setConfirmDialog({ open: false, userId: null, action: null })
            }
          >
            Cancel
          </button>

          <button
            className="bg-main p-2 rounded-sm text-white"
            onClick={handleDialogConfirm}
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUser;
