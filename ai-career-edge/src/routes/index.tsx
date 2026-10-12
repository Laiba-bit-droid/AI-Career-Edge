import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, AudioLines, Sparkles, FileText, BriefcaseBusiness, Copy, Check, ShieldCheck, GraduationCap, Zap, CircleCheck, Loader2, RotateCcw, Download, Code2, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateResume, getProfile, scoreAnswer, type Question } from '@/lib/career-engine';
import sculpture from '@/assets/career-sculpture.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'AI Career Edge — Your career workspace' },
    { name: 'description', content: 'Upgrade your student resume and practice tailored technical interviews with AI Career Edge’s private, client-side simulations.' },
    { property: 'og:title', content: 'AI Career Edge — Your career workspace' },
    { property: 'og:description', content: 'Turn your experience into professional resume content and build confidence with tailored mock interviews.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: CareerWorkspace,
});

function CareerWorkspace() {
  const [experience, setExperience] = useState('');
  const [job, setJob] = useState('');
  const [resume, setResume] = useState<ReturnType<typeof generateResume> | null>(null);
  const [generating, setGenerating] = useState(false);
  const [starting, setStarting] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [interviewJob, setInterviewJob] = useState('');
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [results, setResults] = useState<ReturnType<typeof scoreAnswer>[] | null>(null);
  const [error, setError] = useState('');
  const [interviewError, setInterviewError] = useState('');
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState('workspace');
  const [notice, setNotice] = useState('');
  const generate = () => {
    if (!experience.trim() || !job.trim()) { setError('Add your experience and a target job title to continue.'); return; }
    setError(''); setGenerating(true);
    const input = experience; const role = job;
    window.setTimeout(() => { setResume(generateResume(input, role)); setGenerating(false); }, 1400);
  };
  const start = () => {
    if (!job.trim()) { setInterviewError('Add a target job title in the Resume Optimizer first.'); return; }
    setInterviewError(''); setStarting(true); const role = job.trim();
    window.setTimeout(() => { setQuestions(getProfile(role).questions); setInterviewJob(role); setAnswers(['', '', '']); setResults(null); setStarting(false); }, 1000);
  };
  const resumeText = resume ? `${resume.job}\n\nPROFESSIONAL SUMMARY\n${resume.summary}\n\nEXPERIENCE HIGHLIGHTS\n${resume.bullets.map(b => `• ${b}`).join('\n')}\n\nSKILLS\n${resume.skills.join(', ')}` : '';
  const copy = async () => { try { await navigator.clipboard.writeText(resumeText); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setNotice('Copy is unavailable in this browser. Use the download button instead.'); } };
  const download = () => { const url = URL.createObjectURL(new Blob([resumeText], { type: 'text/plain' })); const a = document.createElement('a'); a.href = url; a.download = 'AI-Career-Edge-Resume.txt'; a.click(); URL.revokeObjectURL(url); };
  const go = (section: string) => { setActive(section); document.getElementById(section === 'workspace' ? 'workspace' : 'interview')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return <div className="min-h-screen">
    <header className="topbar"><div className="workspace flex h-full items-center justify-between gap-5">
      <a href="/" className="flex items-center gap-3" aria-label="AI Career Edge home"><span className="brand-icon"><ArrowUpRight size={23} strokeWidth={2.5} /></span><div><div className="text-[17px] font-bold">AI Career <span className="text-primary">Edge</span><span className="ml-2 inline-block rounded border border-border px-1.5 py-0.5 align-middle text-[8px] font-medium text-muted-foreground">BETA</span></div><p className="mt-1 text-[10px] text-muted-foreground">Transforming student resumes with AI</p></div></a>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation"><Button variant="ghost" className="nav-link" data-active={active === 'workspace'} onClick={() => go('workspace')}><span>Your workspace</span></Button><Button variant="ghost" className="nav-link" data-active={active === 'interview'} onClick={() => go('interview')}>Mock interview <ArrowUpRight size={13} /></Button></nav>
      <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-[10px] text-muted-foreground sm:flex"><span className="status-dot" />Built for your next chapter</div>
    </div></header>
    <main className="workspace" id="workspace">
      <section className="intro"><img src={sculpture} width={1152} height={576} className="intro-art" alt="Emerald glass steps with an upward silver arrow" /><div className="intro-copy"><div className="eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />YOUR CAREER, A STEP AHEAD</div><h1>Big ambitions. <span className="text-primary">Better beginnings.</span></h1><p className="mt-3 max-w-[560px] text-[13px] leading-7 text-muted-foreground">Turn your experience into a standout resume.<br className="sm:hidden" /> Walk into your next interview with confidence.</p><div className="mt-5 flex items-center gap-4 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-primary" /> Private by design</span><span className="h-3 w-px bg-border" /><span className="flex items-center gap-1.5"><Sparkles size={12} className="text-primary" /> AI-powered practice</span><span className="h-3 w-px bg-border" /><span>No sign-up needed</span></div></div></section>
      <div className="mb-4 flex items-center justify-between"><h2 className="text-[13px] font-semibold">Your career toolkit</h2><span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="status-dot" /> All systems ready</span></div>
      <div className="grid items-start gap-5 lg:grid-cols-[1.08fr_1fr]">
        <section className="panel" aria-labelledby="resume-heading"><div className="panel-heading flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="tool-icon"><FileText size={21} /></div><div><h2 id="resume-heading" className="text-[16px] font-semibold">Resume Optimizer</h2><p className="mt-1 text-[11px] text-muted-foreground">Your experience. A stronger first impression.</p></div></div><span className="shrink-0 rounded-full border border-primary/20 bg-accent px-2.5 py-1 text-[9px] text-primary">AI enhanced</span></div>
          <div className="panel-body"><label htmlFor="experience" className="form-label">Your skills & experience <span className="font-normal text-muted-foreground">*</span></label><Textarea id="experience" className="career-input min-h-[147px] resize-y px-4 py-3" placeholder={'Tell us what you bring to the table...\n\nE.g. Computer science student. Built a weather app with React, worked with REST APIs, and collaborated on a team project using Git.'} value={experience} onChange={e => setExperience(e.target.value)} maxLength={8000} /><div className="mt-2 flex justify-between text-[9px] text-muted-foreground"><span>Projects, coursework, internships — it all counts.</span><span>{experience.length.toLocaleString()} / 8,000</span></div>
            <label htmlFor="job" className="form-label mt-6">Target job title <span className="font-normal text-muted-foreground">*</span></label><div className="relative"><BriefcaseBusiness size={15} className="field-icon" /><Input id="job" className="career-input h-11 pl-10" placeholder="E.g. React Developer" value={job} onChange={e => setJob(e.target.value)} maxLength={100} /></div>
            <p className="mt-2 text-[9px] text-muted-foreground">A specific role makes for a more tailored result.</p>{error && <p role="alert" className="mt-3 text-xs text-destructive">{error}</p>}
            <Button onClick={generate} disabled={generating} className="tool-button mt-6 w-full">{generating ? <Loader2 className="animate-spin" /> : <Sparkles />} {generating ? 'Refining your experience...' : 'Generate AI Resume Content'}{!generating && <ArrowRight className="ml-auto" />}</Button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-muted-foreground"><ShieldCheck size={11} />Your experience stays in this browser.</div>
            <div className="result-region" aria-live="polite"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-[12px] font-semibold"><FileText size={14} className="text-muted-foreground" /> Your optimized content</h3>{resume ? <div className="flex"><Button variant="ghost" size="icon" className="h-7 w-7" title="Copy resume" aria-label="Copy resume" onClick={copy}>{copied ? <Check /> : <Copy />}</Button><Button variant="ghost" size="icon" className="h-7 w-7" title="Download resume" aria-label="Download resume" onClick={download}><Download /></Button></div> : <span className="text-[9px] text-muted-foreground">Ready when you are</span>}</div>
              {resume ? <div className="output-document enter"><div className="mb-5 flex items-center justify-between gap-2"><span className="text-sm font-semibold">{resume.job}</span><CircleCheck className="shrink-0 text-primary" size={16} /></div><h4>Professional summary</h4><p>{resume.summary}</p><h4 className="mt-5">Experience highlights</h4><ul className="list-disc space-y-2 pl-4">{resume.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>{resume.skills.length > 0 && <><h4 className="mt-5">Core skills</h4><div className="flex flex-wrap gap-2">{resume.skills.map(s => <span key={s} className="rounded bg-secondary px-2 py-1 text-[10px] text-foreground">{s}</span>)}</div></>}<p className="mt-5 text-[10px]">Review before applying. Add verified outcomes to strengthen your highlights.</p></div> : <div className="result-placeholder"><div className="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-border bg-card"><FileText size={20} className="text-muted-foreground" /></div><p className="text-[12px] font-medium">Your next opportunity starts here</p><p className="mt-2 max-w-64 text-[10px] leading-5 text-muted-foreground">Add your experience above and let your potential do the talking.</p></div>}
            </div>
          </div></section>
        <section id="interview" className="panel scroll-mt-5" aria-labelledby="interview-heading"><div className="panel-heading flex items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="tool-icon interview"><AudioLines size={22} /></div><div><h2 id="interview-heading" className="text-[16px] font-semibold">Mock Interview Agent</h2><p className="mt-1 text-[11px] text-muted-foreground">A little practice. A lot more confidence.</p></div></div><span className="shrink-0 rounded-full border border-violet/20 bg-violet-soft px-2.5 py-1 text-[9px] text-violet">3 questions</span></div>
          <div className="panel-body">{questions.length === 0 ? <><div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-3 text-[10px]"><BriefcaseBusiness size={14} className="text-muted-foreground" /><span className="text-muted-foreground">Interviewing for</span><span className="ml-auto truncate font-medium">{job.trim() || 'Your next role'}</span></div><div className="interview-empty"><div className="agent-symbol"><AudioLines size={35} strokeWidth={1.4} /></div><h3 className="text-[17px] font-semibold">Meet your practice partner.</h3><p className="mt-3 max-w-72 text-[11px] leading-6 text-muted-foreground">Role-specific questions. Thoughtful feedback.<br />A safe space to find your voice.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><div className="mini-step"><span>1</span>Get questions</div><ChevronRight size={12} className="text-muted-foreground" /><div className="mini-step"><span>2</span>Give it a go</div><ChevronRight size={12} className="text-muted-foreground" /><div className="mini-step"><span>3</span>Get feedback</div></div></div><Button variant="outline" className="tool-button w-full" disabled={starting} onClick={start}>{starting ? <Loader2 className="animate-spin text-violet" /> : <AudioLines className="text-violet" />}{starting ? 'Preparing your interview...' : 'Start AI Mock Interview'}{!starting && <ArrowRight className="ml-auto" />}</Button></> : <div className="enter"><div className="mb-4 flex items-center justify-between gap-3"><span className="text-xs font-semibold">{interviewJob}</span><Button variant="ghost" size="sm" onClick={start} disabled={starting}><RotateCcw size={12} />Restart</Button></div>{results && <div className="mb-5 flex items-center gap-4 rounded-md border border-primary/20 bg-accent p-4" aria-live="polite"><span className="text-3xl font-semibold text-primary">{Math.round(results.reduce((sum, r) => sum + r.score, 0) / 3)}<span className="text-sm">/100</span></span><div><h3 className="text-xs font-semibold">Practice complete</h3><p className="mt-1 text-[10px] text-muted-foreground">Mock concept-coverage score</p></div></div>}{questions.map((q, i) => <div key={q.text} className="question-block"><label htmlFor={`answer-${i}`} className="block text-[12px] font-medium leading-6"><span className="mr-2 text-violet">0{i + 1}</span>{q.text}</label><Textarea id={`answer-${i}`} className="career-input mt-3 min-h-24" placeholder="Walk through your approach..." value={answers[i]} maxLength={5000} onChange={e => { setAnswers(answers.map((a, index) => index === i ? e.target.value : a)); setResults(null); }} />{results && <div className="mt-3 text-[11px] leading-5"><span className="font-semibold text-violet">{results[i]?.score}/100 · </span><span className="text-muted-foreground">{results[i]?.feedback}</span></div>}</div>)}<Button className="tool-button mt-5 w-full" disabled={answers.some(a => !a.trim())} onClick={() => setResults(questions.map((q, i) => scoreAnswer(answers[i] ?? '', q)))}><CircleCheck />Submit Answers<ArrowRight className="ml-auto" /></Button></div>}
            {interviewError && <p role="alert" className="mt-3 text-xs text-destructive">{interviewError}</p>}
            <div className="interview-note"><h4 className="flex items-center gap-2 text-[11px] font-medium"><Sparkles size={13} className="text-violet" />Small practice, real progress</h4><p className="mt-2 text-[10px] leading-6 text-muted-foreground">Every answer is a chance to sharpen your thinking. Focus on your approach, not on being perfect.</p><div className="mt-4 flex items-center gap-2 text-[9px] text-muted-foreground"><Code2 size={12} /> Technical questions<span className="mx-1">·</span><MessageSquare size={12} /> Instant feedback</div></div>
          </div></section>
      </div>
      <section className="feature-row" aria-label="Workspace benefits"><div className="feature-item"><GraduationCap /><div><h3 className="text-[11px] font-semibold">Made for your starting line</h3><p className="mt-1 text-[10px] text-muted-foreground">Student experience. Professional potential.</p></div></div><div className="feature-item"><ShieldCheck /><div><h3 className="text-[11px] font-semibold">Your data stays yours</h3><p className="mt-1 text-[10px] text-muted-foreground">No uploads, no accounts, no worries.</p></div></div><div className="feature-item"><Zap /><div><h3 className="text-[11px] font-semibold">Less overthinking. More doing.</h3><p className="mt-1 text-[10px] text-muted-foreground">A stronger application, one step at a time.</p></div></div></section>
      {notice && <p role="status" className="mb-4 text-xs text-muted-foreground">{notice}</p>}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-6 text-[9px] text-muted-foreground"><span>© 2026 AI Career Edge. Built for what’s next.</span><span className="flex items-center gap-1.5"><Sparkles size={11} />Simulated AI · Real ambition</span></footer>
    </main>
  </div>;
}
