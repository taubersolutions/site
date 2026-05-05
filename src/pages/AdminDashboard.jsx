import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Settings, Loader2, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const { data: coaches = [] } = useQuery({
    queryKey: ['coaches'],
    queryFn: () => base44.entities.Coach.list('sort_order', 5),
    enabled: !loading
  });

  const { data: resources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: () => base44.entities.Resource.list('sort_order', 4),
    enabled: !loading
  });

  const { data: emailSubscribers = [] } = useQuery({
    queryKey: ['emailSubscribers'],
    queryFn: () => base44.entities.EmailSubscriber.list('-created_date', 50),
    enabled: !loading
  });

  const { data: scheduleRequests = [] } = useQuery({
    queryKey: ['scheduleRequests'],
    queryFn: () => base44.entities.ScheduleRequest.list('-created_date'),
    enabled: !loading
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C2983B]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-[#1a2b4b] mb-2">
            Admin <span className="font-normal text-[#C2983B]">Dashboard</span>
          </h1>
          <p className="text-gray-600">Welcome back, {user?.full_name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to={createPageUrl('AdminCoaches')}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#C2983B]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C2983B]/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#C2983B]" />
                  </div>
                  <span>Manage Coaches</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Add, edit, and manage coach profiles and information
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('AdminResources')}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#C2983B]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C2983B]/10 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#C2983B]" />
                  </div>
                  <span>Manage Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Upload and manage downloadable resources for all currencies
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('AdminSettings')}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#C2983B]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C2983B]/10 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-[#C2983B]" />
                  </div>
                  <span>Site Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Update footer contact information and addresses
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl('AdminLegal')}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#C2983B]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C2983B]/10 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#C2983B]" />
                  </div>
                  <span>Legal Pages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Edit privacy policy and terms & conditions
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Current Coaches Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-[#1a2b4b]">
              Current <span className="font-normal text-[#C2983B]">Coaches</span>
            </h2>
            <Link to={createPageUrl('AdminCoaches')}>
              <Button variant="outline" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaches.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center py-8">No coaches yet</p>
            ) : (
              coaches.map((coach) => (
                <Card key={coach.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {coach.image_url && (
                        <img src={coach.image_url} alt={coach.name} className="w-12 h-12 rounded-full object-cover" />
                      )}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-[#1a2b4b]">{coach.name}</h3>
                        <p className="text-sm text-gray-600">{coach.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {coach.is_featured && (
                        <span className="text-xs bg-[#C2983B]/20 text-[#C2983B] px-2 py-1 rounded">Featured</span>
                      )}
                      {coach.is_uk_coach && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">UK</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Current Resources Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-[#1a2b4b]">
              Current <span className="font-normal text-[#C2983B]">Resources</span>
            </h2>
            <Link to={createPageUrl('AdminResources')}>
              <Button variant="outline" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center py-8">No resources yet</p>
            ) : (
              resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#1a2b4b] mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex gap-3 text-xs">
                      <div>
                        <span className="font-medium text-[#C2983B]">GBP:</span> {resource.pdf_url_gbp ? '✓' : '✗'}
                      </div>
                      <div>
                        <span className="font-medium text-blue-600">USD:</span> {resource.pdf_url_usd ? '✓' : '✗'}
                      </div>
                      <div>
                        <span className="font-medium text-purple-600">ILS:</span> {resource.pdf_url_ils ? '✓' : '✗'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Schedule Requests */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-[#1a2b4b]">
              Schedule <span className="font-normal text-[#C2983B]">Requests</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{scheduleRequests.length} total</span>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              {scheduleRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No schedule requests yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coach</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scheduleRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.name}</div>
                            {request.message && (
                              <div className="text-xs text-gray-500 max-w-xs truncate">{request.message}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.email}</div>
                            <div className="text-xs text-gray-500">{request.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.session_type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.coach_preference}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                              request.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(request.created_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Email Subscribers */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-[#1a2b4b]">
              Email <span className="font-normal text-[#C2983B]">Subscribers</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{emailSubscribers.length} total</span>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              {emailSubscribers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No subscribers yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {emailSubscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {subscriber.name || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {subscriber.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {subscriber.source}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(subscriber.created_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}