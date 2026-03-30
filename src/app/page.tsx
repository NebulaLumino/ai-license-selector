'use client';
import { useState } from 'react';

const PROJECT_TYPES = [
  'Open Source Library / Framework',
  'SaaS Application',
  'Mobile App',
  'Enterprise Software',
  'Developer Tool / CLI',
  'AI / ML Model',
  'Data Pipeline / Infrastructure',
  'Creative Work (content, assets, docs)',
  'Hardware / Firmware',
  'Educational / Tutorial Material',
];

const COMMERCIAL_USE = [
  'Permitted — I may commercialize or sell this',
  'Not permitted — purely non-commercial use',
  'Mixed — some commercial, some not',
  'Undecided / Depends on context',
];

const DISTRIBUTION_TYPES = [
  'Public open source (GitHub, PyPI, npm, etc.)',
  'Private / Internal company project',
  'Client / Freelance deliverable',
  'Freemium product with open core',
  'Educational / Research distribution',
];

const ATTRIBUTION_REQUIRMENTS = [
  'Required — users must credit my work',
  'Preferred but not legally required',
  'Not required — I want maximum freedom',
  'Share-alike required — derivatives must use same license',
  'No derivatives allowed — no modifications permitted',
];

export default function LicenseSelectorPage() {
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [commercial, setCommercial] = useState(COMMERCIAL_USE[0]);
  const [distribution, setDistribution] = useState(DISTRIBUTION_TYPES[0]);
  const [attribution, setAttribution] = useState(ATTRIBUTION_REQUIRMENTS[0]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectType, commercial, distribution, attribution }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text text-transparent">
          📜 AI License Selector
        </h1>
        <p className="text-gray-400 mb-8">
          Answer a few questions and get an AI-powered open source license recommendation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Project Type</label>
            <select
              value={projectType}
              onChange={e => setProjectType(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-violet-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500"
            >
              {PROJECT_TYPES.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Commercial Use</label>
            <select
              value={commercial}
              onChange={e => setCommercial(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-violet-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500"
            >
              {COMMERCIAL_USE.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Distribution Type</label>
            <select
              value={distribution}
              onChange={e => setDistribution(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-violet-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500"
            >
              {DISTRIBUTION_TYPES.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Attribution Requirement</label>
            <select
              value={attribution}
              onChange={e => setAttribution(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-violet-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500"
            >
              {ATTRIBUTION_REQUIRMENTS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 text-white font-semibold py-4 rounded-xl transition-all mb-8"
        >
          {loading ? '📜 Analyzing License Options...' : '✨ Get License Recommendation'}
        </button>

        {error && (
          <div className="bg-red-900/40 border border-red-500/50 rounded-xl p-4 text-red-300 mb-6">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-[#111827] border border-violet-500/30 rounded-2xl p-8">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
