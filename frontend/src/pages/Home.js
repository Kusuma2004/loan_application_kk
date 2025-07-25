import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, DollarSign, FileText, BarChart3, ArrowRight, Sparkles,
  TrendingUp, Shield, Users, Clock
} from 'lucide-react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: CreditCard,
      title: "Create Loan",
      description: "Quick and secure loan creation with automated processing and real-time approval",
      path: "/create-loan"
    },
    {
      icon: DollarSign,
      title: "Make Payment",
      description: "Seamless payment processing with multiple payment options and instant confirmation",
      path: "/make-payment"
    },
    {
      icon: FileText,
      title: "View Ledger",
      description: "Comprehensive transaction history with detailed analytics and export capabilities",
      path: "/view-ledger"
    },
    {
      icon: BarChart3,
      title: "Customer Overview",
      description: "Complete customer dashboard with insights, trends, and performance metrics",
      path: "/overview"
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: TrendingUp, value: "99.9%", label: "Uptime" },
    { icon: Shield, value: "Bank-Level", label: "Security" },
    { icon: Clock, value: "24/7", label: "Support" }
  ];

  return (
    <div className="home-container">
      <div className="animated-bg">
        <div
          className="blob blob-blue"
          style={{ left: mousePosition.x / 10, top: mousePosition.y / 10 }}
        />
        <div
          className="blob blob-purple"
          style={{ right: mousePosition.x / 15, bottom: mousePosition.y / 15 }}
        />
      </div>

      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="content-wrapper">
        <header className={`header ${isLoaded ? 'loaded' : ''}`}>
          <nav className="nav">
            <div className="logo">
              <div className="logo-icon"><Sparkles size={24} /></div>
              <span className="logo-text">LoanAgetware</span>
            </div>
            <div className="nav-links">
              <a href="#features">Features</a>
            </div>
          </nav>
        </header>

        <section className={`hero ${isLoaded ? 'loaded' : ''}`}>
          <h1>
            Smart Loan <br />
            <span>Management</span>
          </h1>
          <p>
            Experience the future of financial management with our comprehensive loan platform. Streamlined processes, real-time analytics, and unparalleled security.
          </p>

          <div className="stats">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card ${isLoaded ? 'loaded' : ''}`}>
                <stat.icon size={32} className="stat-icon" />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className={`features-section ${isLoaded ? 'loaded' : ''}`}>
          <h2>Powerful Features</h2>
          <p>Everything you need to manage loans efficiently and securely</p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                 onClick={() => navigate(feature.path)} 
              >
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-action">
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`cta-section ${isLoaded ? 'loaded' : ''}`}>
          <div className="cta-box">
            <h2>Ready to Transform Your Loan Management?</h2>
            <p>Join thousands of satisfied customers who trust LoanFlow for their financial needs</p>
            <button>Start Your Journey</button>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2025 Agetware. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
