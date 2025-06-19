import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DataStorageInfo() {
  const [, setLocation] = useLocation();

  const storageLocations = [
    {
      category: "Browser Storage",
      items: [
        {
          name: "Trial Status",
          location: "localStorage",
          key: "trialMode",
          data: "Boolean - whether user is in trial mode",
          persistence: "Until browser data cleared"
        },
        {
          name: "Trial Usage",
          location: "localStorage", 
          key: "hasUsedTrial",
          data: "Boolean - whether free trial was used",
          persistence: "Until browser data cleared"
        },
        {
          name: "Selected Protocol",
          location: "sessionStorage",
          key: "selectedProtocol", 
          data: "JSON - current breathing protocol data",
          persistence: "Until browser tab closed"
        }
      ]
    },
    {
      category: "Server Session",
      items: [
        {
          name: "Subscription Status",
          location: "Express Session (MemoryStore)",
          key: "hasSubscription",
          data: "Boolean - active subscription status", 
          persistence: "24 hours or server restart"
        },
        {
          name: "Subscription End Date",
          location: "Express Session (MemoryStore)",
          key: "subscriptionEndDate",
          data: "Date - when subscription expires",
          persistence: "24 hours or server restart"
        }
      ]
    },
    {
      category: "Database Schema (Ready but Unused)",
      items: [
        {
          name: "User Table",
          location: "PostgreSQL Schema",
          key: "users",
          data: "id, username, password, email, subscription data",
          persistence: "Permanent (when connected to DB)"
        },
        {
          name: "Sessions Table", 
          location: "PostgreSQL Schema",
          key: "breathing_sessions",
          data: "userId, protocol, duration, completion status",
          persistence: "Permanent (when connected to DB)"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Data Storage Architecture
          </h1>
          <p className="text-gray-300">
            Where user and subscription information is stored
          </p>
        </motion.div>

        <div className="space-y-6">
          {storageLocations.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
            >
              <Card className="glass-card border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center justify-between">
                    {category.category}
                    <Badge 
                      variant="outline" 
                      className={`${
                        category.category === "Server Session" 
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : category.category === "Browser Storage"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                          : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                      }`}
                    >
                      {category.category === "Database Schema (Ready but Unused)" ? "Schema Only" : "Active"}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {category.category === "Browser Storage" && "Client-side storage in user's browser"}
                    {category.category === "Server Session" && "Server-side temporary storage"}
                    {category.category === "Database Schema (Ready but Unused)" && "Prepared database structure for production"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={item.name}
                      className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-cyan-300">{item.name}</h4>
                        <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {item.location}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Key/Field: </span>
                          <code className="text-pink-300 bg-gray-900/50 px-1 rounded">{item.key}</code>
                        </div>
                        <div>
                          <span className="text-gray-400">Data: </span>
                          <span className="text-gray-300">{item.data}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Persistence: </span>
                          <span className="text-yellow-300">{item.persistence}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-blue-300 font-semibold mb-3">Current Implementation Notes:</h3>
          <ul className="text-sm text-blue-200 space-y-2">
            <li>• <strong>Demo Mode:</strong> Uses browser localStorage + server sessions for simplicity</li>
            <li>• <strong>No Authentication:</strong> Sessions are anonymous, identified by browser session</li>
            <li>• <strong>Temporary Storage:</strong> Data resets on server restart (development mode)</li>
            <li>• <strong>Production Ready:</strong> Database schema prepared for user accounts + persistent storage</li>
            <li>• <strong>Razorpay Integration:</strong> Payment data flows through session validation</li>
          </ul>
        </motion.div>

        <motion.div
          className="mt-6 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            onClick={() => setLocation('/subscription')}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl"
          >
            Test Subscription Storage
          </Button>

          <Button
            onClick={() => setLocation('/')}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}