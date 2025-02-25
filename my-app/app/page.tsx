'use client'

// File: pages/index.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image, { StaticImageData } from 'next/image';
import FallingBeam from '@/components/FallingBeam';
import Confetti from '@/components/Confetti';
import kravall_puss from "../public/pictures/kravall_puss.jpeg";
import kravall_2 from "../public/pictures/kravall_2.jpeg";
import kravall_3 from "../public/pictures/kravall_3.jpeg";
import mat_1 from "../public/pictures/mat_1.jpeg";
import mat_2 from "../public/pictures/mat_2.jpeg";
import mat_3 from "../public/pictures/mat_3.jpeg";
import gym_1 from "../public/pictures/gym_1.jpeg";
import gym_2 from "../public/pictures/gym_2.jpeg";
import vandra_1 from "../public/pictures/vandra_1.jpeg";
import vandra_2 from "../public/pictures/vandra_2.jpeg";
import vandra_3 from "../public/pictures/vandra_3.jpeg";
import pussla from "../public/pictures/pussla.jpeg";
import mysa_1 from "../public/pictures/mysa_1.jpeg";
import mysa_2 from "../public/pictures/mysa_2.jpeg";
import mysa_3 from "../public/pictures/mysa_3.jpeg";
import train from "../public/pictures/train.jpeg";
import dejt_1 from "../public/pictures/dejt_1.jpeg";
import dejt_2 from "../public/pictures/dejt_2.jpeg";
import dejt_3 from "../public/pictures/dejt_3.jpeg";
import dejt_4 from "../public/pictures/dejt_4.jpeg";
import dejt_5 from "../public/pictures/dejt_5.jpeg"; 

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define interfaces for our data structures
interface TimeDifference {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Memory {
  description: string;
  image: StaticImageData;
}

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
}

