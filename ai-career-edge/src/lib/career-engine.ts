export type Question = { text: string; concepts: string[][]; hint: string };
export type Profile = { label: string; focus: string; questions: Question[] };
const question = (text: string, concepts: string[][], hint: string): Question => ({ text, concepts, hint });
const profiles: Record<'react' | 'data' | 'design' | 'marketing' | 'general', Profile> = {
  react: { label: 'Frontend development', focus: 'accessible interfaces, reusable components, and maintainable frontend code', questions: [
    question('How do you decide between local state, Context, and a global state library in a React application?', [['local', 'component'], ['context', 'shared'], ['global', 'redux', 'zustand'], ['tradeoff', 'trade-off', 'render', 'complexity']], 'Explain state ownership, sharing, and the performance trade-offs. Give a concrete example.'),
    question('A React page feels slow. How would you diagnose and improve its rendering performance?', [['profiler', 'measure', 'devtools'], ['memo', 'callback', 'virtual'], ['render', 'state'], ['example', 'because', 'tradeoff']], 'Start with measurement, identify unnecessary renders, and explain when memoization helps.'),
    question('How would you build a reliable form that submits data to an API?', [['valid', 'schema'], ['loading', 'pending', 'disable'], ['error', 'catch', 'retry'], ['label', 'accessible', 'accessibility']], 'Cover validation, loading and error states, and accessible labels.') ] },
  data: { label: 'Data & Python', focus: 'analytical problem-solving, reliable data workflows, and clear communication of insights', questions: [
    question('How would you clean a dataset with missing values, duplicates, and outliers?', [['missing', 'null', 'imput'], ['duplicate', 'dedup'], ['outlier', 'distribution'], ['validate', 'check', 'example']], 'Discuss inspection, missing-value strategies, deduplication, and validation.'),
    question('How would you detect and prevent overfitting in a machine learning model?', [['train', 'test'], ['cross', 'validation'], ['regular', 'simpl', 'prun'], ['metric', 'loss', 'accuracy']], 'Compare training and validation performance, cross-validation, and regularization.'),
    question('Explain a SQL JOIN and how you would avoid double-counting in an analysis.', [['inner', 'left'], ['key', 'relationship'], ['duplicate', 'many'], ['aggregate', 'group', 'distinct']], 'Explain join types, key cardinality, and how aggregation affects the result.') ] },
  design: { label: 'Product design', focus: 'user-centered thinking, accessible experiences, and thoughtful design decisions', questions: [
    question('How would you turn an ambiguous user problem into a testable design hypothesis?', [['research', 'interview'], ['problem', 'need'], ['hypothesis', 'assumption'], ['test', 'success', 'metric']], 'Connect user research to a specific hypothesis and a measurable test.'),
    question('How do you evaluate the accessibility of a new interface?', [['contrast', 'color'], ['keyboard', 'focus'], ['screen reader', 'label'], ['wcag', 'test']], 'Cover contrast, keyboard navigation, screen readers, and accessibility testing.'),
    question('How would you validate a prototype and decide what to change?', [['usability', 'test'], ['task', 'user'], ['feedback', 'observe'], ['iterate', 'priorit', 'metric']], 'Describe realistic tasks, observations, and how you prioritize changes.') ] },
  marketing: { label: 'Marketing & growth', focus: 'audience insights, thoughtful campaigns, and measurable business outcomes', questions: [
    question('How would you measure whether a digital campaign is successful?', [['goal', 'objective'], ['conversion', 'ctr'], ['cost', 'roi', 'roas'], ['baseline', 'attribution', 'compare']], 'Connect objectives to conversion metrics, cost efficiency, and attribution.'),
    question('How would you structure an A/B test for a landing page?', [['hypothesis', 'variable'], ['random', 'split'], ['sample', 'signific'], ['conversion', 'metric']], 'Discuss a single hypothesis, random assignment, sample size, and a primary metric.'),
    question('How would you use audience research to create a content strategy?', [['research', 'interview'], ['segment', 'persona'], ['channel', 'content'], ['measure', 'iterate', 'engagement']], 'Link audience research to segmentation, channel choice, and measurement.') ] },
  general: { label: 'Professional skills', focus: 'structured problem-solving, collaboration, and clear communication', questions: [
    question('How would you break down a complex project with an unfamiliar technical requirement?', [['requirement', 'clarif'], ['break', 'task'], ['research', 'prototype'], ['test', 'validate']], 'Explain how you clarify requirements, break down work, research, and validate.'),
    question('How would you investigate an unexpected failure in your work or a system?', [['reproduce', 'evidence'], ['cause', 'hypothesis'], ['test', 'isolate'], ['prevent', 'document']], 'Use evidence, isolate the cause, test a fix, and prevent recurrence.'),
    question('How do you evaluate two possible solutions with different trade-offs?', [['criteria', 'requirement'], ['cost', 'time'], ['risk', 'trade'], ['test', 'measure', 'evidence']], 'Define criteria and compare cost, risk, and measurable evidence.') ] },
};
export function getProfile(job: string): Profile {
  if (/react|front.?end|javascript|typescript|web dev|full.?stack/i.test(job)) return profiles.react;
  if (/python|data|machine learning|sql|analyst/i.test(job)) return profiles.data;
  if (/design|ux|ui\b/i.test(job)) return profiles.design;
  if (/market|growth|content|seo/i.test(job)) return profiles.marketing;
  return profiles.general;
}
export function generateResume(experience: string, job: string) {
  const profile = getProfile(job);
  const facts = experience.split(/[\n;]+|(?<=[.!?])\s+/).map(s => s.replace(/^[-•]\s*/, '').trim()).filter(Boolean);
  const skills = ['React', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'Figma', 'HTML', 'CSS', 'Git', 'Excel', 'Node.js', 'Tailwind', 'Java', 'C++'].filter(skill => experience.toLowerCase().includes(skill.toLowerCase()));
  const evidence = facts[0]?.replace(/[.!?]+$/, '') || experience.trim();
  return {
    job: job.trim(),
    summary: `Emerging ${job.trim()} with a foundation in ${skills.length ? skills.join(', ') : profile.label.toLowerCase()}. Experience includes: ${evidence}. Seeking to contribute to ${profile.focus}.`,
    bullets: facts.slice(0, 5).map(f => `Demonstrated relevant experience: ${f.replace(/[.!?]+$/, '')}.`),
    skills,
    focus: profile.focus,
  };
}
export function scoreAnswer(answer: string, q: Question) {
  const lower = answer.toLowerCase();
  const words = lower.match(/\b[\w'-]+\b/g) ?? [];
  const matches = q.concepts.filter(group => group.some(term => lower.includes(term))).length;
  const score = words.length === 0 ? 0 : Math.min(100, Math.round(matches / q.concepts.length * 80 + Math.min(new Set(words).size / 40, 1) * 20));
  return { score, feedback: score >= 80 ? 'Strong coverage of the key concepts. Add a concrete project example and explain the trade-offs to strengthen your answer.' : score >= 45 ? `A promising start. Make your reasoning more specific. ${q.hint}` : `Your answer needs more technical detail. ${q.hint}` };
}
