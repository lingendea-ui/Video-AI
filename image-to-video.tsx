import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Upload,
  Wand2,
  Play,
  Sliders,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface CameraMotion {
  id: string;
  name: string;
  description: string;
}

export default function ImageToVideoScreen() {
  const router = useRouter();
  const [sourceImage, setSourceImage] = useState<string>(
    'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800'
  );
  const [prompt, setPrompt] = useState('');
  const [selectedMotion, setSelectedMotion] = useState<string>('auto');
  const [duration, setDuration] = useState(5);
  const [motionIntensity, setMotionIntensity] = useState(50);

  const cameraMotions: CameraMotion[] = [
    { id: 'auto', name: 'Auto', description: 'AI decides best motion' },
    { id: 'zoom-in', name: 'Zoom In', description: 'Gradual zoom towards subject' },
    { id: 'zoom-out', name: 'Zoom Out', description: 'Pull back from subject' },
    { id: 'pan-left', name: 'Pan Left', description: 'Move camera left' },
    { id: 'pan-right', name: 'Pan Right', description: 'Move camera right' },
    { id: 'tilt-up', name: 'Tilt Up', description: 'Move camera upward' },
    { id: 'tilt-down', name: 'Tilt Down', description: 'Move camera downward' },
    { id: 'static', name: 'Static', description: 'No camera movement' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Image to Video</Text>
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
            <View style={styles.uploadButton}>
              <Upload size={24} color="#ffffff" />
              <Text style={styles.uploadButtonText}>Change Image</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Wand2 size={20} color="#10b981" />
            <Text style={styles.sectionTitle}>
              Motion Prompt (Optional)
            </Text>
          </View>
          <TextInput
            style={styles.promptInput}
            placeholder="Describe the motion or action..."
            placeholderTextColor="#94a3b8"
            multiline
            value={prompt}
            onChangeText={setPrompt}
            numberOfLines={4}
          />
          <Text style={styles.promptHint}>
            e.g., "leaves gently swaying in the wind"
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Camera Motion</Text>
          <View style={styles.motionsGrid}>
            {cameraMotions.map((motion) => (
              <TouchableOpacity
                key={motion.id}
                style={[
                  styles.motionCard,
                  selectedMotion === motion.id && styles.motionCardActive,
                ]}
                onPress={() => setSelectedMotion(motion.id)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.motionName,
                    selectedMotion === motion.id && styles.motionNameActive,
                  ]}>
                  {motion.name}
                </Text>
                <Text style={styles.motionDescription}>
                  {motion.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sliders size={20} color="#8b5cf6" />
            <Text style={styles.sectionTitle}>Advanced Settings</Text>
          </View>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Duration</Text>
                <Text style={styles.settingValue}>{duration} seconds</Text>
              </View>
              <View style={styles.durationButtons}>
                {[3, 5, 10].map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.durationButton,
                      duration === d && styles.durationButtonActive,
                    ]}
                    onPress={() => setDuration(d)}>
                    <Text
                      style={[
                        styles.durationButtonText,
                        duration === d && styles.durationButtonTextActive,
                      ]}>
                      {d}s
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Motion Intensity</Text>
                <Text style={styles.settingValue}>{motionIntensity}%</Text>
              </View>
            </View>
            <View style={styles.slider}>
              <View
                style={[styles.sliderFill, { width: `${motionIntensity}%` }]}
              />
              <View
                style={[
                  styles.sliderThumb,
                  { left: `${motionIntensity}%` },
                ]}
              />
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Frame Rate</Text>
              <Text style={styles.settingValue}>30 FPS</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            Our AI analyzes your image and generates smooth motion based on your
            selected camera movement and motion prompt. The result is a
            professional-looking video animation.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.generateButton}>
          <Play size={20} color="#ffffff" />
          <Text style={styles.generateButtonText}>Generate Video</Text>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.75,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  promptInput: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  promptHint: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 8,
    fontStyle: 'italic',
  },
  motionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  motionCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  motionCardActive: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  motionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  motionNameActive: {
    color: '#10b981',
  },
  motionDescription: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
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
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 13,
    color: '#64748b',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  durationButtonActive: {
    backgroundColor: '#10b981',
  },
  durationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  durationButtonTextActive: {
    color: '#ffffff',
  },
  slider: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    marginTop: 8,
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8b5cf6',
    marginLeft: -10,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  infoCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#3b82f6',
    lineHeight: 20,
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
    backgroundColor: '#10b981',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
