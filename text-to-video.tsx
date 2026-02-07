import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Sparkles,
  Image as ImageIcon,
  Film,
  Settings,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface StylePreset {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function TextToVideoScreen() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('realistic');
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const stylePresets: StylePreset[] = [
    {
      id: 'realistic',
      name: 'Realistic',
      description: 'Photorealistic visuals',
      color: '#3b82f6',
    },
    {
      id: 'anime',
      name: 'Anime',
      description: 'Japanese animation style',
      color: '#ec4899',
    },
    {
      id: 'cinematic',
      name: 'Cinematic',
      description: 'Film-like quality',
      color: '#8b5cf6',
    },
    {
      id: 'artistic',
      name: 'Artistic',
      description: 'Creative and abstract',
      color: '#f59e0b',
    },
    {
      id: '3d',
      name: '3D Render',
      description: '3D animated look',
      color: '#10b981',
    },
    {
      id: 'watercolor',
      name: 'Watercolor',
      description: 'Painted watercolor effect',
      color: '#06b6d4',
    },
  ];

  const examplePrompts = [
    'A majestic dragon flying over snow-capped mountains at sunset',
    'Underwater scene with colorful tropical fish and coral reefs',
    'Futuristic city with flying cars and neon lights at night',
    'Time-lapse of flowers blooming in a sunny garden',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Text to Video</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Describe Your Video</Text>
          </View>
          <TextInput
            style={styles.promptInput}
            placeholder="Describe what you want to see in your video..."
            placeholderTextColor="#94a3b8"
            multiline
            value={prompt}
            onChangeText={setPrompt}
            numberOfLines={6}
          />
          <Text style={styles.charCount}>{prompt.length} / 500</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>Example Prompts</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.examplesScroll}>
            {examplePrompts.map((example, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exampleCard}
                onPress={() => setPrompt(example)}
                activeOpacity={0.7}>
                <Text style={styles.exampleText} numberOfLines={3}>
                  {example}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ImageIcon size={20} color="#8b5cf6" />
            <Text style={styles.sectionTitle}>Style</Text>
          </View>
          <View style={styles.stylesGrid}>
            {stylePresets.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleCard,
                  selectedStyle === style.id && styles.styleCardActive,
                  {
                    borderColor:
                      selectedStyle === style.id ? style.color : '#e5e7eb',
                  },
                ]}
                onPress={() => setSelectedStyle(style.id)}
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.styleIndicator,
                    { backgroundColor: style.color },
                  ]}
                />
                <Text style={styles.styleName}>{style.name}</Text>
                <Text style={styles.styleDescription}>
                  {style.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#f59e0b" />
            <Text style={styles.sectionTitle}>Video Settings</Text>
          </View>

          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Duration</Text>
                <Text style={styles.settingSubLabel}>
                  {duration} seconds
                </Text>
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

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Aspect Ratio</Text>
                <Text style={styles.settingSubLabel}>{aspectRatio}</Text>
              </View>
              <View style={styles.aspectButtons}>
                {['16:9', '9:16', '1:1'].map((ratio) => (
                  <TouchableOpacity
                    key={ratio}
                    style={[
                      styles.aspectButton,
                      aspectRatio === ratio && styles.aspectButtonActive,
                    ]}
                    onPress={() => setAspectRatio(ratio)}>
                    <Text
                      style={[
                        styles.aspectButtonText,
                        aspectRatio === ratio && styles.aspectButtonTextActive,
                      ]}>
                      {ratio}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.costCard}>
          <Film size={24} color="#6366f1" />
          <View style={styles.costInfo}>
            <Text style={styles.costTitle}>Generation Cost</Text>
            <Text style={styles.costSubtitle}>1 credit per {duration}s video</Text>
          </View>
          <Text style={styles.costValue}>1 credit</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.generateButton,
            !prompt && styles.generateButtonDisabled,
          ]}
          disabled={!prompt}>
          <Sparkles size={20} color="#ffffff" />
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
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 12,
  },
  promptInput: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 140,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'right',
    marginTop: 8,
  },
  examplesScroll: {
    gap: 12,
    paddingRight: 16,
  },
  exampleCard: {
    width: width * 0.7,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  exampleText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  styleCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
  },
  styleCardActive: {
    backgroundColor: '#f8fafc',
  },
  styleIndicator: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginBottom: 12,
  },
  styleName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  styleDescription: {
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
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
  settingSubLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 8,
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  durationButtonActive: {
    backgroundColor: '#3b82f6',
  },
  durationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  durationButtonTextActive: {
    color: '#ffffff',
  },
  aspectButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  aspectButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  aspectButtonActive: {
    backgroundColor: '#3b82f6',
  },
  aspectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  aspectButtonTextActive: {
    color: '#ffffff',
  },
  costCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    gap: 12,
  },
  costInfo: {
    flex: 1,
  },
  costTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4338ca',
    marginBottom: 2,
  },
  costSubtitle: {
    fontSize: 12,
    color: '#6366f1',
  },
  costValue: {
    fontSize: 18,
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
