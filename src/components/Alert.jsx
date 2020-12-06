import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

export default function Alert({
  heading,
  text,
  bgColor,
  textColor,
  setAlert,
  alert,
  linkTo,
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])
  return (
    <div className="fixed top-0 left-0 w-full">
      <div
        className={`${alert ? "flex" : "hidden"} justify-between items-center ${
          bgColor || "bg-yellow-200"
        } relative ${textColor || "text-yellow-600"} py-3 px-3 rounded-lg`}
      >
        <div>
          <span className="font-semibold text-yellow-700">{heading} </span>
          <span>{text} </span>
          {!linkTo ? (
            ""
          ) : (
            <Link to={`/${linkTo}`}>
              <span className="hover:text-lite-blue text-blue underline">
                <span className="text-2xl">{linkTo}</span>
              </span>
            </Link>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setAlert(false)
            }}
            className=" text-yellow-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
