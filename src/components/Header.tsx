/**
 * Author: Allan Deschamps
 * Surf Farm - Header Component
 */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Calendar, TrendingUp } from 'lucide-react';
import MobileBookingForm from './MobileBookingForm';

export const WeatherWidget = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-full cursor-pointer"
  >
    <div className="flex items-center gap-1">
      <span className="text-white text-xs">🌊</span>
      <span className="text-white text-xs font-semibold">1.5m</span>
    </div>
    <div className="w-px h-4 bg-white/30"></div>
    <div className="flex items-center gap-1">
      <span className="text-white text-xs">💨</span>
      <span className="text-white text-xs font-semibold">12km/h</span>
    </div>
    <div className="w-px h-4 bg-white/30"></div>
    <div className="flex items-center gap-1">
      <span className="text-white text-xs">🌡️</span>
      <span className="text-white text-xs font-semibold">18°C</span>
    </div>
  </motion.div>
);

interface HeaderProps {
  customMobileWidget?: React.ReactNode;
  customDesktopWidget?: React.ReactNode;
  customRightWidget?: React.ReactNode | ((props: { openForecastModal: () => void }) => React.ReactNode);
}

const Header = ({ customMobileWidget, customDesktopWidget, customRightWidget }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [forecastModalOpen, setForecastModalOpen] = useState(false);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openForecastModal = () => {
    setForecastModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeForecastModal = () => {
    setForecastModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openBookingForm = () => {
    setBookingFormOpen(true);
    setForecastModalOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBookingForm = () => {
    setBookingFormOpen(false);
    setSelectedForecast(null);
    document.body.style.overflow = 'unset';
  };

  const [selectedForecast, setSelectedForecast] = useState<{ day: string; date: string } | null>(null);

  const handleDaySelect = (day: string, date: string, availability: string) => {
    if (availability === 'full') {
      alert('This day is fully booked. Please select another day.');
      return;
    }
    setSelectedForecast({ day, date });
    openBookingForm();
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 lg:px-12 lg:py-6"
      >
        <nav className="glass rounded-full px-4 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 flex items-center justify-between max-w-7xl mx-auto shadow-2xl">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              <span className="text-[#075985]">Surf</span>{' '}
              <span className="text-[#16a34a]">Farm</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links or Custom Widget */}
          {customDesktopWidget ? (
            <div className="hidden md:flex items-center gap-4 lg:gap-8 ml-auto mr-4">
              {customDesktopWidget}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4 lg:gap-8 ml-auto mr-4">
              {/* Empty center area if no widget provided */}
            </div>
          )}

          {/* Weather Forecast Widget - Desktop Only */}
          {typeof customRightWidget === 'function' ? (
            customRightWidget({ openForecastModal })
          ) : customRightWidget ? (
            customRightWidget
          ) : (
            <WeatherWidget onClick={openForecastModal} />
          )}

          {/* Mobile Widget Area */}
          <div className="lg:hidden">
            {customMobileWidget ? (
              customMobileWidget
            ) : (
              <motion.div
                onClick={openForecastModal}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 px-3 py-1.5 rounded-full backdrop-blur-md cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm">🌊</span>
                  <span className="text-white text-[10px] font-semibold">1.5m</span>
                </div>
                <div className="w-px h-3 bg-white/30"></div>
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm">💨</span>
                  <span className="text-white text-[10px] font-semibold">12km/h</span>
                </div>
                <div className="w-px h-3 bg-white/30"></div>
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm">🌡️</span>
                  <span className="text-white text-[10px] font-semibold">18°C</span>
                </div>
              </motion.div>
            )}
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Link href="/" onClick={closeMobileMenu} className="text-2xl font-bold tracking-tight">
                    <span className="text-[#075985]">Surf</span>{' '}
                    <span className="text-[#16a34a]">Farm</span>
                  </Link>
                  <button
                    onClick={closeMobileMenu}
                    className="touch-target text-gray-700 hover:text-gray-900"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-1">
                    {[
                      { name: 'Mission', href: '/' },
                      { name: 'Surf', href: '/surf' },
                      { name: 'Join Us', href: '/join' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>


                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    © {new Date().getFullYear()} Allan Deschamps
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Forecast Modal */}
      <AnimatePresence>
        {forecastModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={closeForecastModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col h-full max-h-[90vh]">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-white" />
                      <h2 className="text-2xl font-bold text-white">7-Day Surf Forecast</h2>
                    </div>
                    <button
                      onClick={closeForecastModal}
                      className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                      aria-label="Close forecast"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-white/90 text-sm">Plan your perfect surf session with our weekly forecast</p>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { day: 'Today', date: 'Dec 5', waves: '1.2-1.8m', wind: '12 km/h NW', temp: '18°C', rating: '7/10', condition: 'Good', availability: 'available', slotsLeft: 5 },
                      { day: 'Tomorrow', date: 'Dec 6', waves: '1.5-2.0m', wind: '10 km/h W', temp: '19°C', rating: '8/10', condition: 'Excellent', availability: 'available', slotsLeft: 8 },
                      { day: 'Saturday', date: 'Dec 7', waves: '1.8-2.2m', wind: '8 km/h SW', temp: '20°C', rating: '9/10', condition: 'Epic', availability: 'limited', slotsLeft: 2 },
                      { day: 'Sunday', date: 'Dec 8', waves: '1.0-1.5m', wind: '15 km/h NE', temp: '17°C', rating: '6/10', condition: 'Fair', availability: 'available', slotsLeft: 6 },
                      { day: 'Monday', date: 'Dec 9', waves: '0.8-1.2m', wind: '18 km/h E', temp: '16°C', rating: '5/10', condition: 'Poor', availability: 'full', slotsLeft: 0 },
                      { day: 'Tuesday', date: 'Dec 10', waves: '1.3-1.7m', wind: '11 km/h W', temp: '18°C', rating: '7/10', condition: 'Good', availability: 'available', slotsLeft: 7 },
                      { day: 'Wednesday', date: 'Dec 11', waves: '1.6-2.1m', wind: '9 km/h SW', temp: '19°C', rating: '8/10', condition: 'Excellent', availability: 'limited', slotsLeft: 3 },
                    ].map((forecast, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: forecast.availability !== 'full' ? 1.02 : 1 }}
                        whileTap={{ scale: forecast.availability !== 'full' ? 0.98 : 1 }}
                        onClick={() => handleDaySelect(forecast.day, forecast.date, forecast.availability)}
                        className={`glass p-4 rounded-2xl ${forecast.rating.startsWith('9') || forecast.rating.startsWith('8')
                          ? 'ring-2 ring-green-400'
                          : forecast.rating.startsWith('7')
                            ? 'ring-2 ring-cyan-400'
                            : ''
                          } ${forecast.availability !== 'full'
                            ? 'cursor-pointer hover:shadow-lg transition-shadow'
                            : 'opacity-75 cursor-not-allowed'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900">{forecast.day}</h3>
                            <p className="text-xs text-gray-600">{forecast.date}</p>
                          </div>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-full ${forecast.rating.startsWith('9') || forecast.rating.startsWith('8')
                              ? 'bg-green-100 text-green-700'
                              : forecast.rating.startsWith('7')
                                ? 'bg-cyan-100 text-cyan-700'
                                : forecast.rating.startsWith('6')
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                          >
                            {forecast.rating}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">🌊 Waves</span>
                            <span className="font-semibold text-gray-900">{forecast.waves}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">💨 Wind</span>
                            <span className="font-semibold text-gray-900">{forecast.wind}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">🌡️ Water</span>
                            <span className="font-semibold text-gray-900">{forecast.temp}</span>
                          </div>
                        </div>

                        <div className={`mt-3 pt-3 border-t ${forecast.rating.startsWith('9') || forecast.rating.startsWith('8')
                          ? 'border-green-200'
                          : forecast.rating.startsWith('7')
                            ? 'border-cyan-200'
                            : 'border-gray-200'
                          }`}>
                          <p className="text-xs font-semibold text-center text-gray-700 mb-2">
                            {forecast.condition}
                          </p>

                          {/* Availability Indicator */}
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${forecast.availability === 'available'
                                ? 'bg-green-100 text-green-700'
                                : forecast.availability === 'limited'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-red-100 text-red-700'
                                }`}
                            >
                              <span className={`w-2 h-2 rounded-full ${forecast.availability === 'available'
                                ? 'bg-green-500'
                                : forecast.availability === 'limited'
                                  ? 'bg-orange-500'
                                  : 'bg-red-500'
                                }`}></span>
                              {forecast.availability === 'available' && `${forecast.slotsLeft} slots`}
                              {forecast.availability === 'limited' && `${forecast.slotsLeft} left`}
                              {forecast.availability === 'full' && 'Fully Booked'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeForecastModal}
                      className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={openBookingForm}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Book a Session
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Booking Form */}
      <MobileBookingForm
        isOpen={bookingFormOpen}
        onClose={closeBookingForm}
        selectedDay={selectedForecast?.day}
        selectedDate={selectedForecast?.date}
      />
    </>
  );
};

export default Header;
