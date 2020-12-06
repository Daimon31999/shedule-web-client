import React, { useState, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import moment from 'moment'

import Timer from '../components/Timer'
import Timetable from '../components/Timetable'
import CloudNav from '../components/CloudNav'

import footerImg from './../img/footer.png'
import sunImg from './../img/sun.png'
import '../../static/tailwind.css'
import '../css/App.css'

export default function Home() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [breakIndex, setBreakIndex] = useState(null)

  const getDayOfWeek = () => {
    let days = [
      'воскресение',
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота',
      '',
    ]
    let todayIndex = new Date().getDay()
    console.log('getDayOfWeek -> days[todayIndex]', days[todayIndex])
    return days[todayIndex]
  }

  const parity = () => {
    var d0 = new Date().getTime(),
      d = new Date(new Date().getFullYear(), 0, 1),
      d1 = d.getTime(),
      dd = d.getDay(),
      re = Math.floor((d0 - d1) / 8.64e7) + (dd ? dd - 1 : 6)
    let result
    Math.floor(re / 7) % 2 ? (result = 'odd') : (result = 'even')
    return result
  }

  console.log('parity', parity())

  useEffect(() => {
    fetch('https://wshedule.herokuapp.com/shedule')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result)
          setIsLoaded(true)
        },
        (error) => {
          setError(error)
          setIsLoaded(true)
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error.message}</div>
  } else if (!isLoaded) {
    const override = `
  display: block;
  margin: 0 auto;
  margin-top: 40vh;
`
    return (
      <ClipLoader
        css={override}
        size={150}
        color={'#1EA7C6'}
        loading={!isLoaded}
      />
    )
  } else {
    let timeTable = items[0].timeTable.slice(0)
    // let count = 1
    // let shortFormat = "hh:mm"
    // let longFormat = "hh:mm:ss"

    // for (let i = 0; i < items[0].timeTable.length * 2 - 2; i++) {
    //   let startBreak = moment(
    //     items[0].timeTable[count - 1][1],
    //     shortFormat
    //   ).format(shortFormat)
    //   let endBreak = moment(items[0].timeTable[count][0], shortFormat).format(
    //     shortFormat
    //   )
    //   count++
    //   i++
    //   timeTable.splice(i, 0, [startBreak, endBreak])
    // }
    return (
      <div id='index-wrapper'>
        <div id='index'>
          <div
            className='main-container
        w-full
        flex flex-col lg:flex-row gap-40 flex-shrink-0
        '
            //       className="main-container
            // w-full bg-gradient-to-b from-sky via-white to-white
            // flex flex-row gap-40 flex-shrink-0
            // "
          >
            <CloudNav
              items={items}
              dayOfWeek={getDayOfWeek()}
              parity={parity()}
            />
            <Timer
              items={items}
              timeTable={timeTable}
              dayOfWeek={getDayOfWeek()}
              breakIndex={breakIndex}
              parity={parity()}
            />
            <Timetable
              timeTable={timeTable}
              breakIndex={breakIndex}
              setBreakIndex={setBreakIndex}
            />

            <img
              className='sun hidden z-0 lg:block absolute top-0 right-0 lg:w-64 lg:h-64'
              src={sunImg}
              alt='sun'
            />
          </div>
          {/* <img className="absolute bottom-0" src={footerImg} alt="" /> */}
        </div>
      </div>
    )
  }
}
