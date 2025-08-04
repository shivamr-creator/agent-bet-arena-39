import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Position {
  id: string;
  market: string;
  type: "Yes" | "No";
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  status: "Active" | "Resolved";
}

interface HistoryEntry {
  id: string;
  market: string;
  action: "Buy" | "Sell";
  type: "Yes" | "No";
  shares: number;
  price: number;
  value: number;
  timestamp: string;
}

const positions: Position[] = [
  {
    id: "1",
    market: "Will Agent A have the highest P&L at the end of the session?",
    type: "Yes",
    shares: 150,
    avgPrice: 0.65,
    currentPrice: 0.72,
    value: 108,
    pnl: 10.50,
    status: "Active"
  },
  {
    id: "2",
    market: "Will Agent B have the highest P&L at the end of the session?",
    type: "No",
    shares: 200,
    avgPrice: 0.45,
    currentPrice: 0.38,
    value: 76,
    pnl: -14.00,
    status: "Active"
  },
  {
    id: "3",
    market: "Will Agent C have the highest P&L at the end of the session?",
    type: "Yes",
    shares: 100,
    avgPrice: 0.55,
    currentPrice: 0.85,
    value: 85,
    pnl: 30.00,
    status: "Resolved"
  }
];

const history: HistoryEntry[] = [
  {
    id: "1",
    market: "Will Agent A have the highest P&L at the end of the session?",
    action: "Buy",
    type: "Yes",
    shares: 150,
    price: 0.65,
    value: 97.50,
    timestamp: "2024-01-30 14:30:25"
  },
  {
    id: "2",
    market: "Will Agent B have the highest P&L at the end of the session?",
    action: "Buy",
    type: "No",
    shares: 200,
    price: 0.45,
    value: 90.00,
    timestamp: "2024-01-30 13:15:10"
  },
  {
    id: "3",
    market: "Will Agent C have the highest P&L at the end of the session?",
    action: "Sell",
    type: "Yes",
    shares: 50,
    price: 0.80,
    value: 40.00,
    timestamp: "2024-01-30 12:05:45"
  },
  {
    id: "4",
    market: "Will Agent C have the highest P&L at the end of the session?",
    action: "Buy",
    type: "Yes",
    shares: 150,
    price: 0.55,
    value: 82.50,
    timestamp: "2024-01-30 11:20:30"
  }
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("positions");

  const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0);
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const volumeTraded = history.reduce((sum, entry) => sum + entry.value, 0);
  const marketsTraded = new Set(history.map(entry => entry.market)).size;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-muted-foreground text-lg">
          Track your positions and trading history in the prediction market.
        </p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Portfolio Value</span>
            </div>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              {totalPnL >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <span className="text-sm text-muted-foreground">Profit/Loss</span>
            </div>
            <div className={cn("text-2xl font-bold", totalPnL >= 0 ? "text-green-600" : "text-red-600")}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Volume Traded</span>
            </div>
            <div className="text-2xl font-bold">${volumeTraded.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Markets Traded</span>
            </div>
            <div className="text-2xl font-bold">{marketsTraded}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Trading Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="positions" className="space-y-4">
              <div className="grid grid-cols-6 gap-4 p-4 bg-accent/20 rounded-lg text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Market</div>
                <div>Type</div>
                <div>Shares</div>
                <div>Value</div>
                <div>P&L</div>
              </div>
              
              {positions.map((position) => (
                <div key={position.id} className="grid grid-cols-6 gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="col-span-2">
                    <div className="font-medium text-sm">{position.market}</div>
                    <Badge 
                      variant="outline" 
                      className={cn("mt-1 text-xs", position.status === "Resolved" ? "bg-green-100 text-green-800" : "")}
                    >
                      {position.status}
                    </Badge>
                  </div>
                  <div>
                    <span className={cn("font-medium", position.type === "Yes" ? "text-green-600" : "text-red-600")}>
                      {position.type}
                    </span>
                  </div>
                  <div className="text-sm">
                    <div>{position.shares}</div>
                    <div className="text-xs text-muted-foreground">@${position.avgPrice}</div>
                  </div>
                  <div className="text-sm font-medium">${position.value.toFixed(2)}</div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-medium", position.pnl >= 0 ? "text-green-600" : "text-red-600")}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </span>
                    {position.status === "Active" ? (
                      <Button size="sm" variant="outline" className="text-white">
                        Sell
                      </Button>
                    ) : (
                      position.pnl > 0 && (
                        <Button size="sm" variant="default" className="text-white">
                          Claim
                        </Button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="grid grid-cols-6 gap-4 p-4 bg-accent/20 rounded-lg text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Market</div>
                <div>Action</div>
                <div>Shares</div>
                <div>Value</div>
                <div>Time</div>
              </div>
              
              {history.map((entry) => (
                <div key={entry.id} className="grid grid-cols-6 gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="col-span-2">
                    <div className="font-medium text-sm">{entry.market}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      {entry.action}
                    </span>
                    <span className={cn("font-medium text-xs", entry.type === "Yes" ? "text-green-600" : "text-red-600")}>
                      {entry.type}
                    </span>
                  </div>
                  <div className="text-sm">
                    <div>{entry.shares}</div>
                    <div className="text-xs text-muted-foreground">@${entry.price}</div>
                  </div>
                  <div className="text-sm font-medium">${entry.value.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;