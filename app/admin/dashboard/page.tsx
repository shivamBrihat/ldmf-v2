'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  Heart,
  Newspaper,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Menu,
  ExternalLink,
  Search,
  Sparkles,
  FileText,
  MessageSquare,
  Eye,
  CheckSquare,
  Square,
} from 'lucide-react';

type TabType =
  | 'overview'
  | 'team'
  | 'gallery'
  | 'programs'
  | 'timeline'
  | 'stories'
  | 'media'
  | 'updates'
  | 'activities'
  | 'events'
  | 'site-content'
  | 'contacts';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Toast Status message
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data states
  const [teamList, setTeamList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [programsList, setProgramsList] = useState<any[]>([]);
  const [timelineList, setTimelineList] = useState<any[]>([]);
  const [storiesList, setStoriesList] = useState<any[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [updatesList, setUpdatesList] = useState<any[]>([]);
  const [activitiesList, setActivitiesList] = useState<any[]>([]);
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [siteContentList, setSiteContentList] = useState<any[]>([]);
  const [contactList, setContactList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<any>({});
  const [viewContactItem, setViewContactItem] = useState<any | null>(null);

  const openViewModal = async (c: any) => {
    setViewContactItem(c);
    if (!c.isRead) {
      await toggleContactRead(c.id, false);
    }
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch All Data
  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [tRes, gRes, pRes, tmRes, sRes, mRes, uRes, aRes, eRes, scRes, cRes] = await Promise.all([
        fetch('/api/team'),
        fetch('/api/gallery'),
        fetch('/api/programs'),
        fetch('/api/timeline'),
        fetch('/api/stories'),
        fetch('/api/media'),
        fetch('/api/updates'),
        fetch('/api/activities'),
        fetch('/api/events'),
        fetch('/api/site-content'),
        fetch('/api/contact'),
      ]);

      if (tRes.ok) setTeamList(await tRes.json());
      if (gRes.ok) setGalleryList(await gRes.json());
      if (pRes.ok) setProgramsList(await pRes.json());
      if (tmRes.ok) setTimelineList(await tmRes.json());
      if (sRes.ok) setStoriesList(await sRes.json());
      if (mRes.ok) setMediaList(await mRes.json());
      if (uRes.ok) setUpdatesList(await uRes.json());
      if (aRes.ok) setActivitiesList(await aRes.json());
      if (eRes.ok) setEventsList(await eRes.json());
      if (scRes.ok) setSiteContentList(await scRes.json());
      if (cRes.ok) setContactList(await cRes.json());
    } catch (err) {
      showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      setLoggingOut(false);
      showToast('Logout failed', 'error');
    }
  };

  // Upload Helper
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    setUploadingImage(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        const result = await res.json();
        setFormData((prev: any) => ({
          ...prev,
          photoUrl: result.url,
          imageUrl: result.url,
        }));
        showToast('Image uploaded successfully');
      } else {
        showToast('Image upload failed', 'error');
      }
    } catch (err) {
      showToast('Upload error', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Open Modal Create / Edit
  const openModal = (item: any = null) => {
    setEditItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData(activeTab === 'gallery' ? { category: 'General' } : {});
    }
    setModalOpen(true);
  };

  // Delete Item
  const handleDelete = async (endpoint: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Item deleted successfully');
        fetchAllData();
      } else {
        showToast('Failed to delete item', 'error');
      }
    } catch (err) {
      showToast('Error deleting item', 'error');
    }
  };

  // Save/Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'gallery' && (!formData.category || formData.category === '__custom__')) {
      showToast('Please specify a category', 'error');
      return;
    }

    setSubmitting(true);

    let endpoint = activeTab;
    let method = editItem ? 'PATCH' : 'POST';
    let url = editItem ? `/api/${endpoint}/${editItem.id}` : `/api/${endpoint}`;

    if (activeTab === 'site-content' && editItem) {
      url = `/api/site-content/${editItem.key}`;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast(editItem ? 'Updated successfully' : 'Created successfully');
        setModalOpen(false);
        fetchAllData();
      } else {
        const errData = await res.json();
        showToast(errData.error || 'Operation failed', 'error');
      }
    } catch (err) {
      showToast('Form submission error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Contact Read Status
  const toggleContactRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !currentRead }),
      });
      if (res.ok) {
        showToast('Message status updated');
        fetchAllData();
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'team', label: 'Team Members', icon: Users, count: teamList.length },
    { id: 'gallery', label: 'Gallery Images', icon: ImageIcon, count: galleryList.length },
    { id: 'programs', label: 'Courses / Programs', icon: BookOpen, count: programsList.length },
    { id: 'timeline', label: 'Timeline Milestones', icon: Calendar, count: timelineList.length },
    { id: 'stories', label: 'Success Stories', icon: Heart, count: storiesList.length },
    { id: 'media', label: 'Media Coverage', icon: Newspaper, count: mediaList.length },
    { id: 'updates', label: 'Updates & News', icon: Sparkles, count: updatesList.length },
    { id: 'activities', label: 'Activities', icon: Sparkles, count: activitiesList.length },
    { id: 'events', label: 'Events', icon: Calendar, count: eventsList.length },
    { id: 'site-content', label: 'Site Content Pages', icon: FileText, count: siteContentList.length },
    { id: 'contacts', label: 'Contact Submissions', icon: MessageSquare, count: contactList.length },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col font-sans">
      {/* Toast Banner */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950 text-emerald-100 border-emerald-700'
              : 'bg-rose-950 text-rose-100 border-rose-700'
          }`}
        >
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
          <span className="text-xs font-semibold">{toastMessage.text}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#7A1F2B] text-white border-b border-[#C9A227]/30 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.webp"
              alt="LDMF Logo"
              width={160}
              height={45}
              className="h-9 w-auto bg-white p-1 rounded-lg"
            />
            <span className="hidden sm:inline bg-[#C9A227] text-[#7A1F2B] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
              ADMIN CONTROL CENTER
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 bg-[#C9A227] hover:bg-[#b08d20] text-[#7A1F2B] text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md"
          >
            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#1A1A1A] text-white flex flex-col justify-between transition-transform duration-300 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-5 overflow-y-auto">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A227] mb-4">
              CONTENT MANAGEMENT
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as TabType);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#7A1F2B] text-white shadow-lg border border-[#C9A227]/40'
                        : 'text-stone-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A227]' : 'text-stone-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-stone-400'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-5 border-t border-white/10 text-[11px] text-stone-400">
            <div className="flex items-center gap-2 text-stone-300 font-semibold mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              <span>Authentic SQLite Session</span>
            </div>
            <span>Connected to Prisma local ORM</span>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] capitalize">
                {navItems.find((n) => n.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Manage live database records for Lagni Devi Memorial Foundation
              </p>
            </div>

            {activeTab !== 'overview' && activeTab !== 'contacts' && activeTab !== 'site-content' && (
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 bg-[#7A1F2B] hover:bg-[#601822] text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-md transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#C9A227]" />
                <span>Add New {activeTab.slice(0, -1)}</span>
              </button>
            )}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-[#7A1F2B] text-white rounded-3xl p-8 shadow-xl border border-[#C9A227]/30 relative overflow-hidden">
                <div className="max-w-2xl relative z-10">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A227] block mb-2">
                    ADMINISTRATION CONTROL CENTER
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-3">
                    Welcome back, Admin
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-6">
                    Manage team members, photo gallery, educational courses, updates, activities, upcoming events, and legal site contents live across the website.
                  </p>
                  <button
                    onClick={() => setActiveTab('team')}
                    className="bg-[#C9A227] hover:bg-[#b08d20] text-[#7A1F2B] text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Manage Team Members</span>
                  </button>
                </div>
              </div>

              {/* Grid of Counts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {navItems.filter((i) => i.id !== 'overview').map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabType)}
                      className="bg-white rounded-3xl p-6 border border-stone-200 hover:border-[#C9A227] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[#7A1F2B]/10 text-[#7A1F2B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-serif font-bold text-3xl text-[#1A1A1A] block mb-1">
                        {item.count || 0}
                      </span>
                      <span className="text-xs font-semibold text-stone-500 group-hover:text-[#7A1F2B]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: TEAM MEMBERS */}
          {activeTab === 'team' && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#7A1F2B]/5 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Member</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {teamList.map((m) => (
                      <tr key={m.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <Image src={m.photoUrl || '/images/logo.webp'} alt={m.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover border" />
                          <span className="font-bold text-[#1A1A1A]">{m.name}</span>
                        </td>
                        <td className="px-6 py-4 text-stone-600">{m.role}</td>
                        <td className="px-6 py-4 font-mono font-bold text-stone-500">{m.order}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openModal(m)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete('team', m.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryList.map((img) => (
                <div key={img.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm group">
                  <div className="relative h-48 w-full bg-stone-100">
                    <Image src={img.imageUrl} alt={img.caption || ''} fill className="object-cover" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#C9A227] uppercase">{img.category || 'General'}</span>
                      <p className="text-xs font-semibold text-[#1A1A1A] truncate max-w-[150px]">{img.caption || 'No caption'}</p>
                    </div>
                    <button onClick={() => handleDelete('gallery', img.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: UPDATES */}
          {activeTab === 'updates' && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#7A1F2B]/5 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Published Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {updatesList.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1A1A1A]">{u.title}</td>
                        <td className="px-6 py-4 text-stone-500">{new Date(u.publishedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openModal(u)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete('updates', u.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ACTIVITIES */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              {activitiesList.map((act) => (
                <div key={act.id} className="bg-white rounded-3xl p-6 border border-stone-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">{act.title}</h3>
                    <p className="text-xs text-stone-500 max-w-xl mt-1">{act.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal(act)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete('activities', act.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: EVENTS */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventsList.map((e) => (
                <div key={e.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${e.isUpcoming ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
                        {e.isUpcoming ? 'Upcoming' : 'Past Event'}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">{new Date(e.eventDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#1A1A1A] mb-2">{e.title}</h3>
                    <p className="text-xs text-stone-500 mb-4">{e.description}</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
                    <button onClick={() => openModal(e)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete('events', e.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#7A1F2B]/5 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Program / Course</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {programsList.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          {p.imageUrl && (
                            <Image src={p.imageUrl} alt={p.title} width={40} height={40} className="w-10 h-10 rounded-full object-cover border" />
                          )}
                          <span className="font-bold text-[#1A1A1A]">{p.title}</span>
                        </td>
                        <td className="px-6 py-4 text-stone-600 max-w-xs truncate">{p.description}</td>
                        <td className="px-6 py-4 font-mono font-bold text-stone-500">{p.order}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openModal(p)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete('programs', p.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#7A1F2B]/5 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Year</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Badge</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {timelineList.map((t) => (
                      <tr key={t.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1A1A1A]">{t.year}</td>
                        <td className="px-6 py-4 text-stone-600 font-semibold">{t.title || '-'}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 rounded font-mono font-bold text-[10px]">{t.badge || '-'}</span></td>
                        <td className="px-6 py-4 text-stone-600 max-w-xs truncate">{t.description}</td>
                        <td className="px-6 py-4 font-mono font-bold text-stone-500">{t.order}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openModal(t)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete('timeline', t.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: STORIES */}
          {activeTab === 'stories' && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#7A1F2B]/5 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Person</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Story</th>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {storiesList.map((s) => (
                      <tr key={s.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          {s.photoUrl && (
                            <Image src={s.photoUrl} alt={s.personName} width={40} height={40} className="w-10 h-10 rounded-full object-cover border" />
                          )}
                          <span className="font-bold text-[#1A1A1A]">{s.personName}</span>
                        </td>
                        <td className="px-6 py-4 text-stone-600">{s.location}</td>
                        <td className="px-6 py-4 text-stone-600 max-w-xs truncate">{s.story}</td>
                        <td className="px-6 py-4 font-mono font-bold text-stone-500">{s.order}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openModal(s)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete('stories', s.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MEDIA */}
          {activeTab === 'media' && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#7A1F2B]/5 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Outlet</th>
                      <th className="px-6 py-4">Headline</th>
                      <th className="px-6 py-4">Badge</th>
                      <th className="px-6 py-4">Coverage Date</th>
                      <th className="px-6 py-4">Excerpt / Quote</th>
                      <th className="px-6 py-4">Article Link</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {mediaList.map((m) => (
                      <tr key={m.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1A1A1A]">{m.outlet}</td>
                        <td className="px-6 py-4 text-stone-600 max-w-sm truncate">{m.headline}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 rounded font-mono font-bold text-[10px]">{m.badge || '-'}</span></td>
                        <td className="px-6 py-4 text-stone-600 font-semibold">{m.date || '-'}</td>
                        <td className="px-6 py-4 text-stone-600 max-w-xs truncate">{m.excerpt || '-'}</td>
                        <td className="px-6 py-4 text-stone-500 truncate max-w-xs">{m.articleUrl || 'None'}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openModal(m)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete('media', m.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SITE CONTENT */}
          {activeTab === 'site-content' && (
            <div className="space-y-6">
              {siteContentList.map((sc) => (
                <div key={sc.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#C9A227] uppercase tracking-wider block">KEY: {sc.key}</span>
                      <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">{sc.title}</h3>
                    </div>
                    <button onClick={() => openModal(sc)} className="bg-[#7A1F2B] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
                      <Edit className="w-4 h-4" />
                      <span>Edit Content</span>
                    </button>
                  </div>
                  <div className="bg-stone-50 rounded-2xl p-4 text-xs text-stone-700 max-h-40 overflow-y-auto font-mono leading-relaxed whitespace-pre-line border border-stone-200">
                    {sc.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: CONTACT SUBMISSIONS */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#7A1F2B]/5 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {contactList.map((c) => (
                      <tr key={c.id} className={c.isRead ? 'bg-stone-50/50' : 'bg-emerald-50/30 font-semibold'}>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleContactRead(c.id, c.isRead)}
                            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${c.isRead ? 'text-stone-400' : 'text-emerald-700 font-bold'}`}
                          >
                            {c.isRead ? <CheckSquare className="w-4 h-4 text-stone-400" /> : <Square className="w-4 h-4 text-emerald-600" />}
                            <span>{c.isRead ? 'Read' : 'New'}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-[#1A1A1A]">{c.name}</td>
                        <td className="px-6 py-4 text-stone-600">{c.email}</td>
                        <td className="px-6 py-4 text-stone-600 max-w-xs truncate">{c.message}</td>
                        <td className="px-6 py-4 text-stone-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openViewModal(c)} className="p-2 text-stone-600 hover:text-[#7A1F2B] bg-stone-100 rounded-xl" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete('contact', c.id)} className="p-2 text-rose-600 hover:text-rose-800 bg-rose-50 rounded-xl" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contact Details Viewer Modal */}
          {viewContactItem && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative">
                <button onClick={() => setViewContactItem(null)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>

                <h3 className="font-serif font-bold text-2xl text-[#1A1A1A] mb-6">
                  Submission Details
                </h3>

                <div className="space-y-4 text-xs text-stone-700">
                  <div className="grid grid-cols-3 gap-2 border-b border-stone-100 pb-3">
                    <span className="font-bold text-stone-500 uppercase tracking-wider">Submitted By:</span>
                    <span className="col-span-2 text-sm font-bold text-[#1A1A1A]">{viewContactItem.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-b border-stone-100 pb-3">
                    <span className="font-bold text-stone-500 uppercase tracking-wider">Email Address:</span>
                    <span className="col-span-2 text-sm text-[#1A1A1A]">{viewContactItem.email || 'None Provided'}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-b border-stone-100 pb-3">
                    <span className="font-bold text-stone-500 uppercase tracking-wider">Submitted Date:</span>
                    <span className="col-span-2 text-sm text-stone-600">{new Date(viewContactItem.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-500 uppercase tracking-wider block">Message Details:</span>
                    <div className="bg-stone-50 rounded-2xl p-4 text-xs text-stone-700 font-mono leading-relaxed whitespace-pre-line border border-stone-200 max-h-60 overflow-y-auto">
                      {viewContactItem.message}
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button type="button" onClick={() => setViewContactItem(null)} className="bg-[#7A1F2B] text-white font-semibold px-6 py-2.5 rounded-xl text-xs">
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Generic CRUD Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 relative">
                <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>

                <h3 className="font-serif font-bold text-2xl text-[#1A1A1A] mb-6 capitalize">
                  {editItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Dynamic Fields depending on Tab */}
                  {(activeTab === 'team' || activeTab === 'programs' || activeTab === 'activities' || activeTab === 'events' || activeTab === 'updates' || activeTab === 'site-content') && (
                    <div>
                      <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Title / Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name || formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value, title: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                      />
                    </div>
                  )}

                   {activeTab === 'team' && (
                    <>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Role *</label>
                        <input
                          type="text"
                          required
                          value={formData.role || ''}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Designation</label>
                        <input
                          type="text"
                          value={formData.designation || ''}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          value={formData.linkedinUrl || ''}
                          onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Bio / Description</label>
                        <textarea
                          rows={3}
                          value={formData.bio || ''}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Display Order</label>
                        <input
                          type="number"
                          value={formData.order || 0}
                          onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'timeline' && (
                    <>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Year *</label>
                        <input
                          type="text"
                          required
                          value={formData.year || ''}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Badge (e.g. 50 STUDENTS)</label>
                        <input
                          type="text"
                          value={formData.badge || ''}
                          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Description *</label>
                        <textarea
                          rows={4}
                          required
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Display Order</label>
                        <input
                          type="number"
                          value={formData.order || 0}
                          onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'stories' && (
                    <>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Person Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.personName || ''}
                          onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Location *</label>
                        <input
                          type="text"
                          required
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Story / Content *</label>
                        <textarea
                          rows={6}
                          required
                          value={formData.story || ''}
                          onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Display Order</label>
                        <input
                          type="number"
                          value={formData.order || 0}
                          onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'media' && (
                    <>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Outlet *</label>
                        <input
                          type="text"
                          required
                          value={formData.outlet || ''}
                          onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Headline *</label>
                        <input
                          type="text"
                          required
                          value={formData.headline || ''}
                          onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Article URL</label>
                        <input
                          type="url"
                          value={formData.articleUrl || ''}
                          onChange={(e) => setFormData({ ...formData, articleUrl: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Badge (e.g. NEWS COVERAGE)</label>
                        <input
                          type="text"
                          value={formData.badge || ''}
                          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Coverage Date (e.g. 2024 Coverage)</label>
                        <input
                          type="text"
                          value={formData.date || ''}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Excerpt / Description Quote</label>
                        <textarea
                          rows={3}
                          value={formData.excerpt || ''}
                          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'gallery' && (
                    <>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Category *</label>
                        {(() => {
                          const categoriesList = ["General", "Education", "Health Camps", "Women Empowerment", "Events"];
                          const isCustomSelected = formData.category === '__custom__' || (formData.category && !categoriesList.includes(formData.category));
                          return (
                            <>
                              <select
                                required
                                value={isCustomSelected ? '__custom__' : (formData.category || 'General')}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === '__custom__') {
                                    setFormData({ ...formData, category: '__custom__' });
                                  } else {
                                    setFormData({ ...formData, category: val });
                                  }
                                }}
                                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] bg-white text-[#1A1A1A] mb-2"
                              >
                                <option value="General">General</option>
                                <option value="Education">Education</option>
                                <option value="Health Camps">Health Camps</option>
                                <option value="Women Empowerment">Women Empowerment</option>
                                <option value="Events">Events</option>
                                <option value="__custom__">Custom / New Category...</option>
                              </select>

                              {isCustomSelected && (
                                <input
                                  type="text"
                                  required
                                  placeholder="Enter custom category name"
                                  value={formData.category === '__custom__' ? '' : (formData.category || '')}
                                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                  className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                                />
                              )}
                            </>
                          );
                        })()}
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Caption / Title</label>
                        <input
                          type="text"
                          value={formData.caption || ''}
                          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                          placeholder="e.g. Students at the Azamgarh Computer Learning Center"
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Display Order</label>
                        <input
                          type="number"
                          value={formData.order || 0}
                          onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                    </>
                  )}

                  {(activeTab === 'programs' || activeTab === 'activities' || activeTab === 'events' || activeTab === 'updates' || activeTab === 'site-content') && (
                    <div>
                      <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Description / Content *</label>
                      <textarea
                        rows={6}
                        required
                        value={formData.description || formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value, content: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B]"
                      />
                    </div>
                  )}

                  {activeTab === 'events' && (
                    <>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Event Date *</label>
                        <input
                          type="datetime-local"
                          required
                          value={(() => {
                            if (!formData.eventDate) return '';
                            try {
                              const d = new Date(formData.eventDate);
                              const year = d.getFullYear();
                              const month = String(d.getMonth() + 1).padStart(2, '0');
                              const day = String(d.getDate()).padStart(2, '0');
                              const hours = String(d.getHours()).padStart(2, '0');
                              const minutes = String(d.getMinutes()).padStart(2, '0');
                              return `${year}-${month}-${day}T${hours}:${minutes}`;
                            } catch (e) {
                              return '';
                            }
                          })()}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Location</label>
                        <input
                          type="text"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Village Rampur, Azamgarh"
                          className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                        />
                      </div>
                      <div className="flex items-center gap-2 py-2">
                        <input
                          type="checkbox"
                          id="isUpcoming"
                          checked={formData.isUpcoming !== undefined ? Boolean(formData.isUpcoming) : true}
                          onChange={(e) => setFormData({ ...formData, isUpcoming: e.target.checked })}
                          className="w-4 h-4 text-[#7A1F2B] border-stone-300 rounded focus:ring-[#7A1F2B]"
                        />
                        <label htmlFor="isUpcoming" className="font-bold text-stone-700 uppercase tracking-wider cursor-pointer select-none text-[#1A1A1A]">Is Upcoming Event</label>
                      </div>
                    </>
                  )}

                  {activeTab === 'updates' && (
                    <div>
                      <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Publish Date</label>
                      <input
                        type="date"
                        value={(() => {
                          if (!formData.publishedAt) return '';
                          try {
                            return new Date(formData.publishedAt).toISOString().substring(0, 10);
                          } catch (e) {
                            return '';
                          }
                        })()}
                        onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                        className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                      />
                    </div>
                  )}

                  {(activeTab === 'programs' || activeTab === 'activities') && (
                    <div>
                      <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                        className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#7A1F2B] text-[#1A1A1A]"
                      />
                    </div>
                  )}

                  {/* Image Upload Input */}
                  {(activeTab === 'team' || activeTab === 'gallery' || activeTab === 'programs' || activeTab === 'activities' || activeTab === 'events' || activeTab === 'updates') && (
                    <div>
                      <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Photo / Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.photoUrl || formData.imageUrl || ''}
                          onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 border border-stone-300 rounded-xl px-4 py-3"
                        />
                        <label className="bg-[#C9A227] hover:bg-[#b08d20] text-[#7A1F2B] font-bold px-4 py-3 rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0">
                          {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border text-stone-600">
                      Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="bg-[#7A1F2B] text-white font-semibold px-6 py-2.5 rounded-xl">
                      {submitting ? 'Saving...' : 'Save Record'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
