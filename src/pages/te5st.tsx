// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import moment from "moment-jalaali";
// import "react-calendar/dist/Calendar.css";

// moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

// function PersianCalendar() {
//   const [date, setDate] = useState<Date | null>(new Date());

//   const onChange = (newDate: Date | Date[] | null) => {
//     if (newDate instanceof Date) {
//       setDate(newDate);
//     }
//   };

//   const formatJalaaliDate = (date: Date | null): string => {
//     if (!date) return "";
//     return moment(date).format("jYYYY/jMM/jDD");
//   };

//   return (
//     <div className="p-6 max-w-sm mx-auto bg-white rounded-2xl shadow">
//       <Calendar onChange={onChange} value={date} />
//       <div className="mt-4 text-sm">
//         <p>تاریخ میلادی انتخاب‌شده: {date?.toDateString()}</p>
//         <p>تاریخ شمسی انتخاب‌شده: {formatJalaaliDate(date)}</p>
//       </div>
//     </div>
//   );
// }

// export default PersianCalendar;
