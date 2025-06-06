import { useEffect, useRef, useState } from 'react';

interface AudioControls {
  play: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
}

export const useAmbientAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create audio context
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;
        
        // Generate soothing ambient tones
        const sampleRate = audioContext.sampleRate;
        const duration = 30; // 30 second loop
        const bufferSize = sampleRate * duration;
        const buffer = audioContext.createBuffer(2, bufferSize, sampleRate);
        
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
          const channelData = buffer.getChannelData(channel);
          
          for (let i = 0; i < bufferSize; i++) {
            const time = i / sampleRate;
            
            // Create gentle, layered ambient tones
            const fundamental = Math.sin(2 * Math.PI * 110 * time) * 0.08; // A2
            const harmonic1 = Math.sin(2 * Math.PI * 165 * time) * 0.06; // E3
            const harmonic2 = Math.sin(2 * Math.PI * 220 * time) * 0.04; // A3
            
            // Breathing rhythm modulation (5 breaths per minute)
            const breathingRate = 0.083; // ~5 breaths per minute
            const breathingModulation = Math.sin(2 * Math.PI * breathingRate * time) * 0.2 + 0.8;
            
            // Combine tones with breathing modulation
            channelData[i] = (fundamental + harmonic1 + harmonic2) * breathingModulation;
            
            // Smooth fade for looping
            if (i < sampleRate) {
              channelData[i] *= i / sampleRate;
            } else if (i > bufferSize - sampleRate) {
              channelData[i] *= (bufferSize - i) / sampleRate;
            }
          }
        }
        
        // Create gain node for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.connect(audioContext.destination);
        gainNodeRef.current = gainNode;
        
        setIsLoaded(true);
      } catch (error) {
        console.warn('Audio initialization failed:', error);
      }
    };

    initAudio();

    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const play = async () => {
    if (!audioContextRef.current || !gainNodeRef.current || !isLoaded) return;
    
    try {
      // Resume audio context if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Stop any existing source
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      
      // Create new source
      const source = audioContextRef.current.createBufferSource();
      sourceRef.current = source;
      
      // Generate fresh buffer for this session
      const sampleRate = audioContextRef.current.sampleRate;
      const duration = 30;
      const bufferSize = sampleRate * duration;
      const buffer = audioContextRef.current.createBuffer(2, bufferSize, sampleRate);
      
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        
        for (let i = 0; i < bufferSize; i++) {
          const time = i / sampleRate;
          const fundamental = Math.sin(2 * Math.PI * 110 * time) * 0.08;
          const harmonic1 = Math.sin(2 * Math.PI * 165 * time) * 0.06;
          const harmonic2 = Math.sin(2 * Math.PI * 220 * time) * 0.04;
          const breathingModulation = Math.sin(2 * Math.PI * 0.083 * time) * 0.2 + 0.8;
          
          channelData[i] = (fundamental + harmonic1 + harmonic2) * breathingModulation;
          
          if (i < sampleRate) {
            channelData[i] *= i / sampleRate;
          } else if (i > bufferSize - sampleRate) {
            channelData[i] *= (bufferSize - i) / sampleRate;
          }
        }
      }
      
      source.buffer = buffer;
      source.loop = true;
      source.connect(gainNodeRef.current);
      
      // Fade in
      gainNodeRef.current.gain.linearRampToValueAtTime(0.25, audioContextRef.current.currentTime + 3);
      
      source.start();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  };

  const stop = () => {
    if (!gainNodeRef.current || !sourceRef.current) return;
    
    try {
      // Fade out
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 2);
      
      setTimeout(() => {
        if (sourceRef.current) {
          sourceRef.current.stop();
          sourceRef.current = null;
        }
        setIsPlaying(false);
      }, 2000);
    } catch (error) {
      console.warn('Audio stop failed:', error);
    }
  };

  const setVolume = (volume: number) => {
    if (!gainNodeRef.current || !audioContextRef.current) return;
    
    try {
      const clampedVolume = Math.max(0, Math.min(1, volume)) * 0.25;
      gainNodeRef.current.gain.setValueAtTime(clampedVolume, audioContextRef.current.currentTime);
    } catch (error) {
      console.warn('Volume change failed:', error);
    }
  };

  return {
    play,
    stop,
    setVolume,
    isPlaying,
    isLoaded,
  };
};