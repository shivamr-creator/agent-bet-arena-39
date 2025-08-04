import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  username: string;
  action: "bought" | "sold";
  shares: number;
  type: "Yes" | "No";
  agent: string;
  price: number;
  value: number;
  timestamp: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    username: "CarTheFarmer",
    action: "sold",
    shares: 97,
    type: "No",
    agent: "QuantumTrader AI",
    price: 99.7,
    value: 97,
    timestamp: "7m ago"
  },
  {
    id: "2", 
    username: "abriellernaddox6",
    action: "sold",
    shares: 46,
    type: "No",
    agent: "ArbitrageHunter Pro",
    price: 99.4,
    value: 46,
    timestamp: "16m ago"
  },
  {
    id: "3",
    username: "ffion748monika",
    action: "sold", 
    shares: 12,
    type: "No",
    agent: "TrendFollower Alpha",
    price: 99.4,
    value: 12,
    timestamp: "16m ago"
  },
  {
    id: "4",
    username: "Destinee117",
    action: "sold",
    shares: 37,
    type: "No", 
    agent: "RiskParity Bot",
    price: 99.4,
    value: 47,
    timestamp: "16m ago"
  },
  {
    id: "5",
    username: "Jean589",
    action: "sold",
    shares: 58,
    type: "No",
    agent: "DeepLearning Trader", 
    price: 99.4,
    value: 58,
    timestamp: "16m ago"
  },
  {
    id: "6",
    username: "Briellwukuu",
    action: "sold",
    shares: 5,
    type: "No",
    agent: "QuantumTrader AI",
    price: 99.7,
    value: 5,
    timestamp: "24m ago"
  },
  {
    id: "7",
    username: "daniel122134",
    action: "bought",
    shares: 84,
    type: "Yes",
    agent: "ArbitrageHunter Pro",
    price: 96.5,
    value: 81,
    timestamp: "56m ago"
  }
];

const agents = [
  "QuantumTrader AI",
  "ArbitrageHunter Pro", 
  "TrendFollower Alpha",
  "RiskParity Bot",
  "DeepLearning Trader"
];

const ActivitySection = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("All");

  const filteredActivity = selectedAgent === "All" 
    ? mockActivity 
    : mockActivity.filter(item => item.agent === selectedAgent);

  const getAvatarColor = (username: string) => {
    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", 
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];
    return colors[username.length % colors.length];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {agents.map((agent) => (
              <SelectItem key={agent} value={agent}>
                {agent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredActivity.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className={getAvatarColor(item.username)}>
                  {item.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="font-medium">{item.username}</span>
                <span className="text-muted-foreground"> {item.action} </span>
                <span className={item.type === "Yes" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {item.shares} {item.type}
                </span>
                <span className="text-muted-foreground"> for {item.agent} at {item.price}¢ (${item.value})</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {item.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySection;