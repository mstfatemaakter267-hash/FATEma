import { useCallback, useRef, useState } from 'react';

export function useSoundEffects() {
  // Disabled by default per specification
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = useCallback(
    (frequency: number, duration = 0.06, gainValue = 0.03) => {
      if (!soundEnabled) return;
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioContextClass) return;

        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          void ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration + 0.01);
      } catch {
        // Ignore audio context restrictions gracefully
      }
    },
    [soundEnabled]
  );

  const playClick = useCallback(() => {
    playTone(520, 0.055, 0.025);
  }, [playTone]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return { soundEnabled, toggleSound, playClick };
}
