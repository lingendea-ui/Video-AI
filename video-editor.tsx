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
  Play,
  Pause,
  Scissors,
  Volume2,
  Music,
  Type,
  Layers,
  Download,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface TimelineClip {
  id: string;
  type: 'video' | 'audio' | 'text';
  start: number;
  duration: number;
  color: string;
}

export default function VideoEditorScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const clips: TimelineClip[] = [
    { id: '1', type: 'video', start: 0, duration: 120, color: '#3b82f6' },
    { id: '2', type: 'video', start: 120, duration: 80, color: '#8b5cf6' },
    { id: '3', type: 'audio', start: 0, duration: 200, color: '#10b981' },
    { id: '4', type: 'text', start: 30, duration: 60, color: '#f59e0b' },
  ];

  const tools = [
    { id: 'split', icon: <Scissors size={20} color="#ffffff" />, label: 'Split' },
    { id: 'audio', icon: <Volume2 size={20} color="#ffffff" />, label: 'Audio' },
    { id: 'music', icon: <Music size={20} color="#ffffff" />, label: 'Music' },
    { id: 'text', icon: <Type size={20} color="#ffffff" />, label: 'Text' },
    { id: 'effects', icon: <Layers size={20} color="#ffffff" />, label: 'Effects' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Video Editor</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <View style={styles.previewContainer}>
        <View style={styles.videoPreview}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={48} color="#ffffff" />
            ) : (
              <Play size={48} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.timestamp}>
          {Math.floor(currentTime / 60)}:
          {(currentTime % 60).toString().padStart(2, '0')} / 3:20
        </Text>
      </View>

      <View style={styles.timelineContainer}>
        <Text style={styles.timelineTitle}>Timeline</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.timelineScroll}>
          <View style={styles.timeline}>
            <View style={styles.timelineRuler}>
              {[0, 30, 60, 90, 120, 150, 180].map((time) => (
                <View key={time} style={styles.timeMarker}>
                  <View style={styles.timeTick} />
                  <Text style={styles.timeLabel}>
                    {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.tracks}>
              <View style={styles.track}>
                <Text style={styles.trackLabel}>Video</Text>
                <View style={styles.trackContent}>
                  {clips
                    .filter((c) => c.type === 'video')
                    .map((clip) => (
                      <View
                        key={clip.id}
                        style={[
                          styles.clip,
                          {
                            left: clip.start * 2,
                            width: clip.duration * 2,
                            backgroundColor: clip.color,
                          },
                        ]}
                      />
                    ))}
                </View>
              </View>

              <View style={styles.track}>
                <Text style={styles.trackLabel}>Audio</Text>
                <View style={styles.trackContent}>
                  {clips
                    .filter((c) => c.type === 'audio')
                    .map((clip) => (
                      <View
                        key={clip.id}
                        style={[
                          styles.clip,
                          {
                            left: clip.start * 2,
                            width: clip.duration * 2,
                            backgroundColor: clip.color,
                          },
                        ]}
                      />
                    ))}
                </View>
              </View>

              <View style={styles.track}>
                <Text style={styles.trackLabel}>Text</Text>
                <View style={styles.trackContent}>
                  {clips
                    .filter((c) => c.type === 'text')
                    .map((clip) => (
                      <View
                        key={clip.id}
                        style={[
                          styles.clip,
                          {
                            left: clip.start * 2,
                            width: clip.duration * 2,
                            backgroundColor: clip.color,
                          },
                        ]}
                      />
                    ))}
                </View>
              </View>
            </View>

            <View
              style={[styles.playhead, { left: currentTime * 2 }]}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.toolsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.toolsScroll}>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={styles.toolButton}
              activeOpacity={0.7}>
              <View style={styles.toolIcon}>{tool.icon}</View>
              <Text style={styles.toolLabel}>{tool.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  previewContainer: {
    padding: 16,
  },
  videoPreview: {
    width: width - 32,
    height: (width - 32) * 0.5625,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 12,
  },
  timelineContainer: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  timelineScroll: {
    flex: 1,
  },
  timeline: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    position: 'relative',
  },
  timelineRuler: {
    flexDirection: 'row',
    height: 30,
    marginBottom: 8,
  },
  timeMarker: {
    width: 60,
    alignItems: 'center',
  },
  timeTick: {
    width: 1,
    height: 8,
    backgroundColor: '#475569',
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  tracks: {
    gap: 12,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    width: 60,
  },
  trackContent: {
    flex: 1,
    height: 48,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    position: 'relative',
  },
  clip: {
    position: 'absolute',
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  playhead: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#ef4444',
  },
  toolsContainer: {
    backgroundColor: '#1e293b',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  toolsScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  toolButton: {
    alignItems: 'center',
    gap: 8,
  },
  toolIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
});
