import { Book, BarChart, MessageSquare } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { motion } from 'framer-motion';

export default function FeatureGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-16 grid md:grid-cols-3 gap-8"
    >
      <FeatureCard
        icon={<Book />}
        title="Health Condition Encyclopedia"
        description="Explore our comprehensive guide to various skin and eye conditions."
        buttonText="Learn More"
      />
      <FeatureCard
        icon={<BarChart />}
        title="Personalized Insights"
        description="Get tailored recommendations based on your health analysis history."
        buttonText="View Dashboard"
      />
      <FeatureCard
        icon={<MessageSquare />}
        title="Expert Consultations"
        description="Connect with dermatologists and ophthalmologists for professional advice."
        buttonText="Book a Session"
      />
    </motion.div>
  );
}
