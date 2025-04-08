"use client";

import { useEffect, useState } from "react";

const Home = () => {
  
  const [users, setUsers] = useState([]);
  console.log(users, 'chinh13');
  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  return (
    <div className="bg-red-500 lg:px-38">
      Đi đi em , do dự tới hạn mất
    </div>
  );
};

export default Home;