// Add this at the top of your file to disable SSR for this page
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function Home() {
  // State for anniversary date and time difference
  const [timeDifference, setTimeDifference] = useState<TimeDifference>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // State for memory modal
  const [showMemory, setShowMemory] = useState<boolean>(false);
  const [currentMemory, setCurrentMemory] = useState<number>(0);
  
  // State for confetti
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  // Ref for timeline section
  const timelineRef = useRef<HTMLElement | null>(null);
  
  const startDate = new Date('2025-01-25'); 
  
  // Update the memories array with an absolute URL
  const memories: Memory[] = [
    { 
      description: 'Älskar att gå på kravaller med dig ❤️',
      image: kravall_puss
    },
    {
      description: 'Älskar att gå på kravaller med dig ❤️',
      image: kravall_2
    },
    {
      description: "Älskar att gå på kravaller med dig ❤️",
      image: kravall_3
    },
    { 
      description: 'Älskar att (lära mig) laga mat med dig ❤️',
      image: mat_1
    },
    {
      description: 'Älskar att (lära mig) laga mat med dig ❤️',
      image: mat_2
    },
    {
      description: "Älskar att (lära mig) laga mat med dig ❤️",
      image: mat_3
    },
    {
      description: 'Älskar att gymma med dig ❤️',
      image: gym_1
    },
    {
      description: "Älskar att gymma med dig ❤️",
      image: gym_2
    },
    {
      description: "Älskar att vandra med dig ❤️",
      image: vandra_1
    },
    {
      description: 'Älskar att vandra med dig ❤️',
      image: vandra_2
    },
    {
      description: "Älskar att vandra med dig❤️",
      image: vandra_3
    },
    {
      description: "Älskar att pussla med dig❤️",
      image: pussla
    },
    {
      description: 'Älskar att mysa med dig❤️',
      image: mysa_1
    },
    {
      description: "Älskar att mysa med dig❤️",
      image: mysa_2
    },
    {
      description: "Älskar att mysa med dig❤️",
      image: mysa_3
    },
    {
      description: "Älskar att åka tåg med dig❤️",
      image: train
    },
    {
      description: "Älskar att gå på mysiga dejter med dig❤️",
      image: dejt_1
    },
    {
      description: 'Älskar att gå på mysiga dejter med dig❤️',
      image: dejt_2
    },
    {
      description: "Älskar att gå på mysiga dejter med dig❤️",
      image: dejt_3
    },
    {
      description: "Älskar att gå på mysiga dejter med dig❤️",
      image: dejt_4
    },
    {
      description: "Älskar att gå på mysiga dejter med dig❤️",
      image: dejt_5
    }
  ];
  
  // Update timeline events without images
  const timelineEvents: TimelineEvent[] = [
    { 
      title: 'Första gången vi träffades', 
      date: '15 november 2024', 
      description: 'Ganska gott med öl.'
    },
    { 
      title: 'Andra gången vi träffades', 
      date: '18 november 2024', 
      description: "Otroligt gott med lasagne faktiskt!"
    },
    { 
      title: 'Julklappslek med familjen Laurell', 
      date: '18 december 2024', 
      description: "Jag var fan livrädd."
    },
    { 
      title: 'Första gången vi sa att vi älskade varandra', 
      date: '18 januari 2025', 
      description: 'Sket nästan på mig.'
    },
    { 
      title: 'TILSAMMANS!!', 
      date: '25 januari 2025', 
      description: 'Väldigt tacksam över dig.'
    }
  ];
  
  // Calculate time difference function
  const calculateTimeDifference = useCallback((): void => {
    const now = new Date();
    // Calculate time elapsed since the start date (positive value)
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    
    // Calculate months (approximate)
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    
    // Calculate remaining days after removing months
    const remainingTime = diffTime - (diffMonths * 1000 * 60 * 60 * 24 * 30.44);
    const diffDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    
    // Calculate remaining hours after removing days
    const remainingTimeAfterDays = remainingTime - (diffDays * 1000 * 60 * 60 * 24);
    const diffHours = Math.floor(remainingTimeAfterDays / (1000 * 60 * 60));
    
    // Calculate remaining minutes after removing hours
    const remainingTimeAfterHours = remainingTimeAfterDays - (diffHours * 1000 * 60 * 60);
    const diffMinutes = Math.floor(remainingTimeAfterHours / (1000 * 60));
    
    // Calculate remaining seconds after removing minutes
    const remainingTimeAfterMinutes = remainingTimeAfterHours - (diffMinutes * 1000 * 60);
    const diffSeconds = Math.floor(remainingTimeAfterMinutes / 1000);
    
    setTimeDifference({
      months: diffMonths,
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      seconds: diffSeconds
    });
  }, [startDate]);
  
  // Wrap initializeTimeline in useCallback to prevent recreation
  const initializeTimeline = useCallback(() => {
    if (typeof window !== 'undefined' && timelineRef.current) {
      // Reduce the number of animations
      const events = gsap.utils.toArray<HTMLElement>('.timeline-event');
      
      // Create one timeline for all events instead of individual animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Add all events to the timeline
      events.forEach((event) => {
        tl.fromTo(
          event,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.3 },
          "-=0.1" // Slight overlap for smoother animation
        );
      });
      
      // Reduce the number of heart animations
      const hearts = document.querySelectorAll<HTMLElement>('.heart');
      // Only animate a subset of hearts to reduce load
      const heartsToAnimate = Array.from(hearts).slice(0, 10);
      
      heartsToAnimate.forEach((heart: HTMLElement) => {
        gsap.to(heart, {
          y: -10,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: 'power1.out',
          delay: Math.random()
        });
      });
    }
  }, []);
  
  // Show a random memory
  const showRandomMemory = (): void => {
    const randomIndex = Math.floor(Math.random() * memories.length);
    setCurrentMemory(randomIndex);
    setShowMemory(true);
  };

  // Handler for next button click with confetti
  const handleNextClick = (): void => {
    // Change to next image
    setCurrentMemory(prev => (prev === memories.length - 1 ? 0 : prev + 1));
    
    // Simple confetti trigger
    setShowConfetti(false);
    setTimeout(() => {
      setShowConfetti(true);
      // No need for reset timeout as the effect is brief
    }, 10);
  };
  
  // Also modify your useEffect to use a cleanup function for GSAP
  useEffect(() => {
    calculateTimeDifference();
    const interval = setInterval(calculateTimeDifference, 1000);
    
    // Add a small delay before initializing GSAP
    const timelineTimeout = setTimeout(() => {
      initializeTimeline();
    }, 500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timelineTimeout);
      // Kill all GSAP animations on unmount
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');
      }
    };
  }, [calculateTimeDifference, initializeTimeline]);
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Head>
        <title>HEJJJJ</title>
        <meta name="description" content="A celebration of our love story" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Confetti component */}
      <Confetti isActive={showConfetti} />
      
      {/* FallingBeam as background for the entire page */}
      <div className="fixed inset-0 z-0">
        <FallingBeam 
          beamCount={100} 
          backgroundColor="black" 
          text=""
        />
      </div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-10">Grattis på månadsdagen!</h1>
          
          {/* Counter - improved mobile layout */}
          <div className="mb-10">
            <p className="text-lg mb-4 text-white">Vi har varit tillsammans i:</p>
            
            {/* First row - months, days, hours */}
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.months}</div>
                <div className="text-white">Månader</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.days}</div>
                <div className="text-white">Dagar</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.hours}</div>
                <div className="text-white">Timmar</div>
              </div>
            </div>
            
            {/* Second row - minutes and seconds centered */}
            <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.minutes}</div>
                <div className="text-white">Minuter</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeDifference.seconds}</div>
                <div className="text-white">Sekunder</div>
              </div>
            </div>
          </div>
          
          {/* Memory Button */}
          <button 
            onClick={showRandomMemory} 
            className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            Tryck på mig
          </button>
        </section>
        
        {/* Timeline Section */}
        <section ref={timelineRef as React.RefObject<HTMLElement>} className="min-h-screen pb-20">
          <h2 className="text-4xl font-bold text-center text-white pt-10 mb-12">(Väldigt, väldigt) Sammanfattad tidslinje</h2>
          
          <div className="relative max-w-3xl mx-auto px-4">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white opacity-50"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`timeline-event relative mb-16 ${index % 2 === 0 ? 'left-event' : 'right-event'}`}
              >
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="bg-black bg-opacity-70 rounded-lg shadow-lg p-6 w-full z-10 border border-white border-opacity-30">
                    <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                    <p className="text-white opacity-80 mb-2">{event.date}</p>
                    <p className="text-white">{event.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                </div>
                
                {/* Floating hearts */}
                <div className="heart absolute text-white opacity-70" style={{ left: `${30 + Math.random() * 40}%`, bottom: `${60 + Math.random() * 30}%` }}>❤️</div>
                <div className="heart absolute text-white opacity-70" style={{ right: `${30 + Math.random() * 40}%`, bottom: `${70 + Math.random() * 20}%` }}>❤️</div>
              </div>
            ))}
          </div>
          
          {/* Final message */}
          <div className="text-center mt-20 px-4">
            <h3 className="text-3xl font-bold text-white mb-4">+ Många många fler!</h3>
            <p className="text-lg max-w-2xl mx-auto text-white">Jag älskar dig.</p>
          </div>
        </section>
      </main>
      
      {/* Memory Modal */}
      {showMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4" onClick={() => setShowMemory(false)}>
          {/* Description text moved outside and made bigger */}
          <p className="text-3xl font-medium text-white mb-6 text-center max-w-2xl">
            {memories[currentMemory].description}
          </p>
          
          <div className="bg-black rounded-lg max-w-lg w-full overflow-hidden border-opacity-30" onClick={e => e.stopPropagation()}>
            <div className="relative p-4">
              
              {/* Image display */}
              <div className="mb-4 w-[320px] h-[400px]">
                <Image
                  src={memories[currentMemory].image}
                  alt="Memory"
                  width={400}
                  height={400}
                  className="rounded-2xl w-full h-full object-cover"
                  priority
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                  }}
                />
              </div>
              
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => setCurrentMemory(prev => (prev === 0 ? memories.length - 1 : prev - 1))}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
                >
                  Förra
                </button>
                <button 
                  id='next-up-button'
                  onClick={handleNextClick}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
                >
                  Nästa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}