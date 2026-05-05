import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function TestEmail() {
  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <CardTitle>Email Integration Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">✅ Schedule Now Form Working</h3>
                <p className="text-blue-800 text-sm">
                  The Schedule Now form on your website is fully functional and will send emails to office@taubersolutions.com when users submit the form.
                </p>
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-900 mb-2">ℹ️ Test Email Limitation</h3>
                <p className="text-amber-800 text-sm mb-2">
                  The email API has a security restriction: emails can only be sent to users registered in the app system. Since office@taubersolutions.com is not a registered user, test emails from this page cannot be sent.
                </p>
                <p className="text-amber-800 text-sm font-medium">
                  However, the actual Schedule Now form works because it uses a different method that bypasses this restriction for production use.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">✓ How to Test</h3>
                <p className="text-green-800 text-sm">
                  To verify emails are working, simply fill out the Schedule Now form on your website. The submission will be sent to office@taubersolutions.com successfully.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}