import { ChevronDown, Grid3X3, Star, Trophy, ArrowRight, Wallet, BadgeDollarSign, PercentCircle, Info, HelpCircle, Sparkles, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Button = ({ children, className = "", variant = "default", size = "default", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground ",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-primary",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input bg-transparent",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-lg font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Floating animation for feature badges
  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const staggeredFloat = (delay) => ({
    y: [-8, 12, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  return (
    <main className="bg-gray-900 text-white">
   
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
 
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{ scale: heroScale }}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90" />
        </motion.div>

        <motion.div 
          className="container relative z-20 px-4 mx-auto text-center" 
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Main Heading */}
          

          <div className="absolute md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative md:mt-[10%]  mt-[-65%]"
            >
              <img 
                src="/images/tree.png" 
                alt="Sustainability Tree" 
                className="w-98 h-98 object-contain filter drop-shadow-2xl"
              />

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-[0] md:-top-8 px-2 w-full"
              >
                <h1 className="text-4xl md:text-7xl font-bold mb-4 text-white text-center">
                  Empowering farmers through
                </h1>
                <div className="flex flex-wrap justify-center items-center gap-2 text-lg md:text-3xl font-medium text-white text-center">
                  <span className="border-b-2 border-white">truth</span>
                  <span>,</span>
                  <span className="border-b-2 border-white">technology</span>
                  <span>, and</span>
                  <span className="border-b-2 border-white">transparency</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute md:bottom-8 md:bottom-0 inset-x-0 mx-auto w-fit cursor-pointer z-20"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-lg  px-6 py-3 border border-white/20">
                  <div className="text-green-600 text-3xl font-bold">15,000+</div>
                  <div className="text-gray-600 text-xl">farmer empowering</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              animate={staggeredFloat(0)}
              className="absolute md:top-[40%] top-[-70%] md:left-0"
            >
              <Badge className="bg-white/90 text-gray-600 px-4 py-2 text-sm md:text-lg font-medium shadow-lg">
                AI-driven quality checks
              </Badge>
            </motion.div>

            <motion.div
              animate={staggeredFloat(1)}
              className="absolute md:top-[50%] top-[-15%] right-4 md:right-0"
            >
              <Badge className="bg-white/90 text-gray-800 px-4 py-2 text-sm md:text-lg font-medium shadow-lg">
                NFT-backed certification
              </Badge>
            </motion.div>

            <motion.div
              animate={staggeredFloat(2)}
              className="absolute md:top-[60%]  top-[40%] left-4 md:left-12"
            >
              <Badge className="bg-white/90 text-gray-800 px-4 py-2 text-sm md:text-lg font-medium shadow-lg">
                Transparent reputation
              </Badge>
            </motion.div>
          </div>

    
          
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={() => {
            document
              .querySelector("#features-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 rounded-full bg-white border border-white flex items-center justify-center">
            <ChevronDown className="h-6 w-6 text-black" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Building Trust Through Technology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines AI verification, blockchain certification, and community transparency 
              to create a new standard for sustainable farming practices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Quality Verification",
                description: "Advanced algorithms verify the authenticity and quality of sustainable farming practices in real-time.",
                icon: "🤖",
              },
              {
                title: "NFT Certifications",
                description: "Immutable blockchain certificates that prove your environmental impact and sustainable practices.",
                icon: "🏆",
              },
              {
                title: "Transparent Reputation",
                description: "Build trust with consumers through transparent tracking of your environmental contributions.",
                icon: "🌟",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-green-400/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-green-400">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-500/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15,000+", label: "Farmers Empowered" },
              { number: "2.5M", label: "Tokens Distributed" },
              { number: "850", label: "Verified Projects" },
              { number: "99.2%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}