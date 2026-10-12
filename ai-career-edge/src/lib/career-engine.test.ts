import { describe, expect, it } from 'vitest';
import { generateResume, getProfile, scoreAnswer } from './career-engine';
describe('career simulations', () => {
  it.each(['React Developer', 'Data Analyst', 'UX Designer', 'Marketing Manager', 'Civil Engineer'])('provides exactly three questions for %s', job => { expect(getProfile(job).questions).toHaveLength(3); });
  it('selects technical React questions for a React Developer', () => { expect(getProfile('React Developer').questions[0]?.text).toContain('React'); });
  it('uses the supplied experience without inventing accomplishments', () => { const result = generateResume('Built a React recipe app; Used Git in a university team', 'React Developer'); expect(result.summary).toContain('Built a React recipe app'); expect(result.bullets).toEqual(['Demonstrated relevant experience: Built a React recipe app.', 'Demonstrated relevant experience: Used Git in a university team.']); });
  it('gives an empty answer zero', () => { const q = getProfile('React Developer').questions[0]; if (!q) throw new Error('Missing question'); expect(scoreAnswer('', q).score).toBe(0); });
  it('scores substantive relevant answers above unrelated answers', () => { const q = getProfile('React Developer').questions[0]; if (!q) throw new Error('Missing question'); expect(scoreAnswer('Use local component state for inputs, context for shared settings and a global Zustand store for complex data. Measure render performance because of the tradeoff in complexity.', q).score).toBeGreaterThan(scoreAnswer('I enjoy working hard with people.', q).score); });
});
