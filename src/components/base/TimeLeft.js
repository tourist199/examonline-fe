import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

function TimeLeft({ timeEnd, cb }) {
    const [timeString, setTimeString] = useState('')

    useEffect(() => {
        /**
         * Thuc hien ham CB khi het thoi gian
         */
        if (timeEnd && moment(timeEnd) < moment() && cb)
            cb()


        const timeInterval = setInterval(() => {
            let timeLeft = moment.duration(moment(timeEnd).diff(moment()))
            if (!timeEnd)
                setTimeString('')
            else setTimeString(`${('0' + timeLeft.get('hours')).slice(-2)} : ${('0' + timeLeft.get('minutes')).slice(-2)} : ${('0' + timeLeft.get('seconds')).slice(-2)}`)

        }, 1000);
        return () => {
            clearInterval(timeInterval)
        }
    }, [timeEnd])

    return (
        <span style={{ color: 'red', fontWeight: 'bold' }}>
            {timeString}
        </span>
    )
}

TimeLeft.propTypes = {
    timeEnd: PropTypes.string,
    cb: PropTypes.func
}

export default TimeLeft

