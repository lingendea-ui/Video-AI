import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Upload,
  Maximize2,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ExtensionOption {
  id: string;
  name: string;
  description: string;
  duration: number;
  color: string;
}

export default function VideoExtendScreen() {
  const router = useRouter();
  const [hasVideo, setHasVideo] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState<string>('3s');
  const [extendDirection, setExtendDirection] = useState<'before' | 'after'>('after');

  const extensionOptions: ExtensionOption[] = [
    {
      id: '3s',
      name: '3 Seconds',
      description: 'Quick extension',
      duration: 3,
      color: '#3b82f6',
    },
    {
      id: '5s',
      name: '5 Seconds',
      description: 'Medium extension',
      duration: 5,
      color: '#8b5cf6',
    },
    {
      id: '10s',
      name: '10 Seconds',
      description: 'Long extension',
      duration: 10,
      color: '#ec4899',
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Set your own duration',
      duration: 0,
      color: '#f59e0b',
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
        <Text style={styles.title}>Video Extend</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {!hasVideo ? (
          <View style={styles.uploadSection}>
            <TouchableOpacity
              style={styles.uploadCard}
              onPress={() => setHasVideo(true)}
              activeOpacity={0.8}>
              <View style={styles.uploadIcon}>
                <Upload size={48} color="#3b82f6" />
              </View>
              <Text style={styles.uploadTitle}>Upload Your Video</Text>
              <Text style={styles.uploadSubtitle}>
                Select a video file to extend its duration with AI
              </Text>
              <View style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Choose Video</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>What you can do:</Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>
                    Extend videos before or after the original clip
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>
                    AI generates smooth, natural continuations
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>
                    Maintain consistent style and motion
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>
                    Perfect for creating loops or extending clips
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Video Preview</Text>
              <View style={styles.videoPreview}>
                <TouchableOpacity style={styles.playButton}>
                  <Play size={48} color="#ffffff" />
                </TouchableOpacity>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoInfoText}>
                    Original Duration: 5:30
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.changeVideoButton}>
                <Upload size={18} color="#3b82f6" />
                <Text style={styles.changeVideoText}>Change Video</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Extension Direction</Text>
              <View style={styles.directionButtons}>
                <TouchableOpacity
                  style={[
                    styles.directionButton,
                    extendDirection === 'before' && styles.directionButtonActive,
                  ]}
                  onPress={() => setExtendDirection('before')}>
                  <ChevronLeft size={24} color={extendDirection === 'before' ? '#ffffff' : '#64748b'} />
                  <Text
                    style={[
                      styles.directionButtonText,
                      extendDirection === 'before' && styles.directionButtonTextActive,
                    ]}>
                    Extend Before
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.directionButton,
                    extendDirection === 'after' && styles.directionButtonActive,
                  ]}
                  onPress={() => setExtendDirection('after')}>
                  <Text
                    style={[
                      styles.directionButtonText,
                      extendDirection === 'after' && styles.directionButtonTextActive,
                    ]}>
                    Extend After
                  </Text>
                  <ChevronRight size={24} color={extendDirection === 'after' ? '#ffffff' : '#64748b'} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Extension Duration</Text>
              <View style={styles.extensionGrid}>
                {extensionOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.extensionCard,
                      selectedExtension === option.id && styles.extensionCardActive,
                      {
                        borderColor:
                          selectedExtension === option.id ? option.color : '#e5e7eb',
                      },
                    ]}
                    onPress={() => setSelectedExtension(option.id)}
                    activeOpacity={0.7}>
                    <View
                      style={[
                        styles.extensionIndicator,
                        { backgroundColor: option.color },
                      ]}
                    />
                    <Text style={styles.extensionName}>{option.name}</Text>
                    <Text style={styles.extensionDescription}>
                      {option.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <View style={styles.settingsCard}>
                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Quality</Text>
                  <Text style={styles.settingValue}>High</Text>
                </View>
                <View style={styles.settingDivider} />
                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Frame Rate</Text>
                  <Text style={styles.settingValue}>Match Original</Text>
                </View>
                <View style={styles.settingDivider} />
                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Smoothness</Text>
                  <Text style={styles.settingValue}>Maximum</Text>
                </View>
              </View>
            </View>

            <View style={styles.resultCard}>
              <Maximize2 size={24} color="#6366f1" />
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>Final Duration</Text>
                <Text style={styles.resultSubtitle}>
                  Original (5:30) + Extension ({extensionOptions.find(o => o.id === selectedExtension)?.duration || 0}s)
                </Text>
              </View>
              <Text style={styles.resultValue}>
                {Math.floor(330 / 60 + ((extensionOptions.find(o => o.id === selectedExtension)?.duration || 0)))}:
                {((330 % 60) + ((extensionOptions.find(o => o.id === selectedExtension)?.duration || 0) * 60 % 60)).toString().padStart(2, '0')}
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {hasVideo && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.generateButton}>
            <Maximize2 size={20} color="#ffffff" />
            <Text style={styles.generateButtonText}>Extend Video</Text>
          </TouchableOpacity>
        </View>
      )}
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
  uploadSection: {
    flex: 1,
    paddingTop: 40,
  },
  uploadCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginBottom: 24,
  },
  uploadIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  featuresCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  featuresTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 6,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
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
  videoPreview: {
    width: '100%',
    height: width * 0.5625,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  videoInfoText: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '500',
  },
  changeVideoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  changeVideoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3b82f6',
  },
  directionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  directionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  directionButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  directionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748b',
  },
  directionButtonTextActive: {
    color: '#ffffff',
  },
  extensionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  extensionCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
  },
  extensionCardActive: {
    backgroundColor: '#f8fafc',
  },
  extensionIndicator: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginBottom: 12,
  },
  extensionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  extensionDescription: {
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
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0f172a',
  },
  settingValue: {
    fontSize: 15,
    color: '#64748b',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    gap: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4338ca',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 12,
    color: '#6366f1',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4338ca',
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
    backgroundColor: '#6366f1',
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
