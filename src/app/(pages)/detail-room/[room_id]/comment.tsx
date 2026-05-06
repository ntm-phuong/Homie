import React, { useEffect, useState } from "react";
import { IMAGE_URL } from "@/public";
import { Pagination } from "antd"; // Import thêm Pagination từ antd

interface Review {
  _id: string;
  user_email: string;
  user_name: string;
  user_avatar: string;
  comment: string;
  createdAt: string;
}

const CommentSection = ({ roomId }: { roomId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // --- STATE CHO PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // Số lượng review hiển thị trên 1 trang

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
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchReviews();
  }, [roomId]);

  const fetchReviews = async () => {
    try {
      const numericRoomId = Number(roomId);
      if (isNaN(numericRoomId)) {
        return;
      }
      const res = await fetch(`/api/comment/${numericRoomId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.comments);
      }
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const numericRoomId = Number(roomId);
      if (isNaN(numericRoomId)) {
        setLoading(false);
        return;
      }

      const email = localStorage.getItem("email") || "anonymous_user";
      const res = await fetch(`/api/comment/?room_id=${numericRoomId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room_id: numericRoomId,
          user_email: email,
          comment: newComment,
          user_name: user?.name || "Anonymous",
          user_avatar: user?.avatar || "default_avatar.png",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReviews((prevReviews) =>
          Array.isArray(prevReviews) ? [data.data, ...prevReviews] : [data.data]
        );
        setNewComment("");
        setCurrentPage(1); // Reset về trang 1 để user thấy ngay comment vừa đăng
        await fetchReviews();
      }
    } catch (error) {} finally {
      setLoading(false);
    }
  };

  // --- LOGIC XỬ LÝ DỮ LIỆU PHÂN TRANG ---
  // 1. Đảm bảo mảng luôn được sắp xếp mới nhất lên đầu (đề phòng API trả về lộn xộn)
  const sortedReviews = Array.isArray(reviews) 
    ? [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  // 2. Cắt mảng để lấy đúng 3 phần tử của trang hiện tại
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="mt-6 pt-10 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
        <span className="text-xl font-medium text-gray-500">
          ({reviews.length})
        </span>
      </div>

      {/* Review List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-8">
        {currentReviews.length > 0 ? (
          currentReviews.map((review: Review) =>
            review && review._id ? (
              <div key={review._id} className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <img
                    src={review.user_avatar || IMAGE_URL.USER}
                    alt={`${review.user_name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100 border border-gray-200"
                  />
                  <div>
                    {/* User Info */}
                    <h3 className="text-base font-semibold text-gray-900">
                      {review.user_name && review.user_name !== "Anonymous"
                        ? review.user_name
                        : review.user_email.split("@")[0]}
                    </h3>
                    {/* Comment Date */}
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {/* Comment Text */}
                <p className="text-gray-700 leading-relaxed break-words text-base">
                  {review.comment}
                </p>
              </div>
            ) : null
          )
        ) : (
          <p className="text-gray-500 md:col-span-2">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      {/* COMPONENT PHÂN TRANG */}
      {reviews.length > reviewsPerPage && (
        <div className="flex justify-center w-full mb-12">
          <Pagination
            current={currentPage}
            total={reviews.length}
            pageSize={reviewsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}

      {/* Add New Review Form */}
      <div className="max-w-2xl bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-100">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">
          Leave a Review
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff385c] focus:border-transparent outline-none resize-none transition-all text-gray-700 bg-white"
              placeholder="Share your experience about this place..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="px-6 py-3 bg-[#ff2e63] text-white font-semibold rounded-xl hover:bg-[#e02655] disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-start shadow-sm"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;