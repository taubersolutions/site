import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    footer_phone_us: '',
    footer_phone_uk: '',
    footer_address_us: '',
    footer_address_uk: '',
    footer_email: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await base44.auth.me();
      if (currentUser.role !== 'admin') {
        base44.auth.redirectToLogin(window.location.pathname);
        return;
      }
      setUser(currentUser);
    } catch (error) {
      base44.auth.redirectToLogin(window.location.pathname);
    } finally {
      setLoading(false);
    }
  };

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const list = await base44.entities.SiteSettings.list();
      return list.find(s => s.setting_key === 'footer') || null;
    },
    enabled: !loading,
    onSuccess: (data) => {
      if (data) {
        setFormData({
          footer_phone_us: data.footer_phone_us || '',
          footer_phone_uk: data.footer_phone_uk || '',
          footer_address_us: data.footer_address_us || '',
          footer_address_uk: data.footer_address_uk || '',
          footer_email: data.footer_email || ''
        });
      }
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (settings?.id) {
        return base44.entities.SiteSettings.update(settings.id, data);
      } else {
        return base44.entities.SiteSettings.create({ ...data, setting_key: 'footer' });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      alert('Settings saved successfully!');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C2983B]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="mb-8">
          <Link to={createPageUrl('AdminDashboard')}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-light text-[#1a2b4b]">
            Site <span className="font-normal text-[#C2983B]">Settings</span>
          </h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#1a2b4b]">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>US Phone Number</Label>
                    <Input
                      value={formData.footer_phone_us}
                      onChange={(e) => setFormData({ ...formData, footer_phone_us: e.target.value })}
                      placeholder="+1 (845) 322-6500"
                    />
                  </div>
                  <div>
                    <Label>UK Phone Number</Label>
                    <Input
                      value={formData.footer_phone_uk}
                      onChange={(e) => setFormData({ ...formData, footer_phone_uk: e.target.value })}
                      placeholder="+44 (739) 278-8116"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={formData.footer_email}
                      onChange={(e) => setFormData({ ...formData, footer_email: e.target.value })}
                      placeholder="office@taubersolutions.com"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-[#1a2b4b]">Addresses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>US Address</Label>
                    <Textarea
                      value={formData.footer_address_us}
                      onChange={(e) => setFormData({ ...formData, footer_address_us: e.target.value })}
                      rows={3}
                      placeholder="67 North Airmont Rd&#10;Suffern, NY 10901"
                    />
                  </div>
                  <div>
                    <Label>UK Address</Label>
                    <Textarea
                      value={formData.footer_address_uk}
                      onChange={(e) => setFormData({ ...formData, footer_address_uk: e.target.value })}
                      rows={3}
                      placeholder="71 Wellington Street West&#10;Salford M7 2ED"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="bg-[#C2983B] hover:bg-[#b08e35]" disabled={saveMutation.isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {saveMutation.isLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}