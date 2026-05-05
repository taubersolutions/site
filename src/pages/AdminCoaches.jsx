import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Switch } from '@/components/ui/switch';

export default function AdminCoaches() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingCoach, setEditingCoach] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    bio: '',
    image_url: '',
    is_uk_coach: false,
    is_featured: false,
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

  const { data: coaches = [], isLoading } = useQuery({
    queryKey: ['coaches'],
    queryFn: () => base44.entities.Coach.list('sort_order'),
    enabled: !loading
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Coach.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['coaches']);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Coach.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['coaches']);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Coach.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['coaches'])
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image_url: file_url });
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCoach) {
      updateMutation.mutate({ id: editingCoach.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setFormData(coach);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      email: '',
      phone: '',
      bio: '',
      image_url: '',
      is_uk_coach: false,
      is_featured: false,
      sort_order: 0
    });
    setEditingCoach(null);
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
              Manage <span className="font-normal text-[#C2983B]">Coaches</span>
            </h1>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#C2983B] hover:bg-[#b08e35]">
            <Plus className="w-4 h-4 mr-2" />
            Add Coach
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {editingCoach ? 'Edit Coach' : 'Add New Coach'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Profile Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
                    )}
                  </div>
                </div>
                <div>
                  <Label>Bio *</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_uk_coach}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_uk_coach: checked })}
                    />
                    <Label>UK Coach</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label>Featured</Label>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-[#C2983B] hover:bg-[#b08e35]">
                    {editingCoach ? 'Update' : 'Create'} Coach
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
          {coaches.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 text-lg mb-2">No coaches added yet</p>
                <p className="text-gray-400 text-sm">Click "Add Coach" above to create your first coach profile</p>
              </CardContent>
            </Card>
          ) : (
            coaches.map((coach) => (
              <Card key={coach.id}>
              <CardContent className="p-6 flex items-center gap-6">
                {coach.image_url && (
                  <img src={coach.image_url} alt={coach.name} className="w-20 h-20 object-cover rounded-full" />
                )}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-[#1a2b4b]">{coach.name}</h3>
                  <p className="text-gray-600">{coach.title}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>{coach.email}</span>
                    {coach.phone && <span>{coach.phone}</span>}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {coach.is_uk_coach && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">UK Coach</span>
                    )}
                    {coach.is_featured && (
                      <span className="text-xs bg-[#C2983B]/20 text-[#C2983B] px-2 py-1 rounded">Featured</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(coach)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Delete this coach?')) {
                        deleteMutation.mutate(coach.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}