"use client";
import { useEffect } from "react";
import BarChart from "./components/BarChart/BarChart";
import { generateDummyData } from "./utils/helpers/ChartHelpers";
import ScratchCard from "./components/ScratchCard/ScratchCard";

export default function Home() {
  const apiKey =
    "1003.e245d03a1d97e52be5baecff811af0e9.9ab76982d8b0072d43c2ff65d37399af";
  const url =
    "https://www.zohoapis.in/crm/v2/functions/createleadfromtoolyt/actions/execute?auth_type=apikey&zapikey=" +
    apiKey; // Replace ... with the specific API endpoint you want to call
  const data = {
    first_name: "postman",
    last_name: "Albert2",
    phone: "8882663034",
    caretaker_or_patient_self: "Albert",
    pain_site: "[Test1,test2]",
    pain_intensity: "5",
    DRO_comments: "test comments",
    lead_sub_source: "test",
    DRO_lead_type: "test",
    dispensary_or_chemist_name: "test",
    doctor_name: "DR test",
    clinic_name: "test",
    select_zone: "zone",
    first_occurence: "test",
    progress: "test",
    assign_to: "test",
  };
  const formData = new FormData();
  formData.append("arguments", JSON.stringify(data));

  const submit = () => {
    console.log("submit");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Process the API response data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900">
      <ScratchCard />
    </main>
  );
}

const randData = generateDummyData(0, 100000, 2309);
