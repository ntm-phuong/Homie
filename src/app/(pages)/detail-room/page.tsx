'use client';
import { ShareAltOutlined, HeartOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { FaCar, FaChair, FaDoorClosed, FaDoorOpen, FaExclamationTriangle, FaMapMarkerAlt, FaSmokingBan, FaSnowflake, FaSwimmingPool, FaTree, FaUtensils, FaWater, FaWifi } from 'react-icons/fa';
import { DatePicker, Space } from 'antd';
import { useState } from 'react';

const DetailRoom = () => {
  const { RangePicker } = DatePicker;

  const roomImages = [
    "/img/picture1.png",
    "/img/picture2.png",
    "/img/picture3.png",
    "/img/picture4.png",
    "/img/picture5.png",
    "/img/avatar.png",
  ];

  const _renderTitle = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 className="text-2xl md:text-2xl font-bold mb-4 md:mb-0 pb-5">
        [Lazy House] Wooden sensibility's private sensibility accommodation
      </h1>
      <div className="flex space-x-2 gap-4 ">
        <button className="flex items-center text-gray-600 hover:text-gray-900 gap-2">
          <ShareAltOutlined />
          <span className="text-sm md:text-base ">Share</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-900 ml-4 gap-2">
          <HeartOutlined />
          <span className="text-sm md:text-base">Save</span>
        </button>
      </div>
    </div>
  );

  const _renderPhotoGallery = () => (
    <div className="mb-8">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 pr-1 ">
        <div className="relative col-span-2 row-span-2 rounded-tl-lg overflow-hidden">
          <Image
            src={roomImages[0]}
            alt="Main room image"
            className="object-cover"
          />
        </div>
        {roomImages.slice(1, 5).map((img, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${index === 0
              ? "rounded-tr-lg"
              : index === 2
                ? "rounded-bl-lg"
                : index === 3
                  ? "rounded-br-lg"
                  : ""
              }`}
          >
            <Image
              src={img}
              alt={`Room image ${index + 1}`}
              className="object-cover"
            />
            {index === 3 && (
              <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                <button className="flex items-center bg-white px-3 py-1 rounded-md text-sm font-medium">
                  <ShareAltOutlined className="mr-1" />
                  <span>Show all photos</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const _renderWhatThisPlaceOffers = () => (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold mt-6 mb-4 pb-6">
        What this place offers
      </h2>
      <div className="grid grid-cols-2 gap-y-5 text-lg text-neutral-800 pb-6">
        {[
          [<FaDoorClosed />, "Room door lock"],
          [<FaWifi />, "Wi-Fi"],
          [<FaCar />, "Free parking on premises"],
          [<FaSnowflake />, "Air conditioning"],
          [
            <FaExclamationTriangle className="text-gray-500" />,
            <s>Carbon monoxide detector</s>,
          ],
          [<FaWater />, "Lake access"],
          [<FaChair />, "Dedicated workspace"],
          [<FaSwimmingPool />, "Pool"],
          [<FaUtensils />, "Breakfast"],
          [<FaSmokingBan className="text-gray-500" />, <s>Smoke detector</s>],
        ].map(([icon, text], i) => (
          <div className="flex items-center gap-4" key={i}>
            <span className="text-xl text-gray-800">{icon}</span>
            <p
              className={
                typeof text === "string" ? "" : "line-through text-neutral-500"
              }
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const _renderPriceBox = () => (
    <div className="sticky top-2 self-start pt-66">
      <div className="border border-neutral-300 rounded-2xl shadow-lg p-6 space-y-6 w-[320px]">
        <h3 className="text-2xl font-semibold pb-5">
          <span className="mr-1">€3000</span>
          <span className="text-base font-normal text-neutral-700">night</span>
        </h3>
        <div className="border rounded-xl overflow-hidden">
          <div className="">
            <RangePicker placeholder={['Check in', 'Check out']}
            />
          </div>
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase">
                Guests
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                1 guest
              </p>
            </div>
            <span className="text-lg text-neutral-500">⌄</span>
          </div>
        </div>
        <div className="pt-5">
          <button className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-xl font-medium hover:brightness-110 transition">
            Reserve
          </button>
        </div>
        <p className="text-center text-sm text-neutral-700">
          You won't be charged yet
        </p>
        <div className="pt-4 text-lg font-base space-y-5">
          <div className="flex justify-between">
            <p className="underline">
              €3000 x 2 nights
            </p>
            <p>€{3000 * 2}</p>
          </div>
          <div className="flex justify-between pb-6">
            <p className="underline">Homie service fee</p>
            <p>€{6000}</p>
          </div>
          <hr className="border-t border-neutral-300 pt-6" />
          <div className="flex justify-between font-semibold text-neutral-900 mt-2">
            <p>Total</p>
            <p>€{6000}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const _renderAboutThisPlace = () => (
    <div className="pt-6 pb-6">
      <p className="pt-4 text-base pb-6">
        Some info has been automatically translated.{" "}
        <span className="underline font-medium cursor-pointer">
          Show original
        </span>
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 pb-6">About this place</h2>
      <p className="text-base leading-relaxed text-justify text-neutral-800">
        Our house located in Phu Tho town center. It’s close enough to walk to
        restaurants and cafes but far enough to where you don’t hear noises from
        cars and people from the street. The garden is surrounded, make cool for
        our bungalow. The swimming pool is so nice and it’s cool in temperature so
        it’s perfect for the hot days. Beside, we also provide services as
        transportation service (by bus/by train/by private car), laundry service,
        tours, motobike for rent, ……
      </p>
      <button className="mt-3 text-base font-semibold underline flex items-center gap-1 pt-3">
        Show more <span>›</span>
      </button>
    </div>
  );

  const _renderRoomFeatures = () => (
    <div className="space-y-6 border-b border-gray-200 leading-loose pb-6 pt-6 pl-3 mb-6 w-full">
      {[
        {
          icon: <FaDoorOpen className="text-xl text-gray-800 mt-1" />,
          title: "Room in a home",
          desc: "Your own room in a home, plus access to shared spaces.",
        },
        {
          icon: <FaTree className="text-xl text-gray-800 mt-1" />,
          title: "Outdoor entertainment",
          desc: "The pool and alfresco dining are great for summer trips.",
        },
        {
          icon: <FaMapMarkerAlt className="text-xl text-gray-800 mt-1" />,
          title: "Calm and convenient location",
          desc: "This area is easy to get around.",
        },
      ].map((item, i) => (
        <div className="flex items-center gap-4" key={i}>
          {item.icon}
          <div>
            <p className="font-semibold text-lg leading-relaxed">{item.title}</p>
            <p className="text-base text-gray-600 leading-normal">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='lg:px-38'>
      {_renderTitle()}
      {_renderPhotoGallery()}
      {_renderAboutThisPlace()}
      {_renderRoomFeatures()}
      {_renderWhatThisPlaceOffers()}
      {_renderPriceBox()}
    </div>
  );
}

export default DetailRoom;