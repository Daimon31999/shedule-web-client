import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import ClockLoader from 'react-spinners/ClockLoader'

import PairCards from '../components/PairCards'
import SaveButton from '../components/SaveButton'

import homeImg from '../img/home.png'
import backImg from '../img/back.png'
import calendar_even from './../img/calendar_even.png'
import calendar_odd from './../img/calendar_odd.png'

export default function TimeAdmin({ location }) {
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://wshedule.herokuapp.com/shedule')
      setItems(result.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  // "timeTable": [
  //   ["08:00", "09:30"],
  //   ["09:40", "11:10"],
  //   ["11:20", "12:50"],
  //   ["13:00", "14:30"],
  //   ["14:40", "16:10"]
  // ]

  if (items && location.state) {
    const parity = location.state.parity

    const group = items[0].group
    const pairs = []

    const mapPairs = () => {
      pairs.push()
      return pairs
    }
    const save = async () => {
      axios
        .put('https://wshedule.herokuapp.com/shedule' + items[0]._id, items[0])
        .then((r) => console.log(r.data))
        .catch((e) => console.log(e))
    }
    return (
      <div>
        <h1 className='w-full pt-4 px-4 h-24 lg:h-24 bg-admin-blue capitalize font-medium text-2xl lg:text-4xl flex items-center text-white'>
          <span className='lg:ml-16'>Время {group} </span>
        </h1>
        <div className='flex px-4 bg-admin-blue py-1 pb-3 lg:py-4 items-center'>
          <Link
            to='/'
            className='flex hover-img-invert flex-row items-center lg:w-24 '>
            <img className='mr-1 mt-1 w-6 h-6' src={backImg}></img>
            <img
              id='home'
              className='w-8 h-8 lg:w-10 lg:h-10 mr-3'
              src={homeImg}
              alt=''
            />
          </Link>
          <Link to='/calendar-admin' state={{ parity: 'even' }}>
            <img
              className='hover-img-invert w-8 h-8 lg:w-10 lg:h-10 mr-1'
              src={calendar_even}
              alt=''
            />
          </Link>

          <Link to='/calendar-admin' state={{ parity: 'odd' }}>
            <img
              className='hover-img-invert w-8 h-8 lg:w-10 lg:h-10'
              src={calendar_odd}
              alt=''
            />
          </Link>
        </div>

        <div className='wrapper mt-4 mb-20 lg:my-20'>
          <PairCards data={items} setData={setItems} />
        </div>
        <SaveButton save={save} />
      </div>
    )
  } else {
    const override = `
  display: block;
  margin: 0 auto;
  margin-top: 40vh;
`
    return (
      <ClockLoader
        css={override}
        size={150}
        color={'#017383'}
        loading={loading}
      />
    )
  }
}
