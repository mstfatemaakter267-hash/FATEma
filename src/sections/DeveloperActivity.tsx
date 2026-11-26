import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, ArrowUpRight, BookOpen, Compass, GitCommitHorizontal, Github } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { Terminal } from '../components/Terminal';
import { DEVELOPER_ACTIVITY } from '../data/experience';
import { PROFILE } from '../data/profile';

interface GithubStats {
  publicRepos: number;
  followers: number;
  profileUrl: string;
}

const INTENSITY_CLASSES = [
  'bg-white/[0.05]',
  'bg-[#9F1239]/40',
  'bg-[#9F1239]/60',
  'bg-[#BE123C]/80',
  'bg-[#FB7185]/90',
];

export function DeveloperActivity() {
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);
  const [loadingGithub, setLoadingGithub] = useState(false);

  const githubLink = PROFILE.socialLinks.find((s) => s.id === 'github');
  const configuredUsername = PROFILE.githubUsername.trim();

  useEffect(() => {
    if (!configuredUsername) return;
    let cancelled = false;
    setLoadingGithub(true);

    fetch(`https://api.github.com/users/${encodeURIComponent(configuredUsername)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.public_repos === 'number') {
          setGithubStats({
            publicRepos: data.public_repos,
            followers: data.followers ?? 0,
            profileUrl: data.html_url || `https://github.com/${configuredUsername}`,
          });
        }
      })
      .catch(() => {
        // Fallback silently to sample activity grid
      })
      .finally(() => {
        if (!cancelled) setLoadingGithub(false);
      });

    return () => {
      cancelled = true;
    };
  }, [configuredUsername]);

  return (
    <section id="activity" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          number="06"
          kicker="Developer Life"
          icon={Activity}
          title="Continuous learning, coding habits, and workspace activity."
          subtitle="A snapshot of what I am currently exploring, my UI engineering interests, and an interactive terminal overview."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl glass-card p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-inset text-[#FB7185]">
                    <Github className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F8FAFC]">
                      GitHub Contribution Rhythm
                    </h3>
                    <p className="font-mono text-xs text-[#D2B6BE]">
                      {loadingGithub
                        ? 'Fetching GitHub profile...'
                        : githubStats
                          ? `${githubStats.publicRepos} Public Repos · Live GitHub API`
                          : 'Sample activity grid'}
                    </p>
                  </div>
                </div>

                <a
                  href={githubStats?.profileUrl || githubLink?.href || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl bg-[#9F1239] px-3 py-1.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#BE123C] whitespace-nowrap shrink-0"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div
                className="mt-5 overflow-x-auto pb-1"
                aria-label="Coding contribution intensity heatmap"
              >
                <div className="grid min-w-[320px] grid-cols-12 gap-1.5">
                  {DEVELOPER_ACTIVITY.sampleContributionMatrix.map((week, wIdx) => (
                    <div key={wIdx} className="grid grid-rows-7 gap-1.5">
                      {week.map((level, dIdx) => (
                        <span
                          key={`${wIdx}-${dIdx}`}
                          className={`h-3.5 w-full rounded-[4px] ${
                            INTENSITY_CLASSES[level] ?? INTENSITY_CLASSES[0]
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#D2B6BE]">
                <span className="inline-flex items-center gap-1.5">
                  <GitCommitHorizontal className="h-3.5 w-3.5 text-[#FB7185]" aria-hidden="true" />
                  Consistent daily commits & UI refinements
                </span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  {INTENSITY_CLASSES.map((cls, idx) => (
                    <span
                      key={idx}
                      aria-hidden="true"
                      className={`inline-block h-2.5 w-2.5 rounded-[3px] ${cls}`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl glass-card p-5"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#FB7185]">
                  <BookOpen className="h-4 w-4 text-[#FDA4AF]" aria-hidden="true" />
                  <h3 className="font-display">Currently Exploring</h3>
                </div>
                <ul className="mt-3.5 space-y-2 text-xs leading-relaxed text-[#D2B6BE] sm:text-sm">
                  {DEVELOPER_ACTIVITY.currentlyLearning.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[#FB7185]">
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.06 }}
                className="rounded-2xl glass-card p-5"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#FB7185]">
                  <Compass className="h-4 w-4 text-[#FB7185]" aria-hidden="true" />
                  <h3 className="font-display">Coding Interests</h3>
                </div>
                <ul className="mt-3.5 space-y-2 text-xs leading-relaxed text-[#D2B6BE] sm:text-sm">
                  {DEVELOPER_ACTIVITY.codingInterests.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[#FDA4AF]">
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-col justify-between gap-4 lg:col-span-6"
          >
            <Terminal />

            <div className="rounded-2xl glass-card p-6">
              <p className="font-mono text-xs text-[#FB7185]">Currently Learning Indicator</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-[#F8FAFC]">
                Deepening Frontend TypeScript & Accessible UI Systems
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#D2B6BE]">
                Focused on crafting responsive React applications, clean component abstractions, and smooth accessible browser interactions without backend overhead.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
