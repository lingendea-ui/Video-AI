import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Upload,
  Play,
  Zap,
  TrendingUp,
  Wind,
  Waves,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface MotionPreset {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export default function MimicMotionScreen() {
  const router = useRouter();
  const [sourceImage, setSourceImage] = useState<string>(
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800'
  );
  const [referenceVideo, setReferenceVideo] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const motionPresets: MotionPreset[] = [
    {
      id: 'gentle',
      name: 'Gentle Sway',
      icon: <Wind size={24} color="#ffffff" />,
      description: 'Subtle back and forth motion',
      color: '#3b82f6',
    },
    {
      id: 'dynamic',
      name: 'Dynamic',
      icon: <Zap size={24} color="#ffffff" />,
      description: 'Energetic movement',
      color: '#f59e0b',
    },
    {
      id: 'zoom',
      name: 'Zoom In',
      icon: <TrendingUp size={24} color="#ffffff" />,
      description: 'Gradual zoom effect',
      color: '#8b5cf6',
    },
    {
      id: 'wave',
      name: 'Wave',
      icon: <Waves size={24} color="#ffffff" />,
      description: 'Flowing wave motion',
      color: '#06b6d4',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Mimic Motion</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Source Image</Text>
          <TouchableOpacity style={styles.imageContainer} activeOpacity={0.8}>
            <Image source={{ uri: sourceImage }} style={styles.image} />
            <View style={styles.uploadOverlay}>
              <Upload size={32} color="#ffffff" />
              <Text style={styles.uploadText}>Tap to change image</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reference Video (Optional)</Text>
          <TouchableOpacity style={styles.videoUpload} activeOpacity={0.8}>
            <Upload size={40} color="#64748b" />
            <Text style={styles.videoUploadTitle}>
              Upload Reference Video
            </Text>
            <Text style={styles.videoUploadSubtitle}>
              The motion from this video will be applied to your image
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motion Presets</Text>
          <View style={styles.presetsGrid}>
            {motionPresets.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={[
                  styles.presetCard,
                  selectedPreset === preset.id && styles.presetCardActive,
                ]}
                onPress={() => setSelectedPreset(preset.id)}
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.presetIcon,
                    { backgroundColor: preset.color },
                  ]}>
                  {preset.icon}
                </View>
                <Text style={styles.presetName}>{preset.name}</Text>
                <Text style={styles.presetDescription}>
                  {preset.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Motion Intensity</Text>
              <Text style={styles.settingValue}>Medium</Text>
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Duration</Text>
              <Text style={styles.settingValue}>3 seconds</Text>
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Frame Rate</Text>
              <Text style={styles.settingValue}>30 FPS</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.generateButton,
            !selectedPreset && !referenceVideo && styles.generateButtonDisabled,
          ]}
          disabled={!selectedPreset && !referenceVideo}>
          <Play size={20} color="#ffffff" />
          <Text style={styles.generateButtonText}>Generate Animation</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  imageContainer: {
    width: '100%',
    height: width - 32,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  uploadText: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 8,
    fontWeight: '500',
  },
  videoUpload: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  videoUploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 12,
  },
  videoUploadSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  presetCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  presetCardActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  presetIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  presetName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  presetDescription: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 15,
    color: '#64748b',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  generateButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  generateButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
