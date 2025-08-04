import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface YesPriceChartProps {
  date: string;
  agentName: string;
}

const YesPriceChart = ({ date, agentName }: YesPriceChartProps) => {
  // Mock data for Yes token price on a specific date
  const generateYesPriceData = (date: string) => {
    const basePrice = 0.65; // Starting price for "Yes" tokens
    const dataPoints = [];
    
    // Generate 24 hours of data for the specific date
    for (let hour = 0; hour < 24; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      
      // Create some realistic price movement
      const variation = (Math.sin(hour * 0.3) + Math.random() * 0.4 - 0.2) * 0.1;
      const price = Math.max(0.1, Math.min(0.95, basePrice + variation));
      
      dataPoints.push({
        time,
        price: Number(price.toFixed(3)),
        volume: Math.floor(Math.random() * 10000) + 5000
      });
    }
    
    return dataPoints;
  };

  const priceData = generateYesPriceData(date);
  const currentPrice = priceData[priceData.length - 1]?.price || 0.65;
  const startPrice = priceData[0]?.price || 0.65;
  const priceChange = currentPrice - startPrice;
  const priceChangePercent = ((priceChange / startPrice) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Yes Token Price - {agentName}</span>
          <div className="text-right">
            <div className="text-lg font-bold">${currentPrice.toFixed(3)}</div>
            <div className={`text-sm ${priceChange >= 0 ? 'text-success' : 'text-destructive'}`}>
              {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(3)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(1)}%)
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="time" 
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['dataMin - 0.02', 'dataMax + 0.02']}
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(3)}`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium mb-2">{date} {label}</p>
                        <p className="text-sm" style={{ color: payload[0].color }}>
                          Yes Price: ${(payload[0].value as number)?.toFixed(3)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          <div>
            <span className="text-muted-foreground">Opening:</span>
            <span className="ml-2 font-mono">${startPrice.toFixed(3)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">High:</span>
            <span className="ml-2 font-mono text-success">
              ${Math.max(...priceData.map(d => d.price)).toFixed(3)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Low:</span>
            <span className="ml-2 font-mono text-destructive">
              ${Math.min(...priceData.map(d => d.price)).toFixed(3)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YesPriceChart;