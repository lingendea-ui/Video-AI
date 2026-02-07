import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ImageIcon,
  Video,
  Sparkles,
  Wand2,
  FileText,
  Maximize2,
  Paintbrush,
  ArrowRight,
} from 'lucide-react-native';

interface CreateOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
}

export default function CreateScreen() {
  const router = useRouter();

  const options: CreateOption[] = [
    {
      id: 'photo-editor',
      title: 'Photo Editor',
      description: 'Edit and enhance your photos with professional tools',
      icon: <ImageIcon size={24} color="#3b82f6" />,
      route: '/photo-editor',
      color: '#3b82f6',
    },
    {
      id: 'video-editor',
      title: 'Video Editor',
      description: 'Cut, trim, and edit videos with precision',
      icon: <Video size={24} color="#8b5cf6" />,
      route: '/video-editor',
      color: '#8b5cf6',
    },
    {
      id: 'mimic-motion',
      title: 'Mimic Motion',
      description: 'Animate static images with dynamic motion',
      icon: <Sparkles size={24} color="#ec4899" />,
      route: '/mimic-motion',
      color: '#ec4899',
    },
    {
      id: 'text-to-video',
      title: 'Text to Video',
      description: 'Generate stunning videos from text descriptions',
      icon: <FileText size={24} color="#f59e0b" />,
      route: '/text-to-video',
      color: '#f59e0b',
    },
    {
      id: 'image-to-video',
      title: 'Image to Video',
      description: 'Transform static images into animated videos',
      icon: <Wand2 size={24} color="#10b981" />,
      route: '/image-to-video',
      color: '#10b981',
    },
    {
      id: 'motion-brush',
      title: 'Motion Brush',
      description: 'Paint custom motion paths on your videos',
      icon: <Paintbrush size={24} color="#06b6d4" />,
      route: '/motion-brush',
      color: '#06b6d4',
    },
    {
      id: 'video-extend',
      title: 'Video Extend',
      description: 'Extend your videos seamlessly with AI',
      icon: <Maximize2 size={24} color="#6366f1" />,
      route: '/video-extend',
      color: '#6366f1',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Project</Text>
        <Text style={styles.subtitle}>
          Choose a tool to start creating amazing content
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={() => router.push(option.route as any)}
            activeOpacity={0.7}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${option.color}15` },
              ]}>
              {option.icon}
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <ArrowRight size={20} color="#9ca3af" />
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
