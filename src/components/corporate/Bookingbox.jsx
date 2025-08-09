import React, { useState } from "react";
import {
  BedDouble,
  Plane,
  Car,
  BookUser,
  Shield,
} from "lucide-react";
import  FlightForm  from "./Forms/flight-form";
import { cn } from "../../lib/utils";
import HotelForm from "./Forms/hotel-form";
import { CarForm } from "./Forms/car-form";
import { VisaForm } from "./Forms/visa-form";
import { InsuranceForm } from "./Forms/insurance-form";

const tabItems = [
  { label: "Hotels", value: "hotels", icon: <BedDouble className="h-5 w-5" /> },
  { label: "Flights", value: "flights", icon: <Plane className="h-5 w-5" /> },
  { label: "Cars", value: "cars", icon: <Car className="h-5 w-5" /> },
  { label: "Visas", value: "visas", icon: <BookUser className="h-5 w-5" /> },
  { label: "Insurance", value: "insurance", icon: <Shield className="h-5 w-5" /> },
];

export default function BookingBox() {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab Triggers */}
      <div className="grid w-full grid-cols-5 bg-background backdrop-blur-sm rounded-t-lg p-1 h-auto border-b border-border shadow-md">
        {tabItems.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-2 h-14 text-xs sm:text-sm md:text-base px-2 py-1 font-medium transition-all duration-300 border-b-2 rounded-md",
              activeTab === tab.value
                ? "bg-[#4B0082] text-white border-[#4B0082]" // Active
                : "bg-transparent text-[#4b0082] border-transparent hover:bg-[#9400d310]"
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#E6E6FA] p-4 md:p-8 rounded-b-lg shadow-xl border border-border text-black">
        {activeTab === "hotels" && <HotelForm/>}
        {activeTab === "flights" && <FlightForm />}
        {activeTab === "cars" && <CarForm/>}
        {activeTab === "visas" && <VisaForm/>}
        {activeTab === "insurance" && <InsuranceForm/>}
      </div>
    </div>
  );
}
