import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Filter, Clock, CheckCircle, AlertCircle } from 'lucide-react-native';

interface Project {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  thumbnail: string;
  createdAt: string;
}

export default function ProjectsScreen() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing'>(
    'all'
  );

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Summer Vacation Video',
      type: 'Video Editor',
      status: 'completed',
      thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: '2 hours ago',
    },
    {
      id: '2',
      title: 'AI Generated Landscape',
      type: 'Text to Video',
      status: 'processing',
      thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: '5 hours ago',
    },
    {
      id: '3',
      title: 'Portrait Animation',
      type: 'Mimic Motion',
      status: 'completed',
      thumbnail: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: '1 day ago',
    },
    {
      id: '4',
      title: 'Product Showcase',
      type: 'Image to Video',
      status: 'draft',
      thumbnail: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: '2 days ago',
    },
  ];

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#10b981" />;
      case 'processing':
        return <Clock size={16} color="#f59e0b" />;
      case 'failed':
        return <AlertCircle size={16} color="#ef4444" />;
      default:
        return <Clock size={16} color="#9ca3af" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'processing':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#9ca3af';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Projects</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        {['all', 'completed', 'processing'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, filter === tab && styles.filterTabActive]}
            onPress={() => setFilter(tab as any)}>
            <Text
              style={[
                styles.filterTabText,
                filter === tab && styles.filterTabTextActive,
              ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {mockProjects.map((project) => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            activeOpacity={0.7}>
            <Image
              source={{ uri: project.thumbnail }}
              style={styles.thumbnail}
            />
            <View style={styles.projectInfo}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <View style={styles.statusBadge}>
                  {getStatusIcon(project.status)}
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(project.status) },
                    ]}>
                    {project.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.projectType}>{project.type}</Text>
              <Text style={styles.projectTime}>{project.createdAt}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  filterTabActive: {
    backgroundColor: '#2563eb',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  filterTabTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  projectCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  projectInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  projectType: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  projectTime: {
    fontSize: 13,
    color: '#9ca3af',
  },
});
