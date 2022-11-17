import { useState, useEffect } from 'react';

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "December, 31, 2022";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <div className="raffle-countdown">
            <div className="timer-info">
                <div className="timer-info-col">
                    <div className="value">{Math.floor(days/10)}</div>
                    <div className="value">{days%10}</div>
                    <div className="label">Days</div>
                </div>
                <div className="timer-info-col">
                    <div className="seperator">:</div>
                </div>
                <div className="timer-info-col">
                    <div className="value">{Math.floor(hours/10)}</div>
                    <div className="value">{hours%10}</div>
                    <div className="label">Hours</div>
                </div>
                <div className="timer-info-col">
                    <div className="seperator">:</div>
                </div>
                <div className="timer-info-col">
                    <div className="value">{Math.floor(minutes/10)}</div>
                    <div className="value">{minutes%10}</div>
                    <div className="label">Minutes</div>
                </div>
                <div className="timer-info-col">
                    <div className="seperator">:</div>
                </div>
                <div className="timer-info-col">
                    <div className="value">{Math.floor(seconds/10)}</div>
                    <div className="value">{seconds%10}</div>
                    <div className="label">Seconds</div>
                </div>
            </div>
        </div>
    </>    
  );
};

export default Timer;