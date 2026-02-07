import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
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
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  gradient: string[];
}

export default function HomeScreen() {
  const router = useRouter();

  const features: FeatureCard[] = [
    {
      id: 'photo-editor',
      title: 'Photo Editor',
      description: 'Edit and enhance your photos with AI',
      icon: <ImageIcon size={32} color="#fff" />,
      route: '/photo-editor',
      gradient: ['#3b82f6', '#2563eb'],
    },
    {
      id: 'video-editor',
      title: 'Video Editor',
      description: 'Professional video editing tools',
      icon: <Video size={32} color="#fff" />,
      route: '/video-editor',
      gradient: ['#8b5cf6', '#7c3aed'],
    },
    {
      id: 'mimic-motion',
      title: 'Mimic Motion',
      description: 'Animate images with motion',
      icon: <Sparkles size={32} color="#fff" />,
      route: '/mimic-motion',
      gradient: ['#ec4899', '#db2777'],
    },
    {
      id: 'text-to-video',
      title: 'Text to Video',
      description: 'Generate videos from text',
      icon: <FileText size={32} color="#fff" />,
      route: '/text-to-video',
      gradient: ['#f59e0b', '#d97706'],
    },
    {
      id: 'image-to-video',
      title: 'Image to Video',
      description: 'Transform images into videos',
      icon: <Wand2 size={32} color="#fff" />,
      route: '/image-to-video',
      gradient: ['#10b981', '#059669'],
    },
    {
      id: 'motion-brush',
      title: 'Motion Brush',
      description: 'Paint motion onto your videos',
      icon: <Paintbrush size={32} color="#fff" />,
      route: '/motion-brush',
      gradient: ['#06b6d4', '#0891b2'],
    },
    {
      id: 'video-extend',
      title: 'Video Extend',
      description: 'Extend video duration with AI',
      icon: <Maximize2 size={32} color="#fff" />,
      route: '/video-extend',
      gradient: ['#6366f1', '#4f46e5'],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video AI Studio</Text>
        <Text style={styles.subtitle}>
          Create stunning videos with AI-powered tools
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={styles.cardContainer}
              onPress={() => router.push(feature.route as any)}
              activeOpacity={0.8}>
              <LinearGradient
                colors={feature.gradient}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={styles.iconContainer}>{feature.icon}</View>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDescription}>
                  {feature.description}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Videos Created</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50K+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
        </View>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: cardWidth,
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    height: 180,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
});
