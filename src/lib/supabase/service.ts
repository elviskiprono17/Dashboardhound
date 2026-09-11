import { supabase } from './client';
import { DashboardItem } from '../types/dashboard';

export async function saveDashboardToSupabase(item: DashboardItem): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('dashboards').upsert({
      id: item.id,
      username: item.username || 'abloh',
      title: item.title,
      description: item.description || '',
      file_name: item.fileName,
      file_size_bytes: item.fileSize,
      layout_type: item.layout,
      theme_color: item.themeColor || 'hound',
      dataset_schema: item.schema,
      dataset_data: item.data.slice(0, 500), // preserve data for shared viewing
      chart_configs: [],
      insights: item.insights || {},
      is_public: item.isPublic,
      is_encrypted: item.isEncrypted,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('Supabase save warning, saving locally:', error.message);
      saveDashboardLocally(item);
      return { success: true };
    }

    saveDashboardLocally(item);
    return { success: true };
  } catch (err: any) {
    console.warn('Supabase save error, fallback to local storage:', err);
    saveDashboardLocally(item);
    return { success: true };
  }
}

export async function getDashboardFromSupabase(id: string): Promise<DashboardItem | null> {
  try {
    const { data, error } = await supabase
      .from('dashboards')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      return getDashboardLocally(id);
    }

    return {
      id: data.id,
      userId: data.user_id,
      username: data.username,
      title: data.title,
      description: data.description,
      fileName: data.file_name,
      fileSize: data.file_size_bytes,
      layout: data.layout_type,
      themeColor: data.theme_color,
      schema: data.dataset_schema,
      data: data.dataset_data,
      insights: data.insights,
      isPublic: data.is_public,
      isEncrypted: data.is_encrypted,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      viewsCount: data.views_count,
    };
  } catch (err) {
    return getDashboardLocally(id);
  }
}

function saveDashboardLocally(item: DashboardItem): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem('dh_dashboards') || '{}');
    existing[item.id] = item;
    localStorage.setItem('dh_dashboards', JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

function getDashboardLocally(id: string): DashboardItem | null {
  if (typeof window === 'undefined') return null;
  try {
    const existing = JSON.parse(localStorage.getItem('dh_dashboards') || '{}');
    return existing[id] || null;
  } catch (e) {
    return null;
  }
}
