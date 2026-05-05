import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminLegal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('privacy_policy');
  const [privacyContent, setPrivacyContent] = useState('');
  const [termsContent, setTermsContent] = useState('');

  const queryClient = useQueryClient();

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

  const { data: legalPages = [] } = useQuery({
    queryKey: ['legalPages'],
    queryFn: () => base44.entities.LegalPage.list(),
    enabled: !loading
  });

  useEffect(() => {
    const privacyPage = legalPages.find(p => p.page_type === 'privacy_policy');
    const termsPage = legalPages.find(p => p.page_type === 'terms_and_conditions');
    
    if (privacyPage) setPrivacyContent(privacyPage.content || '');
    if (termsPage) setTermsContent(termsPage.content || '');
  }, [legalPages]);

  const saveMutation = useMutation({
    mutationFn: async ({ pageType, content }) => {
      const existingPage = legalPages.find(p => p.page_type === pageType);
      const title = pageType === 'privacy_policy' ? 'Privacy Policy' : 'Terms and Conditions';
      
      if (existingPage) {
        return base44.entities.LegalPage.update(existingPage.id, {
          content,
          title,
          last_updated: new Date().toISOString().split('T')[0]
        });
      } else {
        return base44.entities.LegalPage.create({
          page_type: pageType,
          title,
          content,
          last_updated: new Date().toISOString().split('T')[0]
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legalPages'] });
      alert('Legal page saved successfully!');
    }
  });

  const handleSave = (pageType) => {
    const content = pageType === 'privacy_policy' ? privacyContent : termsContent;
    saveMutation.mutate({ pageType, content });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C2983B]" />
      </div>
    );
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <Link to={createPageUrl('AdminDashboard')}>
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-light text-[#1a2b4b] mb-2">
            Legal <span className="font-normal text-[#C2983B]">Pages</span>
          </h1>
          <p className="text-gray-600">Manage your privacy policy and terms & conditions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setActiveTab('privacy_policy')}
            className={`p-6 rounded-lg border-2 transition-all ${
              activeTab === 'privacy_policy'
                ? 'border-[#C2983B] bg-[#C2983B]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#C2983B]" />
              <div className="text-left">
                <h3 className="font-semibold text-[#1a2b4b]">Privacy Policy</h3>
                <p className="text-sm text-gray-600">How you collect and use data</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('terms_and_conditions')}
            className={`p-6 rounded-lg border-2 transition-all ${
              activeTab === 'terms_and_conditions'
                ? 'border-[#C2983B] bg-[#C2983B]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#C2983B]" />
              <div className="text-left">
                <h3 className="font-semibold text-[#1a2b4b]">Terms & Conditions</h3>
                <p className="text-sm text-gray-600">Rules for using your services</p>
              </div>
            </div>
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === 'privacy_policy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600 mb-2 block">
                  Content (HTML supported)
                </Label>
                <ReactQuill
                  theme="snow"
                  value={activeTab === 'privacy_policy' ? privacyContent : termsContent}
                  onChange={activeTab === 'privacy_policy' ? setPrivacyContent : setTermsContent}
                  modules={modules}
                  className="bg-white"
                  style={{ height: '400px', marginBottom: '50px' }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleSave(activeTab)}
                  disabled={saveMutation.isPending}
                  className="bg-[#C2983B] hover:bg-[#b08e35]"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>

                <Link to={createPageUrl(activeTab === 'privacy_policy' ? 'PrivacyPolicy' : 'TermsAndConditions')} target="_blank">
                  <Button variant="outline">
                    Preview Page
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}