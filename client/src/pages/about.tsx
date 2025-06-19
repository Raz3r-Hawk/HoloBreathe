import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Users, Target, Globe, Award, Code } from 'lucide-react';

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => setLocation('/settings')}
            className="mb-4 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">About Us</h1>
            <p className="text-gray-300 text-lg">Transforming lives through mindful breathing</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-6 h-6 mr-3 text-cyan-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We believe in the transformative power of conscious breathing. Our mission is to make 
                  ancient breathing techniques accessible to everyone, helping people reduce stress, 
                  improve focus, and enhance their overall well-being through scientifically-backed 
                  breathing protocols.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-6 h-6 mr-3 text-cyan-400" />
                  Leadership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    VM
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Mr. Varun Mukesh Bhambhani
                    </h3>
                    <p className="text-gray-300 mb-3">
                      Founder & Visionary behind this transformative breathing application. 
                      With a passion for wellness technology and mindfulness practices, 
                      Varun has dedicated his expertise to creating tools that make a 
                      meaningful impact on people's daily lives.
                    </p>
                    <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-300">
                      Wellness Technology Pioneer
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-6 h-6 mr-3 text-cyan-400" />
                  Development Partner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    GG
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      GeeksGrow
                    </h3>
                    <p className="text-gray-300 mb-3">
                      Our trusted development partner, GeeksGrow specializes in creating 
                      cutting-edge mobile and web applications. Their expertise in modern 
                      technologies and user experience design has been instrumental in 
                      bringing this vision to life.
                    </p>
                    <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                      Technology Partner
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Made in India */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-orange-900/30 to-green-900/30 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-orange-400" />
                  Made in India
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-lg font-medium mb-2">
                      Proudly Made in India 🇮🇳
                    </p>
                    <p className="text-gray-300">
                      This application is developed with pride in India, combining ancient 
                      wisdom with modern technology to serve users worldwide.
                    </p>
                  </div>
                  <div className="text-6xl">
                    🇮🇳
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-cyan-400" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Wellness First</h4>
                    <p className="text-gray-400 text-sm">
                      Your mental and physical well-being is our top priority
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Quality</h4>
                    <p className="text-gray-400 text-sm">
                      We deliver premium experiences through attention to detail
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Community</h4>
                    <p className="text-gray-400 text-sm">
                      Building a supportive community around mindful living
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Get in Touch</CardTitle>
                <CardDescription className="text-gray-400">
                  We'd love to hear from you and support your wellness journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => window.open('mailto:support@breathingapp.com', '_blank')}
                  >
                    Email: support@breathingapp.com
                  </Button>
                  
                  <div className="text-center pt-4">
                    <p className="text-gray-400 text-sm">
                      Thank you for choosing our breathing app for your wellness journey
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}