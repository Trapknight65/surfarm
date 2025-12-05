/**
 * Author: Allan Deschamps
 * Surf Farm - Weather Forecast Slider Component
 */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Waves, Droplets, Eye, Thermometer, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ForecastData {
    waveHeight: string;
    windSpeed: string;
    windDirection: string;
    waterTemp: string;
    tide: string;
    visibility: string;
    rating: string;
}

const WeatherForecastSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const forecastData: ForecastData[] = [
        {
            waveHeight: '1.2 - 1.8m',
            windSpeed: '12 km/h',
            windDirection: 'NW',
            waterTemp: '18°C',
            tide: 'High at 14:30',
            visibility: 'Good',
            rating: '7/10'
        },
        {
            waveHeight: '1.5 - 2.0m',
            windSpeed: '15 km/h',
            windDirection: 'W',
            waterTemp: '17°C',
            tide: 'Low at 08:15',
            visibility: 'Excellent',
            rating: '8/10'
        },
        {
            waveHeight: '0.8 - 1.2m',
            windSpeed: '8 km/h',
            windDirection: 'SW',
            waterTemp: '19°C',
            tide: 'High at 15:45',
            visibility: 'Good',
            rating: '6/10'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % forecastData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [forecastData.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % forecastData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + forecastData.length) % forecastData.length);
    };

    const forecast = forecastData[currentSlide];

    return (
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 py-6 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
                    >
                        {/* Wave Height */}
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Waves className="w-6 h-6 text-white" />
                            <div>
                                <p className="text-xs text-white/80">Waves</p>
                                <p className="text-sm font-bold text-white">{forecast.waveHeight}</p>
                            </div>
                        </div>

                        {/* Wind */}
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Wind className="w-6 h-6 text-white" />
                            <div>
                                <p className="text-xs text-white/80">Wind</p>
                                <p className="text-sm font-bold text-white">{forecast.windSpeed} {forecast.windDirection}</p>
                            </div>
                        </div>

                        {/* Water Temp */}
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Thermometer className="w-6 h-6 text-white" />
                            <div>
                                <p className="text-xs text-white/80">Water</p>
                                <p className="text-sm font-bold text-white">{forecast.waterTemp}</p>
                            </div>
                        </div>

                        {/* Tide */}
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Droplets className="w-6 h-6 text-white" />
                            <div>
                                <p className="text-xs text-white/80">Tide</p>
                                <p className="text-sm font-bold text-white">{forecast.tide}</p>
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Eye className="w-6 h-6 text-white" />
                            <div>
                                <p className="text-xs text-white/80">Visibility</p>
                                <p className="text-sm font-bold text-white">{forecast.visibility}</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-3 rounded-xl col-span-2 md:col-span-2 lg:col-span-1">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <span className="text-2xl">⭐</span>
                            </div>
                            <div>
                                <p className="text-xs text-white/80">Rating</p>
                                <p className="text-sm font-bold text-white">{forecast.rating}</p>
                            </div>
                        </div>

                        {/* Forecast Day */}
                        <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm p-3 rounded-xl col-span-2 md:col-span-4 lg:col-span-1">
                            <div className="text-center">
                                <p className="text-xs text-white/80">Forecast</p>
                                <p className="text-sm font-bold text-white">Day {currentSlide + 1}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                    {forecastData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherForecastSlider;
