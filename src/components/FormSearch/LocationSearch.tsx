'use client';
import { DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { useRef, useState } from "react";
const { RangePicker } = DatePicker;

const LocationSearch = ({ onSearchLocation }: { onSearchLocation: (val: string) => void }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const formatSelectedDates = () => {
    if (!selectedDates[0] || !selectedDates[1]) return "Add dates";
    const format = "D MMM";
    return `${selectedDates[0].format(format)} - ${selectedDates[1].format(
      format
    )}`;
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setSelectedDates(dates);
    } else {
      setSelectedDates([null, null]);
    }
  }

  const handleClearDates = () => {
    setSelectedDates([null, null]);
    setShowDatePicker(false);
  };

  const handleApplyDates = () => {
    setShowDatePicker(false);
  };

  const handleSearch = () => {
    onSearchLocation(searchKeyword);
  };

  const _renderLocationSearch = () => (
    // Thêm w-1/2 để chia đôi tỷ lệ với cục Schedule
    <div className="flex flex-col items-center justify-center p-1 w-1/2">
      <div className="font-medium text-base text-center w-full">Location</div>
      <input
        // Thêm truncate và bg-transparent để input không phá vỡ khung trên mobile
        className="text-sm text-gray-600 outline-none text-center w-full truncate bg-transparent"
        placeholder="Search destinations"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );

  const _renderDatePickerPopup = () => (
    <div
      ref={datePickerRef}
      // Sửa left-1/3 thành left-0 right-0 trên mobile để popup không bị tràn ra ngoài viền điện thoại
      className="absolute top-[110%] left-0 right-0 md:left-1/3 mt-2 p-4 bg-white rounded-xl shadow-lg z-50 w-full md:w-auto"
    >
      <RangePicker
        className="w-full"
        format="DD/MM/YYYY"
        value={selectedDates}
        onChange={handleDateChange}
      />
      <div className="mt-4 flex justify-between">
        <button
          className="text-gray-500 underline cursor-pointer bg-transparent border-none"
          onClick={handleClearDates}
        >
          Clear dates
        </button>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded-md cursor-pointer border-none"
          onClick={handleApplyDates}
        >
          Apply
        </button>
      </div>
    </div>
  );

  const _renderDatePickerComponent = () => (
    // Thêm w-1/2
    <div className="flex items-center justify-between border-l border-gray-300 pl-2 p-1 w-1/2">
      {/* Thêm overflow-hidden để kết hợp với truncate bên dưới */}
      <div className="flex-1 overflow-hidden pr-1">
        <div className="font-medium text-base text-center w-full">Schedule</div>
        <div
          // Thêm truncate để text ngày tháng bị dài sẽ biến thành "..."
          className="flex justify-center items-center text-sm text-gray-600 cursor-pointer truncate w-full"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {formatSelectedDates()}
        </div>
      </div>
      <button
        type="button"
        onClick={handleSearch}
        // Thêm shrink-0 để nút không bị ép méo. Resize nút trên mobile nhỏ xuống một xíu (36px).
        className="shrink-0 w-[36px] h-[36px] md:w-[45px] md:h-[45px] rounded-full bg-[#ff2e63] flex items-center justify-center shadow-md hover:opacity-80 transition cursor-pointer"
      >
        <SearchOutlined style={{ color: 'white' }} className="text-[16px] md:text-[20px]" />
      </button>
      {showDatePicker && _renderDatePickerPopup()}
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center px-2">
      {/* Thay class min-w-xl (có thể gây lỗi cuộn ngang) bằng w-full max-w-2xl */}
      <div className="relative flex justify-center items-center border border-gray-200 rounded-full shadow-sm p-1 md:p-2 w-full max-w-2xl bg-white">
        {/* Đổi từ grid sang flex flex-row để chia tỷ lệ dễ hơn mà không bị vỡ */}
        <div className="flex flex-row w-full items-center">
          {_renderLocationSearch()}
          {_renderDatePickerComponent()}
        </div>
      </div>
    </div>
  );
}

export default LocationSearch;