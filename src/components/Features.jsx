import { motion, useReducedMotion } from 'framer-motion';

const featureList = [
  {
    eyebrow: 'Focus',
    title: 'Intentional',
    detail: 'A softer way in.',
  },
  {
    eyebrow: 'Guidance',
    title: 'Warm',
    detail: 'Helpful, never noisy.',
  },
  {
    eyebrow: 'Rhythm',
    title: 'Balanced',
    detail: 'Momentum with calm.',
  },
];

const Features = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      className="feature-list"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.95 }}
    >
      {featureList.map((feature) => (
        <li className="feature-item" key={feature.title}>
          <p className="feature-eyebrow">{feature.eyebrow}</p>
          <p className="feature-title">{feature.title}</p>
          <p className="feature-detail">{feature.detail}</p>
        </li>
      ))}
    </motion.ul>
  );
};

export default Features;
