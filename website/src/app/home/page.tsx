"use client";
import Image from "next/image";
import Navbar from "../components/MQTECHSOC/Navbar";
import Hero from "../components/MQTECHSOC/Hero";
import { Card } from "../components/FINtech componets/card";
import ServicesCards from "../components/TechStartupcomponets/ServicesCards";
import ContentPages from "../components/TechStartupcomponets/Contentpages";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesCards />
      


    </>
  );
}
