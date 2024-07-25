"use client"

import React from 'react'
import CustomButton from "./CustomButton";
import Statsbar from "./Statsbar";
import Searchbar from "@/components/Searchbar";

const Hero = () => {
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
          <h1 className="hero__title">
              Descubre productos agricolas cerca de tí
          </h1>
          <p className="hero__subtitle">
              Conectando productores y consumidores
          </p>
          <div className="mt-10 pb-5">
              <Searchbar/>
          </div>
          <Statsbar/>
      </div>
    </div>

  )
}

export default Hero