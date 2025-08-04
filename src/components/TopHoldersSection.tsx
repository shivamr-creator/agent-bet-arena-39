import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Holder {
  id: string;
  username: string;
  shares: number;
  type: "Yes" | "No";
}

const mockHolders = {
  "QuantumTrader AI": {
    yes: [
      { id: "1", username: "Bombarda", shares: 22860 },
      { id: "2", username: "Randomfool", shares: 21739 },
      { id: "3", username: "Vasek", shares: 17532 },
      { id: "4", username: "Leprechaun", shares: 16006 },
      { id: "5", username: "jimmyhasballs", shares: 15655 }
    ],
    no: [
      { id: "6", username: "kalcik", shares: 66886 },
      { id: "7", username: "WildRumpus2", shares: 6097 },
      { id: "8", username: "rdunjgiofnuei", shares: 5512 },
      { id: "9", username: "houskeskytarou", shares: 3250 },
      { id: "10", username: "biznisbiznis", shares: 2405 }
    ]
  },
  "ArbitrageHunter Pro": {
    yes: [
      { id: "11", username: "TradeMaster", shares: 18500 },
      { id: "12", username: "CryptoKing", shares: 15200 },
      { id: "13", username: "AlphaTrader", shares: 12800 },
      { id: "14", username: "BetaBot", shares: 11400 },
      { id: "15", username: "GammaGains", shares: 9600 }
    ],
    no: [
      { id: "16", username: "BearMarket", shares: 45200 },
      { id: "17", username: "ShortSeller", shares: 8900 },
      { id: "18", username: "PutBuyer", shares: 7200 },
      { id: "19", username: "Pessimist", shares: 5800 },
      { id: "20", username: "DownTrend", shares: 4100 }
    ]
  },
  "TrendFollower Alpha": {
    yes: [
      { id: "21", username: "MomentumMax", shares: 16800 },
      { id: "22", username: "TrendRider", shares: 14500 },
      { id: "23", username: "FollowFlow", shares: 12200 },
      { id: "24", username: "WaveWatcher", shares: 10800 },
      { id: "25", username: "SignalSeeker", shares: 9400 }
    ],
    no: [
      { id: "26", username: "CounterTrend", shares: 38900 },
      { id: "27", username: "Reversal", shares: 7800 },
      { id: "28", username: "Contrarian", shares: 6500 },
      { id: "29", username: "AntiMomentum", shares: 5200 },
      { id: "30", username: "FadeTrader", shares: 3800 }
    ]
  },
  "RiskParity Bot": {
    yes: [
      { id: "31", username: "BalanceSeeker", shares: 14200 },
      { id: "32", username: "RiskAdjusted", shares: 12600 },
      { id: "33", username: "VolTrader", shares: 11100 },
      { id: "34", username: "ParityPlayer", shares: 9800 },
      { id: "35", username: "EqualWeight", shares: 8500 }
    ],
    no: [
      { id: "36", username: "HighRisk", shares: 32400 },
      { id: "37", username: "Volatile", shares: 6800 },
      { id: "38", username: "Unbalanced", shares: 5600 },
      { id: "39", username: "SkewedBets", shares: 4400 },
      { id: "40", username: "AsymmetricRisk", shares: 3200 }
    ]
  },
  "DeepLearning Trader": {
    yes: [
      { id: "41", username: "AIEnthusiast", shares: 13500 },
      { id: "42", username: "NeuralNet", shares: 11800 },
      { id: "43", username: "MLMaster", shares: 10200 },
      { id: "44", username: "DeepThought", shares: 9100 },
      { id: "45", username: "AlgoTrader", shares: 7900 }
    ],
    no: [
      { id: "46", username: "AntiAI", shares: 28700 },
      { id: "47", username: "HumanTouch", shares: 6200 },
      { id: "48", username: "ManualTrader", shares: 5100 },
      { id: "49", username: "OldSchool", shares: 4000 },
      { id: "50", username: "NoBot", shares: 2900 }
    ]
  }
};

const agents = [
  "QuantumTrader AI",
  "ArbitrageHunter Pro",
  "TrendFollower Alpha", 
  "RiskParity Bot",
  "DeepLearning Trader"
];

const TopHoldersSection = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("QuantumTrader AI");

  const getAvatarColor = (username: string) => {
    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];
    return colors[username.length % colors.length];
  };

  const yesHolders = mockHolders[selectedAgent as keyof typeof mockHolders]?.yes || [];
  const noHolders = mockHolders[selectedAgent as keyof typeof mockHolders]?.no || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {agents.map((agent) => (
              <SelectItem key={agent} value={agent}>
                {agent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Yes holders</h3>
            <span className="text-xs text-muted-foreground uppercase">SHARES</span>
          </div>
          <div className="space-y-3">
            {yesHolders.map((holder) => (
              <div key={holder.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={getAvatarColor(holder.username)}>
                      {holder.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{holder.username}</span>
                </div>
                <span className="text-sm text-green-600 font-mono">
                  {holder.shares.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">No holders</h3>
            <span className="text-xs text-muted-foreground uppercase">SHARES</span>
          </div>
          <div className="space-y-3">
            {noHolders.map((holder) => (
              <div key={holder.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={getAvatarColor(holder.username)}>
                      {holder.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{holder.username}</span>
                </div>
                <span className="text-sm text-red-600 font-mono">
                  {holder.shares.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHoldersSection;