import React, { useState } from "react"
import "../../static/tailwind.css"
import moment from "moment"

export default function Timetable({ timeTable, breakIndex, setBreakIndex }) {
  // 4 -> 04
  const formatTime = time => {
    time = time.split(":")
    time[0] = ("0" + time[0]).slice(-2)
    time[1] = ("0" + time[1]).slice(-2)
    return time.join(":")
  }
  const whatPairIs = timeTable => {
    let longFormat = "hh:mm:ss"
    let shortFormat = "hh:mm"
    let paraIndex = null
    let breakIndex = null

    let now = moment()
    timeTable.map((row, index) => {
      let pairStart = moment(row[0], shortFormat)
      let pairEnd = moment(row[1], shortFormat)
      if (now.isBetween(pairStart, pairEnd)) {
        paraIndex = index
        return
      }
    })

    // if break
    if (!paraIndex) {
      console.log("entry")
      for (let i = 0; i < timeTable.length - 1; i++) {
        let breakStart = moment(timeTable[i][1], shortFormat)
        let breakEnd = moment(timeTable[i + 1][0], shortFormat)
        // console.log("timeTable[i][1]", timeTable[i][1])
        // console.log("timeTable[i + 1][0]", timeTable[i + 1][0])
        if (now.isBetween(breakStart, breakEnd)) {
          setBreakIndex(i + 1)
        }
      }
    }

    return paraIndex
  }

  let count = 0
  return (
    <div
      className="
    text-xl absolute lg:relative z-10 top-5 right-5 lg:text-2xl lg:flex lg:flex-row text-lite-blue lg:items-end"
    >
      <div className="flex flex-col flex-shrink-0">
        {timeTable.map((row, index) => {
          // каждое не четное число (тоесть пропуск перемены)

          count++
          console.log("breakIndex", breakIndex)
          console.log("index", index)
          console.log("breakIndex === index", breakIndex === index)
          // если формат [[],[]]
          if (row[0] && row[1]) {
            return (
              <span
                key={row[0] + row[1] + index}
                className={
                  whatPairIs(timeTable) === index ? "font-bold text-blue" : ""
                }
              >
                {count}
                {") "}
                {formatTime(row[0])} — {formatTime(row[1])}
                {breakIndex - 1 === index ? (
                  <div className="font-bold text-blue text-xl relative">
                    <span className="absolute -left-6 top-0">→</span>
                    перемена 🥳
                  </div>
                ) : (
                  ""
                )}
              </span>
            )
          } else {
            return (
              <span className="flex" key={row[0] + row[1] + index}>
                {index}
                {") "}
                <span className="flex w-40 pl-3 overflow-hidden">
                  <span>{"—————————————"}</span>
                </span>
              </span>
            )
          }
        })}
        {/* {!whatPairIs(timeTable) ? (
          <div className="font-bold text-blue relative text-xl">
            <span className="absolute -left-6 top-0">→</span>
            <span></span>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  )
}
