import { useState } from 'react';
import { User, Monitor, Server, Brain, Database, Route, Bell } from 'lucide-react';
import { dataFlowSteps, aiPipelineSteps, aiMetrics } from '../data/projectData';
import { DemoBadge } from './StatusBadge';

const iconMap = { User, Monitor, Server, Brain, Database, Route, Bell };

export default function DataFlow() {
  const [simulating, setSimulating] = useState(false);
  const [aiSimulating, setAiSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [aiActiveStep, setAiActiveStep] = useState(-1);

  const runSimulation = () => {
    setSimulating(true);
    setActiveStep(-1);
    dataFlowSteps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), i * 600);
    });
    setTimeout(() => {
      setSimulating(false);
      setActiveStep(-1);
    }, dataFlowSteps.length * 600 + 500);
  };

  const runAiSimulation = () => {
    setAiSimulating(true);
    setAiActiveStep(-1);
    aiPipelineSteps.forEach((_, i) => {
      setTimeout(() => setAiActiveStep(i), i * 500);
    });
    setTimeout(() => {
      setAiSimulating(false);
      setAiActiveStep(-1);
    }, aiPipelineSteps.length * 500 + 500);
  };

  return (
    <div className="space-y-10">
      <div className="plate p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="display text-2xl">System data flow</h3>
            <p className="text-sm text-[var(--text-muted)]">Request lifecycle</p>
          </div>
          <button
            onClick={runSimulation}
            disabled={simulating}
            className="display uppercase tracking-wider text-sm px-4 py-2 border border-[var(--accent)] text-[var(--accent)] disabled:opacity-50"
          >
            {simulating ? 'Simulating' : 'Run simulation'}
          </button>
        </div>

        <div className="flex flex-col items-center gap-1">
          {dataFlowSteps.map((step, i) => {
            const Icon = iconMap[step.icon] || Server;
            const isActive = activeStep >= i;
            const isCurrent = activeStep === i;
            return (
              <div key={step.id} className="flex flex-col items-center w-full max-w-sm">
                <div
                  className="w-full flex items-center gap-3 px-4 py-3 border"
                  style={{
                    borderColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                    background: isCurrent ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                  }}
                >
                  <Icon size={16} className={isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'} />
                  <span className="text-sm">{step.label}</span>
                </div>
                {i < dataFlowSteps.length - 1 && (
                  <div className="h-4 w-px bg-[var(--border-color)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="plate p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="display text-2xl">AI processing pipeline</h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-[var(--text-muted)]">NLP, GCN, DDPG, EvalHarness</p>
              <DemoBadge />
            </div>
          </div>
          <button
            onClick={runAiSimulation}
            disabled={aiSimulating}
            className="display uppercase tracking-wider text-sm px-4 py-2 border border-[var(--accent)] text-[var(--accent)] disabled:opacity-50"
          >
            {aiSimulating ? 'Processing' : 'Run AI pipeline'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {aiPipelineSteps.map((step, i) => {
            const isActive = aiActiveStep >= i;
            return (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className="px-3 py-2 border min-w-[110px] text-center"
                  style={{ borderColor: isActive ? 'var(--accent)' : 'var(--border-color)' }}
                >
                  <p className="text-xs">{step.label}</p>
                  {step.metric && isActive && (
                    <p className="mono text-[10px] text-[var(--accent)] mt-1">{step.metric}</p>
                  )}
                </div>
                {i < aiPipelineSteps.length - 1 && <span className="text-[var(--text-muted)]">/</span>}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { label: 'Model Status', value: aiMetrics.modelStatus },
            { label: 'Confidence', value: aiMetrics.confidence },
            { label: 'Processing Time', value: aiMetrics.processingTime },
          ].map((m) => (
            <div key={m.label} className="text-center p-3 border border-[var(--border-color)]">
              <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{m.label}</p>
              <p className="display text-xl mt-1">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
