'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
    >
      <nav className="glass rounded-full px-8 py-4 flex items-center justify-between max-w-7xl mx-auto shadow-2xl">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#075985]">Surf</span>{' '}
            <span className="text-[#16a34a]">Farm</span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 md:gap-10">
          {['About', 'Classes', 'Shop'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
