
import { motion } from 'framer-motion';

const YaviLogo = () => {
  return (
    <motion.div
      className="w-16 h-16 rounded-full p-0 overflow-hidden shadow-lg bg-blue-500 flex items-center justify-center"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <span className="text-white text-2xl font-bold">VY</span>
    </motion.div>
  );
};

export default YaviLogo;
