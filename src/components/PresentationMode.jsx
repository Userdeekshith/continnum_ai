import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { presentationSteps } from '../data/projectData';

export default function PresentationMode() {
  const {
    presentationMode,
    togglePresentation,
    presentationStep,
    setPresentationStep,
    toggleFullscreen,
  } = useApp();
  const navigate = useNavigate();

  const step = presentationSteps[presentationStep];
  const total = presentationSteps.length;

  const goTo = useCallback(
    (index) => {
      const s = presentationSteps[index];
      if (!s) return;
      setPresentationStep(index);
      navigate(s.route);
      if (s.section) {
        setTimeout(() => {
          document.getElementById(s.section)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    },
    [navigate, setPresentationStep],
  );

  const goNext = useCallback(() => {
    if (presentationStep < total - 1) goTo(presentationStep + 1);
  }, [presentationStep, total, goTo]);

  const goPrev = useCallback(() => {
    if (presentationStep > 0) goTo(presentationStep - 1);
  }, [presentationStep, goTo]);

  useEffect(() => {
    if (!presentationMode) return;
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Escape') {
        togglePresentation();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [presentationMode, goNext, goPrev, togglePresentation]);

  useEffect(() => {
    if (presentationMode && step) {
      navigate(step.route);
      if (step.section) {
        setTimeout(() => {
          document.getElementById(step.section)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [presentationMode]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!presentationMode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto plate px-5 py-3 flex items-center justify-between bg-[var(--bg-elevated)]">
        <button
          onClick={goPrev}
          disabled={presentationStep === 0}
          aria-label="Previous slide"
          className="p-2 disabled:opacity-30 hover:text-[var(--accent)]"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center flex-1 mx-4">
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            Presentation · {presentationStep + 1} / {total}
          </p>
          <h3 className="display text-lg">{step?.title}</h3>
          <p className="text-xs text-[var(--text-muted)]">{step?.description}</p>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={toggleFullscreen} aria-label="Toggle fullscreen" className="p-2 hover:text-[var(--accent)]">
            <Maximize2 size={16} />
          </button>
          <button
            onClick={goNext}
            disabled={presentationStep === total - 1}
            aria-label="Next slide"
            className="p-2 disabled:opacity-30 hover:text-[var(--accent)]"
          >
            <ChevronRight size={20} />
          </button>
          <button onClick={togglePresentation} aria-label="Exit presentation mode" className="p-2 hover:text-[var(--accent)]">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
