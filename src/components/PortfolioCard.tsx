
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: 'bitcoin' | 'dollar';
}

const PortfolioCard = ({ title, value, change, isPositive, icon }: PortfolioCardProps) => {
  const IconComponent = icon === 'bitcoin' ? Bitcoin : DollarSign;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <Card className="crypto-card hover:glow-effect transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <IconComponent className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${isPositive ? 'text-accent' : 'text-destructive'}`}>
          <TrendIcon className="h-3 w-3 mr-1" />
          {change}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
