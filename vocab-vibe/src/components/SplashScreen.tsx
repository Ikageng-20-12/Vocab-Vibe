import  { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<'initial' | 'stacked' | 'expanded'>('initial');

  useEffect(() => {
    // Stage 1: Show stacked VV
    setTimeout(() => setStage('stacked'), 500);
    
    // Stage 2: Expand to VocabVibe
    setTimeout(() => setStage('expanded'), 2000);
    
    // Stage 3: Complete animation
    setTimeout(onComplete, 3500);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {/* Stacked VV */}
          {stage === 'initial' || stage === 'stacked' ? (
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-7xl font-bold text-white absolute top-0 left-1/2 -translate-x-1/2"
                initial={{ y: 0 }}
                animate={stage === 'stacked' ? { y: -20 } : { y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                V
              </motion.div>
              <motion.div
                className="text-7xl font-bold text-white absolute top-0 left-1/2 -translate-x-1/2"
                initial={{ y: 0 }}
                animate={stage === 'stacked' ? { y: 20 } : { y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                V
              </motion.div>
            </motion.div>
          ) : null}

          {/* Expanded VocabVibe */}
          {stage === 'expanded' && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-7xl font-bold text-white inline-block"
                initial={{ width: "auto" }}
                animate={{ width: "auto" }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  V
                </motion.span>
                <motion.span
                  className="text-7xl font-bold text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  ocab
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  V
                </motion.span>
                <motion.span
                  className="text-7xl font-bold text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  ibe
                </motion.span>
              </motion.span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;