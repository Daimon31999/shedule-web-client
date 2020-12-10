import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import Axios from 'axios'
import ClockLoader from 'react-spinners/ClockLoader'
import SaveButton from '../components/SaveButton'
import Alert from '../components/Alert'
import DayCard from '../components/DayCard'

import homeImg from '../img/home.png'
import backImg from '../img/back.png'
import clockImg from '../img/clock.png'

export default function CalendarAdmin({ location }) {
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(false)
  useEffect(() => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user',
    }).then((res) => {
      setItems(res.data)
      setLoading(false)
    })
  }, [])

  if (items && location.state) {
    const parity = location.state.parity
    const group = items.group

    const days = []
    const mapDays = () => {
      for (const key in items.shedule[parity]) {
        if (items.shedule[parity][key].length > 0)
          days.push(
            <DayCard
              key={key}
              day={key}
              data={items}
              setData={setItems}
              setAlert={setAlert}
              parity={parity}
            />
          )
      }
      return days
    }
    const save = async () => {
      Axios.put('http://localhost:4000/shedule', items, {
        withCredentials: true,
      })
        .then((r) => {
          setAlert(true)
        })
        .catch((e) => console.log(e))
    }

    return (
      <div className='mb-36'>
        <Alert
          alert={alert}
          setAlert={setAlert}
          heading='Успешно сохраннено!'
          type='success'
          text={``}
          position='fixed bottom-12 left-0'
        />
        <h1 className='w-full pt-4 px-4 h-24 lg:h-24 bg-admin-blue capitalize font-medium text-2xl lg:text-4xl flex items-center text-white'>
          <span className='ml-2 lg:ml-16'>
            Рассписание {parity === 'even' ? 'Парной' : 'Непарной'} недели{' '}
            {group}{' '}
          </span>
        </h1>
        <div className='flex px-4 bg-admin-blue py-1 pb-3 lg:py-4 items-center'>
          <Link
            to='/'
            className='flex hover-img-invert flex-row items-center w-20 lg:w-24 '>
            <img className='mr-1 mt-1 w-6 h-6' src={backImg} alt="'back"></img>
            <img
              id='home'
              className='w-8 h-8 lg:w-10 lg:h-10'
              src={homeImg}
              alt='home'
            />
          </Link>
          <Link to='/time-admin' className='flex flex-row items-center w-24 '>
            <img
              id='home'
              className='w-8 h-8 lg:w-10 lg:h-10 hover-img-invert'
              src={clockImg}
              alt='clock'
            />
          </Link>
        </div>

        <div className='wrapper mt-20'>{mapDays()}</div>
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
