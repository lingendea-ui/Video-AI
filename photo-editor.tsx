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
  Download,
  RotateCw,
  Crop,
  Sparkles,
  Contrast,
  Sun,
  Droplet,
  Palette,
  Eraser,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface EditTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export default function PhotoEditorScreen() {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string>(
    'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800'
  );

  const tools: EditTool[] = [
    {
      id: 'crop',
      name: 'Crop',
      icon: <Crop size={20} color="#ffffff" />,
      color: '#3b82f6',
    },
    {
      id: 'rotate',
      name: 'Rotate',
      icon: <RotateCw size={20} color="#ffffff" />,
      color: '#8b5cf6',
    },
    {
      id: 'brightness',
      name: 'Bright',
      icon: <Sun size={20} color="#ffffff" />,
      color: '#f59e0b',
    },
    {
      id: 'contrast',
      name: 'Contrast',
      icon: <Contrast size={20} color="#ffffff" />,
      color: '#06b6d4',
    },
    {
      id: 'saturation',
      name: 'Saturate',
      icon: <Droplet size={20} color="#ffffff" />,
      color: '#10b981',
    },
    {
      id: 'filters',
      name: 'Filters',
      icon: <Palette size={20} color="#ffffff" />,
      color: '#ec4899',
    },
    {
      id: 'enhance',
      name: 'AI Enhance',
      icon: <Sparkles size={20} color="#ffffff" />,
      color: '#6366f1',
    },
    {
      id: 'remove',
      name: 'Remove BG',
      icon: <Eraser size={20} color="#ffffff" />,
      color: '#ef4444',
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
        <Text style={styles.title}>Photo Editor</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <View style={styles.editorContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      </View>

      <View style={styles.toolsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.toolsScroll}>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[
                styles.toolButton,
                selectedTool === tool.id && styles.toolButtonActive,
              ]}
              onPress={() => setSelectedTool(tool.id)}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.toolIconContainer,
                  { backgroundColor: tool.color },
                  selectedTool === tool.id && styles.toolIconActive,
                ]}>
                {tool.icon}
              </View>
              <Text
                style={[
                  styles.toolName,
                  selectedTool === tool.id && styles.toolNameActive,
                ]}>
                {tool.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedTool && (
        <View style={styles.adjustmentPanel}>
          <Text style={styles.adjustmentTitle}>
            {tools.find((t) => t.id === selectedTool)?.name}
          </Text>
          <View style={styles.sliderContainer}>
            <View style={styles.slider} />
          </View>
          <View style={styles.adjustmentButtons}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
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
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width - 32,
    height: height * 0.5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  toolsContainer: {
    backgroundColor: '#1e293b',
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  toolsScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  toolButton: {
    alignItems: 'center',
    gap: 8,
  },
  toolButtonActive: {
    opacity: 1,
  },
  toolIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolIconActive: {
    transform: [{ scale: 1.1 }],
  },
  toolName: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  toolNameActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  adjustmentPanel: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  adjustmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
  },
  slider: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
  },
  adjustmentButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  applyButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
