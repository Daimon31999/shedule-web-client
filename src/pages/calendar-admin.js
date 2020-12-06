import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
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
    const fetchData = async () => {
      const result = await axios('https://wshedule.herokuapp.com/shedule')
      setItems(result.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (items && location.state) {
    const parity = location.state.parity
    const group = items[0].group

    const days = []
    const mapDays = () => {
      for (const key in items[0].shedule[parity]) {
        if (items[0].shedule[parity][key].length > 0)
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
      console.log('days', days)
      return days
    }
    const save = async () => {
      axios
        .put('https://wshedule.herokuapp.com/shedule' + items[0]._id, items[0])
        .then((r) => console.log(r.data))
        .catch((e) => console.log(e))
    }
    console.log('parity', parity)

    console.log('items[0].shedule[parity]', items[0].shedule[parity])
    return (
      <div className='mb-36'>
        <Alert
          alert={alert}
          setAlert={setAlert}
          heading='Внимание!'
          text='добавьте пару сюда'
          linkTo='time-admin'
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
            <img className='mr-1 mt-1 w-6 h-6' src={backImg}></img>
            <img
              id='home'
              className='w-8 h-8 lg:w-10 lg:h-10'
              src={homeImg}
              alt=''
            />
          </Link>
          <Link to='/time-admin' className='flex flex-row items-center w-24 '>
            <img
              id='home'
              className='w-8 h-8 lg:w-10 lg:h-10 hover-img-invert'
              src={clockImg}
              alt=''
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
