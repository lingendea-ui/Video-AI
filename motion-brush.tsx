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
  Paintbrush,
  RotateCcw,
  Play,
  ArrowRight,
  ArrowUp,
  RotateCw,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface BrushDirection {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export default function MotionBrushScreen() {
  const router = useRouter();
  const [sourceImage, setSourceImage] = useState<string>(
    'https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=800'
  );
  const [selectedBrush, setSelectedBrush] = useState<string>('right');
  const [brushSize, setBrushSize] = useState(50);
  const [motionStrength, setMotionStrength] = useState(70);

  const brushDirections: BrushDirection[] = [
    {
      id: 'right',
      name: 'Right',
      icon: <ArrowRight size={20} color="#ffffff" />,
      color: '#3b82f6',
    },
    {
      id: 'left',
      name: 'Left',
      icon: <ArrowRight size={20} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />,
      color: '#8b5cf6',
    },
    {
      id: 'up',
      name: 'Up',
      icon: <ArrowUp size={20} color="#ffffff" />,
      color: '#10b981',
    },
    {
      id: 'down',
      name: 'Down',
      icon: <ArrowUp size={20} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />,
      color: '#f59e0b',
    },
    {
      id: 'clockwise',
      name: 'Rotate CW',
      icon: <RotateCw size={20} color="#ffffff" />,
      color: '#ec4899',
    },
    {
      id: 'counter',
      name: 'Rotate CCW',
      icon: <RotateCcw size={20} color="#ffffff" />,
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
        <Text style={styles.title}>Motion Brush</Text>
        <TouchableOpacity style={styles.undoButton}>
          <RotateCcw size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <View style={styles.canvasContainer}>
        <View style={styles.canvas}>
          <Image source={{ uri: sourceImage }} style={styles.image} />
          <View style={styles.canvasOverlay}>
            <TouchableOpacity style={styles.uploadOverlayButton}>
              <Upload size={24} color="#ffffff" />
              <Text style={styles.uploadOverlayText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.canvasHint}>
          <Paintbrush size={16} color="#64748b" />
          <Text style={styles.canvasHintText}>
            Paint motion directions on the image
          </Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Brush Direction</Text>
            <View style={styles.brushGrid}>
              {brushDirections.map((brush) => (
                <TouchableOpacity
                  key={brush.id}
                  style={[
                    styles.brushButton,
                    selectedBrush === brush.id && styles.brushButtonActive,
                    { borderColor: selectedBrush === brush.id ? brush.color : '#e5e7eb' },
                  ]}
                  onPress={() => setSelectedBrush(brush.id)}
                  activeOpacity={0.7}>
                  <View
                    style={[
                      styles.brushIcon,
                      { backgroundColor: brush.color },
                    ]}>
                    {brush.icon}
                  </View>
                  <Text style={styles.brushName}>{brush.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Brush Settings</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Brush Size</Text>
                  <Text style={styles.settingValue}>{brushSize}px</Text>
                </View>
              </View>
              <View style={styles.slider}>
                <View style={[styles.sliderFill, { width: `${brushSize}%` }]} />
                <View
                  style={[styles.sliderThumb, { left: `${brushSize}%` }]}
                />
              </View>

              <View style={styles.settingDivider} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Motion Strength</Text>
                  <Text style={styles.settingValue}>{motionStrength}%</Text>
                </View>
              </View>
              <View style={styles.slider}>
                <View
                  style={[styles.sliderFill, { width: `${motionStrength}%` }]}
                />
                <View
                  style={[
                    styles.sliderThumb,
                    { left: `${motionStrength}%` },
                  ]}
                />
              </View>

              <View style={styles.settingDivider} />

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Duration</Text>
                <View style={styles.durationButtons}>
                  {[3, 5, 10].map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[
                        styles.durationButton,
                        d === 5 && styles.durationButtonActive,
                      ]}>
                      <Text
                        style={[
                          styles.durationButtonText,
                          d === 5 && styles.durationButtonTextActive,
                        ]}>
                        {d}s
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipText}>
              Use different motion directions on different parts of your image
              to create complex, realistic animations. For example, make clouds
              move right while leaves sway up and down.
            </Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.clearButton}>
          <RotateCcw size={18} color="#ef4444" />
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generateButton}>
          <Play size={20} color="#ffffff" />
          <Text style={styles.generateButtonText}>Generate</Text>
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
  undoButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasContainer: {
    backgroundColor: '#0f172a',
    padding: 16,
  },
  canvas: {
    width: '100%',
    height: width * 0.75,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  canvasOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadOverlayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  uploadOverlayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  canvasHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  canvasHintText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  controlsContainer: {
    flex: 1,
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
  brushGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  brushButton: {
    width: (width - 56) / 3,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    gap: 8,
  },
  brushButtonActive: {
    backgroundColor: '#f8fafc',
  },
  brushIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brushName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
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
    marginBottom: 8,
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
  slider: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    marginLeft: -10,
    borderWidth: 3,
    borderColor: '#ffffff',
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
  tipCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#b45309',
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  clearButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#fee2e2',
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
  },
  generateButton: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#3b82f6',
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
