
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bitcoin, DollarSign, Wallet, ArrowUpRight, ArrowDownLeft, Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PortfolioCard from '@/components/PortfolioCard';
import TransactionHistory from '@/components/TransactionHistory';

const Dashboard = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [isProcessing, setIsProcessing] = useState(false);

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
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Deposit Initiated",
        description: `Deposit of ${depositAmount} ${selectedCoin.toUpperCase()} has been initiated`,
      });
      setDepositAmount('');
    }, 2000);
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

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Withdrawal Initiated",
        description: `Withdrawal of ${withdrawAmount} ${selectedCoin.toUpperCase()} has been initiated`,
      });
      setWithdrawAmount('');
    }, 2000);
  };

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
            title="Total Balance"
            value="$45,231.89"
            change="+12.5%"
            isPositive={true}
            icon="dollar"
          />
          <PortfolioCard
            title="Bitcoin Holdings"
            value="1.25 BTC"
            change="+8.2%"
            isPositive={true}
            icon="bitcoin"
          />
          <PortfolioCard
            title="USDT Holdings"
            value="12,450 USDT"
            change="-2.1%"
            isPositive={false}
            icon="dollar"
          />
          <PortfolioCard
            title="Today's P&L"
            value="+$1,234.56"
            change="+15.3%"
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
                          <SelectItem value="bitcoin">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="h-4 w-4" />
                              <span>Bitcoin (BTC)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="usdt">
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
                        placeholder={`Enter ${selectedCoin === 'bitcoin' ? 'BTC' : 'USDT'} amount`}
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
                          Deposit {selectedCoin === 'bitcoin' ? 'BTC' : 'USDT'}
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
                          <SelectItem value="bitcoin">
                            <div className="flex items-center space-x-2">
                              <Bitcoin className="h-4 w-4" />
                              <span>Bitcoin (BTC)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="usdt">
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
                        placeholder={`Enter ${selectedCoin === 'bitcoin' ? 'BTC' : 'USDT'} amount`}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <Button
                      onClick={handleWithdraw}
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isProcessing ? 'Processing...' : (
                        <>
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          Withdraw {selectedCoin === 'bitcoin' ? 'BTC' : 'USDT'}
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
