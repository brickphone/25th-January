'use client'

// File: pages/index.tsx
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import FallingBeam from '@/components/FallingBeam';
import Confetti from '@/components/Confetti';
import kravall_puss from "../public/pictures/kravall_puss.jpeg";
import kravall_2 from "../public/pictures/kravall_2.jpeg";
import kravall_3 from "../public/pictures/kravall_3.jpeg";

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
  image: any; // Using 'any' for imported images, but you could be more specific
}

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
}

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
  const calculateTimeDifference = (): void => {
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
  };
  
  // Update the timeline animation
  const initializeTimeline = (): void => {
    if (typeof window !== 'undefined' && timelineRef.current) {
      gsap.utils.toArray<HTMLElement>('.timeline-event').forEach((event) => {
        gsap.fromTo(
          event,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: event,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        const hearts = event.querySelectorAll<HTMLElement>('.heart');
        hearts.forEach((heart: HTMLElement) => {
          gsap.to(heart, {
            y: -20,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: 'power1.out',
            delay: Math.random() * 2
          });
        });
      });
    }
  };
  
  // Show a random memory
  const showRandomMemory = (): void => {
    const randomIndex = Math.floor(Math.random() * memories.length);
    setCurrentMemory(randomIndex);
    setShowMemory(true);
  };

  // Handler for next button click with confetti
  const handleNextClick = (): void => {
    setCurrentMemory(prev => (prev === memories.length - 1 ? 0 : prev + 1));
    // Trigger confetti
    setShowConfetti(true);
    // Reset confetti after animation duration
    setTimeout(() => setShowConfetti(false), 3000);
  };
  
  // Initialize counter and timeline on component mount
  useEffect(() => {
    calculateTimeDifference();
    const interval = setInterval(calculateTimeDifference, 1000);
    
    // Initialize GSAP timeline
    initializeTimeline();
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Head>
        <title>HEJJJJ</title>
        <meta name="description" content="A celebration of our love story" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Confetti component */}
      <Confetti isActive={showConfetti} duration={3000} particleCount={150} />
      
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