
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bitcoin, DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  coin: 'bitcoin' | 'usdt';
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

const TransactionHistory = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      coin: 'bitcoin',
      amount: '0.025 BTC',
      status: 'completed',
      date: '2024-01-15 14:30'
    },
    {
      id: '2',
      type: 'withdrawal',
      coin: 'usdt',
      amount: '1,500 USDT',
      status: 'completed',
      date: '2024-01-14 09:15'
    },
    {
      id: '3',
      type: 'deposit',
      coin: 'usdt',
      amount: '2,000 USDT',
      status: 'pending',
      date: '2024-01-13 16:45'
    },
    {
      id: '4',
      type: 'withdrawal',
      coin: 'bitcoin',
      amount: '0.01 BTC',
      status: 'completed',
      date: '2024-01-12 11:20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-accent/20 text-accent hover:bg-accent/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30';
      case 'failed':
        return 'bg-destructive/20 text-destructive hover:bg-destructive/30';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card className="crypto-card">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${transaction.type === 'deposit' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                  {transaction.type === 'deposit' ? (
                    <ArrowDownLeft className="h-4 w-4 text-accent" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {transaction.coin === 'bitcoin' ? (
                    <Bitcoin className="h-4 w-4 text-primary" />
                  ) : (
                    <DollarSign className="h-4 w-4 text-accent" />
                  )}
                  <div>
                    <div className="font-medium capitalize">
                      {transaction.type} {transaction.coin}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.date}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium">{transaction.amount}</div>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
