import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Globe, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen theme-bg theme-transition py-8 px-4">
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
            className="mb-4 theme-transition border-border text-foreground hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">How we protect and handle your data</p>
            <p className="text-muted-foreground text-sm mt-2">Last updated: December 2024</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-primary" />
                  Our Commitment to Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you use our 
                  breathing application.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Database className="w-6 h-6 mr-3 text-primary" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-card-foreground font-semibold mb-2">Personal Information</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Name and email address (for account creation)</li>
                    <li>• Gender and date of birth (optional, for personalization)</li>
                    <li>• Profile picture (optional)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-card-foreground font-semibold mb-2">Usage Data</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Breathing session records and analytics</li>
                    <li>• App usage patterns and preferences</li>
                    <li>• Device information and technical logs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How We Use Your Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <UserCheck className="w-6 h-6 mr-3 text-primary" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• <strong className="text-card-foreground">Service Delivery:</strong> To provide personalized breathing sessions and track your progress</li>
                  <li>• <strong className="text-card-foreground">Account Management:</strong> To create and maintain your user account</li>
                  <li>• <strong className="text-card-foreground">Analytics:</strong> To provide you with session insights and wellness tracking</li>
                  <li>• <strong className="text-card-foreground">Support:</strong> To respond to your feedback and provide customer support</li>
                  <li>• <strong className="text-card-foreground">Improvement:</strong> To enhance our app features and user experience</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-primary" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• <strong className="text-card-foreground">Encryption:</strong> All data is encrypted in transit and at rest</li>
                    <li>• <strong className="text-card-foreground">Secure Authentication:</strong> Password hashing with bcrypt encryption</li>
                    <li>• <strong className="text-card-foreground">Access Control:</strong> Strict access controls and authentication requirements</li>
                    <li>• <strong className="text-card-foreground">Regular Updates:</strong> Continuous security monitoring and updates</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-primary" />
                  Data Sharing and Third Parties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-card-foreground">We do not sell, trade, or share your personal information with third parties</strong> except in the following limited circumstances:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• With your explicit consent</li>
                    <li>• To comply with legal obligations</li>
                    <li>• To protect our rights and prevent fraud</li>
                    <li>• In case of business merger or acquisition (with advance notice)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-primary" />
                  Your Rights and Choices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">You have the following rights regarding your personal data:</p>
                <ul className="text-muted-foreground space-y-2">
                  <li>• <strong className="text-card-foreground">Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong className="text-card-foreground">Correction:</strong> Update or correct your information</li>
                  <li>• <strong className="text-card-foreground">Deletion:</strong> Request deletion of your account and data</li>
                  <li>• <strong className="text-card-foreground">Portability:</strong> Export your data in a readable format</li>
                  <li>• <strong className="text-card-foreground">Withdrawal:</strong> Withdraw consent for data processing</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-4">
                  To exercise these rights, contact us through the settings page or email support.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground">Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We retain your personal information only as long as necessary to provide our services 
                  and comply with legal obligations. When you delete your account, we permanently remove 
                  your personal data within 30 days, except where retention is required by law.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Children's Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our service is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you believe we have collected 
                  information from a child under 13, please contact us immediately.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Updates to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground">Updates to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new Privacy Policy in the app and updating the 
                  "Last updated" date. Your continued use of the app after such changes constitutes 
                  acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="theme-card theme-transition">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-primary" />
                  Contact Us
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Questions about this Privacy Policy or your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full justify-start theme-transition border-border text-foreground hover:bg-accent"
                  onClick={() => window.open('mailto:contact@geeksgrow.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email: contact@geeksgrow.com
                </Button>
                
                <div className="text-center pt-4">
                  <p className="text-muted-foreground text-sm">
                    We're committed to protecting your privacy and will respond to inquiries within 72 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}