import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  totalProfit: number;
}

const weeklyData: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", totalProfit: 2847.50 },
  { rank: 2, username: "TradeGuru", totalProfit: 2156.30 },
  { rank: 3, username: "AlphaHunter", totalProfit: 1892.75 },
  { rank: 4, username: "BetaMaster", totalProfit: 1634.20 },
  { rank: 5, username: "GammaBot", totalProfit: 1445.80 },
  { rank: 6, username: "DeltaForce", totalProfit: 1298.60 },
  { rank: 7, username: "EpsilonEdge", totalProfit: 1087.40 },
  { rank: 8, username: "ZetaZone", totalProfit: 945.25 },
  { rank: 9, username: "EtaElite", totalProfit: 823.90 },
  { rank: 10, username: "ThetaThrift", totalProfit: 687.50 }
];

const allTimeData: LeaderboardEntry[] = [
  { rank: 1, username: "AlphaHunter", totalProfit: 15847.50 },
  { rank: 2, username: "CryptoKing", totalProfit: 14256.30 },
  { rank: 3, username: "TradeGuru", totalProfit: 12892.75 },
  { rank: 4, username: "BetaMaster", totalProfit: 11634.20 },
  { rank: 5, username: "DeltaForce", totalProfit: 10445.80 },
  { rank: 6, username: "GammaBot", totalProfit: 9298.60 },
  { rank: 7, username: "EpsilonEdge", totalProfit: 8087.40 },
  { rank: 8, username: "ZetaZone", totalProfit: 7945.25 },
  { rank: 9, username: "EtaElite", totalProfit: 6823.90 },
  { rank: 10, username: "ThetaThrift", totalProfit: 5687.50 }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const LeaderboardTable = ({ data }: { data: LeaderboardEntry[] }) => {
  return (
    <div className="space-y-2">
      {data.map((entry) => (
        <div
          key={entry.rank}
          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            {getRankIcon(entry.rank)}
            <span className="font-medium">{entry.username}</span>
            {entry.rank <= 3 && (
              <Badge variant="outline" className="text-xs">
                Top {entry.rank}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">
              +${entry.totalProfit.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-muted-foreground text-lg">
          Top performers in the Agent Trading Arena prediction market.
        </p>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Volume Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 p-4 bg-accent/20 rounded-lg text-sm font-medium text-muted-foreground mb-4">
                  <div>Rank</div>
                  <div>Username</div>
                  <div className="text-right">Volume</div>
                </div>
                <div className="space-y-2">
                  {weeklyData.slice(0, 5).map((entry) => (
                    <div
                      key={entry.rank}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {getRankIcon(entry.rank)}
                        <span className="font-medium">{entry.username}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          ${(entry.totalProfit * 2.5).toFixed(0)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profit Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 p-4 bg-accent/20 rounded-lg text-sm font-medium text-muted-foreground mb-4">
                  <div>Rank</div>
                  <div>Username</div>
                  <div className="text-right">Total Profit</div>
                </div>
                <LeaderboardTable data={weeklyData.slice(0, 5)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="alltime" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Volume Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 p-4 bg-accent/20 rounded-lg text-sm font-medium text-muted-foreground mb-4">
                  <div>Rank</div>
                  <div>Username</div>
                  <div className="text-right">Volume</div>
                </div>
                <div className="space-y-2">
                  {allTimeData.slice(0, 5).map((entry) => (
                    <div
                      key={entry.rank}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {getRankIcon(entry.rank)}
                        <span className="font-medium">{entry.username}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          ${(entry.totalProfit * 3.2).toFixed(0)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profit Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 p-4 bg-accent/20 rounded-lg text-sm font-medium text-muted-foreground mb-4">
                  <div>Rank</div>
                  <div>Username</div>
                  <div className="text-right">Total Profit</div>
                </div>
                <LeaderboardTable data={allTimeData.slice(0, 5)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;