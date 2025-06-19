'use client';

import { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles, ArrowRight, Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownCardProps {
  value: number;
  label: string;
  isLast?: boolean;
}

const CountdownCard = ({ value, label, isLast = false }: CountdownCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative group"
  >
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="text-center">
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono"
        >
          {value.toString().padStart(2, '0')}
        </motion.div>
        <div className="text-sm md:text-base text-white/80 font-medium uppercase tracking-wider">
          {label}
        </div>
      </div>
      {!isLast && (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 hidden md:block">
          <div className="w-1 h-8 bg-white/30 rounded-full"></div>
        </div>
      )}
    </div>
  </motion.div>
);

export default function DiscountCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);

  const targetDate = new Date('2025-07-01T00:00:00').getTime();

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
      setHasExpired(false);
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setHasExpired(true);
    }
  }, [targetDate]);

  useEffect(() => {
    // Initial calculation
    calculateTimeLeft();
    
    // Set visibility after mount for animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Update timer
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [calculateTimeLeft]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="text-center mb-12">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-sm px-6 py-2 rounded-full shadow-lg border-0"
              >
                <Sparkles className="w-4 h-4" />
                LIMITED TIME OFFER
                <Sparkles className="w-4 h-4" />
              </Badge>
            </motion.div>

            {/* Main heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                15% OFF
              </span>
              <br />
              <span className="text-white">All Photography Sessions</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Book your session starting July 1st, 2025 and save big on your photography experience
            </motion.p>

            {/* Date info */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-white/80 mb-8"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Offer starts: July 1st, 2025</span>
            </motion.div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-white/80" />
              <h3 className="text-xl font-semibold text-white/90">Time Remaining</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              <CountdownCard value={timeLeft.days} label="Days" />
              <CountdownCard value={timeLeft.hours} label="Hours" />
              <CountdownCard value={timeLeft.minutes} label="Minutes" />
              <CountdownCard value={timeLeft.seconds} label="Seconds" isLast />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-white/80 mb-6 text-sm md:text-base">
                <span className="font-semibold">Terms:</span> Offer valid for bookings made from July 1st, 2025 onwards. 
                Use coupon code <span className="font-mono bg-white/20 px-2 py-1 rounded">SHEYLORPHOTOGRAPHY</span> at checkout.
              </p>
              
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-white to-gray-100 text-purple-900 font-bold px-8 py-4 rounded-full hover:from-gray-100 hover:to-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
              >
                <a href="/book" className="inline-flex items-center gap-2">
                  Book Your Session Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 