import React, { useState, useEffect } from 'react';

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 4,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get current time in South Africa
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));
      const targetDate = new Date(now);
      targetDate.setMonth(targetDate.getMonth() + 4);

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.44);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ months, days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      <div className="bg-black p-4 rounded-lg text-center min-w-[90px]">
        <div className="text-secondary-400 text-3xl font-bold">{timeLeft.months}</div>
        <div className="text-white text-sm">Months</div>
      </div>
      <div className="bg-black p-4 rounded-lg text-center min-w-[90px]">
        <div className="text-secondary-400 text-3xl font-bold">{timeLeft.days}</div>
        <div className="text-white text-sm">Days</div>
      </div>
      <div className="bg-black p-4 rounded-lg text-center min-w-[90px]">
        <div className="text-secondary-400 text-3xl font-bold">{timeLeft.hours}</div>
        <div className="text-white text-sm">Hours</div>
      </div>
      <div className="bg-black p-4 rounded-lg text-center min-w-[90px]">
        <div className="text-secondary-400 text-3xl font-bold">{timeLeft.minutes}</div>
        <div className="text-white text-sm">Minutes</div>
      </div>
      <div className="bg-black p-4 rounded-lg text-center min-w-[90px]">
        <div className="text-secondary-400 text-3xl font-bold">{timeLeft.seconds}</div>
        <div className="text-white text-sm">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;