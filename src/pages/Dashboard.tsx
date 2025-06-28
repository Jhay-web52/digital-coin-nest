
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bitcoin, DollarSign, Wallet, ArrowUpRight, ArrowDownLeft, Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import PortfolioCard from '@/components/PortfolioCard';
import TransactionHistory from '@/components/TransactionHistory';

interface UserBalance {
  currency: string;
  balance: number;
}

const Dashboard = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [isProcessing, setIsProcessing] = useState(false);
  const [balances, setBalances] = useState<UserBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBalances();
    }
  }, [user]);

  const fetchBalances = async () => {
    try {
      const { data, error } = await supabase
        .from('user_balances')
        .select('currency, balance')
        .eq('user_id', user?.id);

      if (error) throw error;
      setBalances(data || []);
    } catch (error) {
      console.error('Error fetching balances:', error);
      toast({
        title: "Error",
        description: "Failed to fetch balances",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getBTCBalance = () => {
    const btcBalance = balances.find(b => b.currency === 'BTC');
    return btcBalance ? btcBalance.balance : 0;
  };

  const getUSDTBalance = () => {
    const usdtBalance = balances.find(b => b.currency === 'USDT');
    return usdtBalance ? usdtBalance.balance : 0;
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Insert transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          type: 'deposit',
          currency: selectedCoin,
          amount: parseFloat(depositAmount),
          status: 'completed'
        });

      if (transactionError) throw transactionError;

      // Update user balance
      const { error: balanceError } = await supabase
        .from('user_balances')
        .upsert({
          user_id: user?.id,
          currency: selectedCoin,
          balance: selectedCoin === 'BTC' 
            ? getBTCBalance() + parseFloat(depositAmount)
            : getUSDTBalance() + parseFloat(depositAmount)
        });

      if (balanceError) throw balanceError;

      toast({
        title: "Deposit Successful",
        description: `Deposited ${depositAmount} ${selectedCoin} to your account`,
      });
      
      setDepositAmount('');
      fetchBalances(); // Refresh balances
    } catch (error) {
      console.error('Deposit error:', error);
      toast({
        title: "Deposit Failed",
        description: "There was an error processing your deposit",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    const currentBalance = selectedCoin === 'BTC' ? getBTCBalance() : getUSDTBalance();
    if (parseFloat(withdrawAmount) > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Insert transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          type: 'withdrawal',
          currency: selectedCoin,
          amount: parseFloat(withdrawAmount),
          status: 'completed'
        });

      if (transactionError) throw transactionError;

      // Update user balance
      const { error: balanceError } = await supabase
        .from('user_balances')
        .upsert({
          user_id: user?.id,
          currency: selectedCoin,
          balance: currentBalance - parseFloat(withdrawAmount)
        });

      if (balanceError) throw balanceError;

      toast({
        title: "Withdrawal Successful",
        description: `Withdrew ${withdrawAmount} ${selectedCoin} from your account`,
      });
      
      setWithdrawAmount('');
      fetchBalances(); // Refresh balances
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast({
        title: "Withdrawal Failed",
        description: "There was an error processing your withdrawal",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Investment Dashboard</h1>
          <p className="text-muted-foreground">Manage your crypto investments</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PortfolioCard
            title="BTC Balance"
            value={`${getBTCBalance().toFixed(8)} BTC`}
            change="+0.0%"
            isPositive={true}
            icon="bitcoin"
          />
          <PortfolioCard
            title="USDT Balance"
            value={`${getUSDTBalance().toFixed(2)} USDT`}
            change="+0.0%"
            isPositive={true}
            icon="dollar"
          />
          <PortfolioCard
            title="Total Value"
            value={`$${getUSDTBalance().toFixed(2)}`}
            change="+0.0%"
            isPositive={true}
            icon="dollar"
          />
          <PortfolioCard
            title="Today's P&L"
            value="$0.00"
            change="+0.0%"
            isPositive={true}
            icon="dollar"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deposit/Withdraw Section */}
          <div className="lg:col-span-1">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <span>Wallet Operations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="deposit" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="deposit" className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Deposit</span>
                    </TabsTrigger>
                    <TabsTrigger value="withdraw" className="flex items-center space-x-2">
                      <Minus className="h-4 w-4" />
                      <span>Withdraw</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="deposit" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-coin">Select Cryptocurrency</Label>
                      <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="h-4 w-4" />
                              <span>Bitcoin (BTC)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="USDT">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4" />
                              <span>Tether (USDT)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Amount</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        step="0.00000001"
                        placeholder={`Enter ${selectedCoin} amount`}
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <Button
                      onClick={handleDeposit}
                      disabled={isProcessing}
                      className="w-full crypto-gradient"
                    >
                      {isProcessing ? 'Processing...' : (
                        <>
                          <ArrowDownLeft className="h-4 w-4 mr-2" />
                          Deposit {selectedCoin}
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="withdraw" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-coin">Select Cryptocurrency</Label>
                      <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="h-4 w-4" />
                              <span>Bitcoin (BTC)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="USDT">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4" />
                              <span>Tether (USDT)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount">Amount</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        step="0.00000001"
                        placeholder={`Enter ${selectedCoin} amount`}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-background/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Available: {selectedCoin === 'BTC' 
                          ? `${getBTCBalance().toFixed(8)} BTC` 
                          : `${getUSDTBalance().toFixed(2)} USDT`}
                      </p>
                    </div>
                    <Button
                      onClick={handleWithdraw}
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isProcessing ? 'Processing...' : (
                        <>
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          Withdraw {selectedCoin}
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
