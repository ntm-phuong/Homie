import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";

interface CalendarSectionProps {
  selectedDates: {
    startDate: Date;
    endDate: Date;
  };
  setSelectedDates: (dates: { startDate: Date; endDate: Date }) => void;
  location: string;
  disabledDates: { check_in: string; check_out: string }[]; // Thêm danh sách ngày đã đặt
}

const CalendarSection = ({
  selectedDates,
  setSelectedDates,
  location,
  disabledDates,
}: CalendarSectionProps) => {
  const startDate = dayjs(selectedDates.startDate);
  const endDate = dayjs(selectedDates.endDate);

  const getNights = () => {
    const diffTime = endDate.diff(startDate, "day");
    return Math.max(1, diffTime);
  };

  const handleDateChange = (dates: any) => {
    if (dates?.length === 2) {
      setSelectedDates({
        startDate: dates[0].toDate(),
        endDate: dates[1].toDate(),
      });
    }
  };

  const resetDates = () => {
    setSelectedDates({
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000),
    });
  };

  // Hàm kiểm tra ngày có bị disable không
  const isDateDisabled = (current: dayjs.Dayjs) => {
    return disabledDates.some(({ check_in, check_out }) => {
      const start = dayjs(check_in);
      const end = dayjs(check_out);
      return current.isSame(start, "day") || current.isSame(end, "day") || (current.isAfter(start, "day") && current.isBefore(end, "day"));
    });
  };
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff66b2",
        },
        components: {
          DatePicker: {
            activeBorderColor: "#ff66b2",
            hoverBorderColor: "#ff99cc",
            cellActiveWithRangeBg: "#ffd6e7",
            cellRangeBorderColor: "#ff66b2",
            cellHoverBg: "#ffebf5",
          },
        },
      }}
    >
      <div className="border border-gray-300 hover:black rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-1">
          {getNights()} night{getNights() > 1 ? "s" : ""} at {location}
        </h2>
        <p className="mb-4 text-base pt-3">
          {startDate.format("DD MMM YYYY")} – {endDate.format("DD MMM YYYY")}
        </p>

        <div className="max-w-[300px] pt-2">
          <DatePicker.RangePicker
            value={[startDate, endDate]}
            onChange={handleDateChange}
            format="DD MMM YYYY"
            disabledDate={isDateDisabled} // Disable các ngày đã đặt
            className="custom-range-picker"
          />
        </div>

        <button
          className="mt-3 text-sm underline text-gray-700 hover:text-black pt-6"
          onClick={resetDates}
        >
          Clear dates
        </button>
      </div>
    </ConfigProvider>
  );
};

export default CalendarSection;