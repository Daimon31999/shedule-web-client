import React, { useState, useEffect } from "react"
import "../css/DayCard.module.css"

export default function DayCard({ day, setData, data, setAlert, parity }) {
  const getAbbreviation = sentence => {
    let result
    sentence = sentence.split(" ")
    result = sentence.map(word => word[0])
    result = result.join("").toUpperCase()
    return result
  }

  const handleChange = event => {
    let tmpData = Object.assign({}, data)
    tmpData[0].shedule[parity][day][event.target.name] = event.target.value
    setData(tmpData)
  }

  const handleDeleteLesson = event => {
    let tmpData = Object.assign({}, data)

    const index = tmpData[0].shedule[parity][day].indexOf(
      tmpData[0].shedule[parity][day][event.target.name]
    )
    if (index > -1 && tmpData[0].shedule[parity][day].length > 1) {
      tmpData[0].shedule[parity][day].splice(index, 1)
    }
    setData(tmpData)
  }

  const handleAddLesson = event => {
    let tmpData = Object.assign({}, data)
    const index = Number(event.target.name) + 1

    console.log("index", index)
    console.log("tmpData[0].timeTable.length", tmpData[0].timeTable.length)
    if (tmpData[0].shedule[parity][day].length < tmpData[0].timeTable.length) {
      if (index > tmpData[0].shedule[parity][day]) {
        tmpData[0].shedule[parity][day].push("")
      } else {
        tmpData[0].shedule[parity][day].splice(index, 0, "")
      }
      setData(tmpData)
    }
    //
    else {
      setAlert(true)
    }
  }
  return (
    <div>
      <div className="h-16 bg-admin-blue-lite text-admin-blue font-bold border-4 border-admin-blue lg:mx-10 my-6 flex items-center px-4 lg:px-10 text-2xl capitalize">
        <span>{day}</span>
      </div>
      <table className="w-auto mx-4 lg:mx-20 border-separate">
        <tbody>
          <tr className="h-14 bg-admin-blue-lite text-black font-bold mx-4 lg:mx-20 px-1 lg:px-10 text-base lg:text-xl capitalize">
            <th className="px-1 lg:px-10 text-left break-all">пара</th>
            <th className="px-1 lg:px-10 text-left break-all">сокращение</th>
            <th className="px-1 lg:px-10 text-left">
              полное название предмета
            </th>
          </tr>
          {data[0].shedule[parity][day].map((lesson, index) => (
            <tr
              key={index}
              className="h-14 bg-admin-blue-lite text-admin-blue font-bold text-base lg:text-xl capitalize"
            >
              <td className="px-1 lg:px-10">{index + 1}</td>
              <td className="px-1 lg:px-10">{getAbbreviation(lesson)}</td>
              <td className="w-100">
                <input
                  className="px-1 lg:px-10 outline-none bg-admin-blue-lite w-full font-bold h-12 focus:bg-white focus:text-black"
                  type="text"
                  value={lesson}
                  onChange={handleChange}
                  name={index}
                />
              </td>
              <td className="border-none bg-white">
                <input
                  type="submit"
                  name={index}
                  onClick={handleDeleteLesson}
                  className="px-3 lg:px-4 py-3 bg-red-400 text-white"
                  value="-"
                />
              </td>
              <td className="border-none bg-white">
                <input
                  type="submit"
                  name={index}
                  onClick={handleAddLesson}
                  className="px-3 lg:px-4 py-3 bg-blue-400 text-white"
                  value="+"
                />
              </td>
              {/* <td className="border-4 border-admin-blue p-3">
                <img src="https://img.icons8.com/material-rounded/24/000000/edit.png" />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
