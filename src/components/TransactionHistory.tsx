import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  currency: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      // Properly cast the data to match our Transaction interface
      const typedTransactions: Transaction[] = (data || []).map(transaction => ({
        id: transaction.id,
        type: transaction.type as 'deposit' | 'withdrawal',
        currency: transaction.currency,
        amount: Number(transaction.amount),
        status: transaction.status as 'pending' | 'completed' | 'failed',
        created_at: transaction.created_at
      }));
      
      setTransactions(typedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="crypto-card">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted/20 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="crypto-card">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          Your recent deposits and withdrawals
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No transactions yet</p>
            <p className="text-sm">Your deposits and withdrawals will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'deposit' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {transaction.type === 'deposit' 
                      ? <ArrowDownLeft className="h-4 w-4" />
                      : <ArrowUpRight className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium capitalize">
                        {transaction.type} {transaction.currency}
                      </p>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(transaction.status)}
                      >
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(transaction.status)}
                          <span className="capitalize">{transaction.status}</span>
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {transaction.type === 'deposit' ? '+' : '-'}
                    {transaction.amount.toFixed(transaction.currency === 'BTC' ? 8 : 2)} {transaction.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
