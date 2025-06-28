
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bitcoin, DollarSign, TrendingUp, Shield, Zap, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Main Hero Content */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="crypto-gradient bg-clip-text text-transparent">
              Invest in Crypto
            </span>
            <br />
            <span className="text-foreground">The Smart Way</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join thousands of investors building wealth with Bitcoin and USDT. 
            Secure deposits, instant withdrawals, and professional-grade trading tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="crypto-gradient text-lg px-8 py-6 glow-effect">
                Start Investing Today
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="crypto-card p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary mb-2">$2.5B+</div>
            <div className="text-muted-foreground">Total Volume</div>
          </div>
          <div className="crypto-card p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">150K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="crypto-card p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="crypto-card p-6 rounded-lg text-center group hover:glow-effect transition-all duration-300">
            <Bitcoin className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Bitcoin & USDT</h3>
            <p className="text-muted-foreground">Trade the world's most popular cryptocurrencies with low fees</p>
          </div>
          
          <div className="crypto-card p-6 rounded-lg text-center group hover:glow-effect transition-all duration-300">
            <Shield className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
            <p className="text-muted-foreground">Your funds are protected with military-grade encryption</p>
          </div>
          
          <div className="crypto-card p-6 rounded-lg text-center group hover:glow-effect transition-all duration-300">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Instant Transactions</h3>
            <p className="text-muted-foreground">Lightning-fast deposits and withdrawals 24/7</p>
          </div>
          
          <div className="crypto-card p-6 rounded-lg text-center group hover:glow-effect transition-all duration-300">
            <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Smart Investment</h3>
            <p className="text-muted-foreground">AI-powered insights and market analysis</p>
          </div>
          
          <div className="crypto-card p-6 rounded-lg text-center group hover:glow-effect transition-all duration-300">
            <DollarSign className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Low Fees</h3>
            <p className="text-muted-foreground">Competitive rates with transparent pricing</p>
          </div>
          
          <div className="crypto-card p-6 rounded-lg text-center group hover:glow-effect transition-all duration-300">
            <Users className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-muted-foreground">Expert customer service whenever you need it</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
