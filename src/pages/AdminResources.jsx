import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Edit, Trash2, ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminResources() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState({});
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'Target',
    pdf_url_gbp: '',
    excel_url_gbp: '',
    pdf_url_usd: '',
    excel_url_usd: '',
    pdf_url_ils: '',
    excel_url_ils: '',
    sort_order: 0
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

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => base44.entities.Resource.list('sort_order'),
    enabled: !loading
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Resource.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['resources']);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Resource.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['resources']);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Resource.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['resources'])
  });

  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading({ ...uploading, [field]: true });
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, [field]: file_url });
    } catch (error) {
      alert('Failed to upload file');
    } finally {
      setUploading({ ...uploading, [field]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingResource) {
      updateMutation.mutate({ id: editingResource.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData(resource);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon_name: 'Target',
      pdf_url_gbp: '',
      excel_url_gbp: '',
      pdf_url_usd: '',
      excel_url_usd: '',
      pdf_url_ils: '',
      excel_url_ils: '',
      sort_order: 0
    });
    setEditingResource(null);
    setShowForm(false);
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
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to={createPageUrl('AdminDashboard')}>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-light text-[#1a2b4b]">
              Manage <span className="font-normal text-[#C2983B]">Resources</span>
            </h1>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#C2983B] hover:bg-[#b08e35]">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Select value={formData.icon_name} onValueChange={(value) => setFormData({ ...formData, icon_name: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Target">Target</SelectItem>
                        <SelectItem value="Wallet">Wallet</SelectItem>
                        <SelectItem value="Calculator">Calculator</SelectItem>
                        <SelectItem value="BookOpen">BookOpen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 text-[#C2983B]">GBP Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>PDF (GBP)</Label>
                      <Input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'pdf_url_gbp')} disabled={uploading.pdf_url_gbp} />
                      {uploading.pdf_url_gbp && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                      {formData.pdf_url_gbp && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                    </div>
                    <div>
                      <Label>Excel (GBP)</Label>
                      <Input type="file" accept=".xlsx,.xls" onChange={(e) => handleFileUpload(e, 'excel_url_gbp')} disabled={uploading.excel_url_gbp} />
                      {uploading.excel_url_gbp && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                      {formData.excel_url_gbp && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 text-blue-600">USD Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>PDF (USD)</Label>
                      <Input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'pdf_url_usd')} disabled={uploading.pdf_url_usd} />
                      {uploading.pdf_url_usd && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                      {formData.pdf_url_usd && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                    </div>
                    <div>
                      <Label>Excel (USD)</Label>
                      <Input type="file" accept=".xlsx,.xls" onChange={(e) => handleFileUpload(e, 'excel_url_usd')} disabled={uploading.excel_url_usd} />
                      {uploading.excel_url_usd && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                      {formData.excel_url_usd && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 text-purple-600">ILS Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>PDF (ILS)</Label>
                      <Input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'pdf_url_ils')} disabled={uploading.pdf_url_ils} />
                      {uploading.pdf_url_ils && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                      {formData.pdf_url_ils && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                    </div>
                    <div>
                      <Label>Excel (ILS)</Label>
                      <Input type="file" accept=".xlsx,.xls" onChange={(e) => handleFileUpload(e, 'excel_url_ils')} disabled={uploading.excel_url_ils} />
                      {uploading.excel_url_ils && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                      {formData.excel_url_ils && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-[#C2983B] hover:bg-[#b08e35]">
                    {editingResource ? 'Update' : 'Create'} Resource
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-[#1a2b4b] mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-[#C2983B]">GBP:</p>
                        <p>{resource.pdf_url_gbp ? '✓ PDF' : '- PDF'}</p>
                        <p>{resource.excel_url_gbp ? '✓ Excel' : '- Excel'}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-600">USD:</p>
                        <p>{resource.pdf_url_usd ? '✓ PDF' : '- PDF'}</p>
                        <p>{resource.excel_url_usd ? '✓ Excel' : '- Excel'}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-600">ILS:</p>
                        <p>{resource.pdf_url_ils ? '✓ PDF' : '- PDF'}</p>
                        <p>{resource.excel_url_ils ? '✓ Excel' : '- Excel'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm('Delete this resource?')) {
                          deleteMutation.mutate(resource.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}