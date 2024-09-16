import { motion } from 'framer-motion';
import { Button } from "./ui/Button";
import { Stethoscope, Eye } from 'lucide-react';

interface DiseaseOptionsProps {
  onImageTypeSelect: (type: 'rash' | 'eye') => void;
}

export default function DiseaseOptions({ onImageTypeSelect }: DiseaseOptionsProps) {
  return (
    <motion.div 
      key="step0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-4xl font-bold mb-6 text-indigo-800">Discover Your Health's Story</h2>
      <p className="text-xl mb-8 text-indigo-600">Select the type of image you'd like to analyze</p>
      <div className="flex justify-center space-x-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onImageTypeSelect('rash')}
            className="p-8 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-xl flex flex-col items-center transition-all"
          >
            <Stethoscope className="h-16 w-16 mb-4" />
            <span className="text-lg font-semibold">Skin Rash</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onImageTypeSelect('eye')}
            className="p-8 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl flex flex-col items-center transition-all"
          >
            <Eye className="h-16 w-16 mb-4" />
            <span className="text-lg font-semibold">Eye Condition</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
