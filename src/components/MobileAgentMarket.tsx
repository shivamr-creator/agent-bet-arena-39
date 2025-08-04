import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Bot, Activity, Timer, BarChart3, ChevronUp, ChevronDown, TrendingUp, Users, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import YesPriceChart from "./YesPriceChart";
import AgentPortfolioChart from "./AgentPortfolioChart";
import ActivitySection from "./ActivitySection";
import TopHoldersSection from "./TopHoldersSection";

interface Agent {
  id: string;
  name: string;
  pnl: number;
  pnlPercent: number;
  status: "Active" | "Liquidated" | "Stopped";
  portfolio: number;
  winRate: number;
  volume: number;
  strategy: string;
  positions: {
    BTC: { amount: number; pnl: number; leverage: number };
    SOL: { amount: number; pnl: number; leverage: number };
    ETH: { amount: number; pnl: number; leverage: number };
    XRP: { amount: number; pnl: number; leverage: number };
    BNB: { amount: number; pnl: number; leverage: number };
  };
}

interface MobileAgentMarketProps {
  agents: Agent[];
  onAgentClick?: (agentId: string) => void;
}

const MobileAgentMarket = ({ agents, onAgentClick }: MobileAgentMarketProps) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [activeTab, setActiveTab] = useState<"activity" | "top-holders">("activity");
  const [expandedAgentTab, setExpandedAgentTab] = useState("graph");

  const getYesPrice = (agent: Agent) => {
    const basePrice = 50 + (agent.pnlPercent * 10);
    return Math.max(10, Math.min(90, basePrice));
  };

  const getNoPrice = (agent: Agent) => {
    return 100 - getYesPrice(agent);
  };

  const getPnLColor = (pnl: number) => {
    return pnl >= 0 ? "text-success" : "text-destructive";
  };

  const getPercentChange = (pnl: number, portfolio: number) => {
    return ((pnl / portfolio) * 100).toFixed(2);
  };

  const generateChanceData = (agentId: string) => {
    const baseChance = Math.random() * 40 + 30;
    return [
      { time: "18:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "19:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "20:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "21:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "22:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "23:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "00:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "01:00", chance: baseChance + Math.random() * 10 - 5 }
    ];
  };

  const handleBuyClick = (agent: Agent, outcome: "yes" | "no") => {
    setSelectedAgent(agent);
    setSelectedOutcome(outcome);
    setAmount(0);
    setShowBuyModal(true);
  };

  const handleSellClick = (agent: Agent, outcome: "yes" | "no") => {
    setSelectedAgent(agent);
    setSelectedOutcome(outcome);
    setAmount(0);
    setShowSellModal(true);
  };

  const handleAgentNameClick = (agent: Agent) => {
    if (expandedAgent === agent.id) {
      setExpandedAgent(null);
    } else {
      setExpandedAgent(agent.id);
    }
  };

  const handleTrade = () => {
    // Handle trade logic here
    setShowBuyModal(false);
    setAmount(0);
  };

  const getPotentialWin = () => {
    if (!selectedAgent || amount === 0) return 0;
    const price = selectedOutcome === "yes" ? getYesPrice(selectedAgent) : getNoPrice(selectedAgent);
    return (amount / (price / 100)) - amount;
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6 px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
          Which Agent Will Have the Highest P&L by Aug 1st, 12PM GMT?
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">$6,737,298 Vol.</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            <span className="text-sm">Sep 30, 2025</span>
          </div>
        </div>
      </div>

      {/* Portfolio Chart Section */}
      <div className="mb-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Agent Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <AgentPortfolioChart />
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <div className="space-y-3 px-4">
        {agents.map((agent, index) => (
          <div key={agent.id}>
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                {/* Agent Header */}
                <div 
                  className="flex items-center justify-between mb-3 cursor-pointer"
                  onClick={() => handleAgentNameClick(agent)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">
                          {agent.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Activity className="w-3 h-3" />
                          <span>${(agent.volume / 1000).toFixed(1)}K USDC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="font-medium text-foreground text-sm">
                        ${agent.portfolio.toLocaleString()} 
                        <span className={cn("ml-1", getPnLColor(agent.pnl))}>
                          {agent.pnl >= 0 ? '+' : ''}{agent.pnlPercent.toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-xl font-bold">{agent.winRate}%</div>
                    </div>
                    {expandedAgent === agent.id ? 
                      <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    }
                  </div>
                </div>

                {/* Buy Buttons */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                    onClick={() => handleBuyClick(agent, "yes")}
                  >
                    Buy Yes {getYesPrice(agent).toFixed(0)}¢
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => handleBuyClick(agent, "no")}
                  >
                    Buy No {getNoPrice(agent).toFixed(0)}¢
                  </Button>
                </div>

                {/* Expanded Content */}
                {expandedAgent === agent.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Tabs value={expandedAgentTab} onValueChange={setExpandedAgentTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="graph">Graph</TabsTrigger>
                        <TabsTrigger value="position">Position</TabsTrigger>
                        <TabsTrigger value="strategy">Strategy</TabsTrigger>
                      </TabsList>
                      <TabsContent value="graph" className="space-y-4">
                        <YesPriceChart 
                          date={new Date().toLocaleDateString()} 
                          agentName={agent.name} 
                        />
                      </TabsContent>
                      <TabsContent value="position" className="space-y-4">
                        <div className="space-y-3">
                          <div className="text-sm font-medium">
                            Total P&L: <span className={cn(getPnLColor(agent.pnl))}>
                              {agent.pnl >= 0 ? '+' : ''}${agent.pnl.toFixed(2)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {Object.entries(agent.positions).map(([crypto, position]) => (
                              <div key={crypto} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                                <div>
                                  <span className="font-medium">{crypto}</span>
                                  <div className="text-xs text-muted-foreground">{position.leverage}x Leverage</div>
                                </div>
                                <div className="text-right text-sm">
                                  <div>${position.amount.toLocaleString()}</div>
                                  <div className={cn("text-xs", getPnLColor(position.pnl))}>
                                    {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="strategy" className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Portfolio Maximization Strategy</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {agent.strategy}
                          </p>
                          <div className="space-y-2 text-sm">
                            <div><strong>Risk Management:</strong> Dynamic position sizing based on volatility</div>
                            <div><strong>Entry Signals:</strong> Multi-timeframe momentum confirmation</div>
                            <div><strong>Exit Strategy:</strong> Trailing stops with profit-taking levels</div>
                            <div><strong>Portfolio Allocation:</strong> Diversified across BTC, ETH, SOL, XRP, and BNB</div>
                            <div><strong>Leverage Usage:</strong> Adaptive leverage based on market conditions</div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Market Resolution Criteria */}
      <div className="mx-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Market Resolution Criteria:</h4>
            <p className="text-sm text-muted-foreground">
              The market will resolve to "Yes" if the agent holds the highest PnL at 12:00 PM GMT on August 23, 2025.
              It will resolve to "No" if the agent is liquidated before this time or does not have the highest PnL at resolution.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Top Holders Section */}
      <div className="mx-4 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4 border-b border-border">
              <button
                onClick={() => setActiveTab("activity")}
                className={cn(
                  "pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                  activeTab === "activity" 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Activity className="w-4 h-4" />
                Activity
              </button>
              <button
                onClick={() => setActiveTab("top-holders")}
                className={cn(
                  "pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                  activeTab === "top-holders" 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Users className="w-4 h-4" />
                Top Holders
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {activeTab === "activity" ? <ActivitySection /> : <TopHoldersSection />}
          </CardContent>
        </Card>
      </div>

      {/* Buy Modal */}
      <Sheet open={showBuyModal} onOpenChange={setShowBuyModal}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-left">
              Which Agent Will Have the Highest P&L by Aug 1st, 12PM GMT?
            </SheetTitle>
            <div className="flex items-center gap-2 text-left">
              {selectedAgent && (
                <>
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="font-medium">{selectedAgent.name}</span>
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-medium",
                    selectedOutcome === "yes" 
                      ? "bg-success text-success-foreground" 
                      : "bg-destructive text-destructive-foreground"
                  )}>
                    {selectedOutcome === "yes" ? "Yes" : "No"} ↔
                  </span>
                </>
              )}
            </div>
          </SheetHeader>

          <div className="space-y-6">
            {/* Amount Input */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 mb-6">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setAmount(Math.max(0, amount - 1))}
                  className="w-12 h-12 rounded-full text-xl"
                  disabled={amount <= 0}
                >
                  −
                </Button>
                <div className="text-6xl font-bold min-w-[200px]">${amount}</div>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setAmount(amount + 1)}
                  className="w-12 h-12 rounded-full text-xl"
                >
                  +
                </Button>
              </div>

              {amount > 0 && selectedAgent && (
                <div className="mb-4">
                  <div className="text-success text-xl font-semibold flex items-center justify-center gap-2">
                    To win 💰 ${getPotentialWin().toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Avg. Price {selectedOutcome === "yes" ? getYesPrice(selectedAgent).toFixed(0) : getNoPrice(selectedAgent).toFixed(0)}¢
                  </div>
                </div>
              )}
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <Button
                variant="outline"
                onClick={() => setAmount(amount + 1)}
                className="h-11 text-sm font-medium"
              >
                +$1
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount(amount + 20)}
                className="h-11 text-sm font-medium"
              >
                +$20
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount(amount + 100)}
                className="h-11 text-sm font-medium"
              >
                +$100
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount(1000)}
                className="h-11 text-sm font-medium"
              >
                Max
              </Button>
            </div>

            {/* Trade Button */}
            <Button 
              className="w-full h-12 text-lg font-semibold"
              disabled={amount === 0}
              onClick={handleTrade}
            >
              Trade
            </Button>

            <div className="text-xs text-center text-muted-foreground">
              By trading, you agree to the Terms of Use.
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sell Modal */}
      <Sheet open={showSellModal} onOpenChange={setShowSellModal}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh]">
          <div className="space-y-6 pb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold">
                Sell {selectedOutcome === "yes" ? "Yes" : "No"} shares
              </h3>
              <p className="text-muted-foreground">
                {selectedAgent?.name}
              </p>
            </div>

            {/* Amount Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAmount(Math.max(0, amount - 1))}
                  className="w-10 h-10 rounded-full"
                >
                  -
                </Button>
                <div className="text-4xl font-bold">{amount} shares</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAmount(amount + 1)}
                  className="w-10 h-10 rounded-full"
                >
                  +
                </Button>
              </div>

              {amount > 0 && selectedAgent && (
                <div className="text-success font-medium text-center">
                  You'll receive 💰 ${(amount * (selectedOutcome === "yes" ? getYesPrice(selectedAgent) : getNoPrice(selectedAgent)) / 100).toFixed(2)}
                  <div className="text-xs text-muted-foreground">
                    Avg. Price {selectedOutcome === "yes" ? getYesPrice(selectedAgent).toFixed(0) : getNoPrice(selectedAgent).toFixed(0)}¢
                  </div>
                </div>
              )}
            </div>

            {/* Quick Share Buttons */}
            <div className="flex gap-2 justify-center">
              {[10, 50, 100].map((quickShares) => (
                <Button
                  key={quickShares}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amount + quickShares)}
                  className="px-4"
                >
                  +{quickShares}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAmount(500)}
                className="px-4"
              >
                Max
              </Button>
            </div>

            {/* Sell Button */}
            <Button 
              className="w-full h-12 text-lg font-semibold"
              variant="destructive"
              disabled={amount === 0}
              onClick={() => {
                console.log(`Selling ${amount} ${selectedOutcome} shares for ${selectedAgent?.name}`);
                setShowSellModal(false);
                setAmount(0);
              }}
            >
              Sell Shares
            </Button>

            <div className="text-xs text-center text-muted-foreground">
              By selling, you agree to the Terms of Use.
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileAgentMarket;