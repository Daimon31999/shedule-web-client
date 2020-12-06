import React, { useState } from "react"
import { Link } from "gatsby"
import moment from "moment"

import "../../static/tailwind.css"

import cloudImg from "../img/cloud.png"
import ellipseImg from "../../static/assets/img/ellipse.png"

import SettingsPopup from "./SettingsPopup"

export default function CloudNav({ items, dayOfWeek, parity }) {
  return (
    <div className="relative ml-2 lg:ml-8">
      <nav className="cloud w-28 lg:w-48 lg:h-48 flex flex-col items-center">
        <img src={cloudImg} alt="" />
        <span className="absolute text-center leading-tight font-bold text-lite-white text-xl lg:text-3xl mt-14 lg:mt-24">
          {parity === "even" ? "Парная" : "Непарная"}
        </span>

        <span className="week-day -mt-4 lg:-mt-6 mb-2 text-lite-blue font-bold">
          {dayOfWeek}
        </span>
        <div className="round-items flex justify-around">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center mr-2 lg:mr-4">
            <img className="absolute" src={ellipseImg} alt="" />
            <span className="absolute lg:leading-tight leading-tight text-sm lg:text-base text-center font-bold text-lite-white">
              TI <br /> 182
            </span>
          </div>
          {/* <Link to="/admin" state={{ items: items }}>
            <img className="w-12 h-12 mt-4" src={settingsImg} alt="" />
          </Link> */}
          <SettingsPopup items={items} parity={parity} />
        </div>
      </nav>
    </div>
  )
}
