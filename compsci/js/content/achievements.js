/* =========================================================================
 * content/achievements.js — badges that reward good habits, not just speed.
 * ========================================================================= */

export const ACHIEVEMENTS = [
  { id: 'first-command', title: 'Hello, Terminal', desc: 'Run your very first command.', xp: 25, icon: '▶', check: (s) => s.commandsRun >= 1 },
  { id: 'ten-commands', title: 'Warming Up', desc: 'Run 10 commands.', xp: 25, icon: '▶', check: (s) => s.commandsRun >= 10 },
  { id: 'hundred-commands', title: 'Shell Dweller', desc: 'Run 100 commands.', xp: 100, icon: '▶', check: (s) => s.commandsRun >= 100 },
  { id: 'thousand-commands', title: 'Terminal Native', desc: 'Run 1000 commands.', xp: 250, icon: '▶', check: (s) => s.commandsRun >= 1000 },
  { id: 'pipe-queen', title: 'Plumbing', desc: 'Use a pipeline | three times.', xp: 50, icon: '│', check: (s) => (s.commands || []).filter((c) => c.includes('|')).length >= 3 },
  { id: 'grep-master', title: 'Needle In A Haystack', desc: 'Use grep ten times.', xp: 75, icon: '⌕', check: (s) => (s.commands || []).filter((c) => /\bgrep\b/.test(c)).length >= 10 },
  { id: 'permission-plumber', title: 'Permission Granted', desc: 'Run your first sudo command.', xp: 75, icon: '🔑', check: (s) => (s.commands || []).some((c) => /^\s*sudo\b/.test(c)) },
  { id: 'script-runner', title: 'Automate Everything', desc: 'Run a script you wrote.', xp: 75, icon: '⚙', check: (s) => (s.commands || []).some((c) => /\.\/[\w-]+\.sh/.test(c)) },
  { id: 'pipe-of-seven', title: 'Unix Philosopher', desc: 'Write a pipeline with five stages.', xp: 150, icon: '⑦', check: (s) => (s.commands || []).some((c) => c.split('|').length >= 6) },
  { id: 'first-chapter', title: 'Chapter One Done', desc: 'Finish chapter 1.', xp: 100, icon: '★', check: (s) => s.missionsDone.some((m) => m.chapter === 1) },
  { id: 'five-missions', title: 'Getting Somewhere', desc: 'Complete 5 missions.', xp: 100, icon: '★', check: (s) => s.missionsDone.length >= 5 },
  { id: 'half-way', title: 'Halfway There', desc: 'Complete 15 missions.', xp: 250, icon: '★', check: (s) => s.missionsDone.length >= 15 },
  { id: 'all-missions', title: 'Zero To Hero', desc: 'Complete every mission.', xp: 500, icon: '★', check: (s) => s.missionsDone.length >= 34 },
  { id: 'first-ctf', title: 'Flag Finder', desc: 'Solve your first CTF challenge.', xp: 100, icon: '⚑', check: (s) => (s.ctfSolved || []).length >= 1 },
  { id: 'ctf-trio', title: 'Hacker Mindset', desc: 'Solve 3 CTF challenges.', xp: 200, icon: '⚑', check: (s) => (s.ctfSolved || []).length >= 3 },
  { id: 'ctf-all', title: 'Capture Them All', desc: 'Solve every CTF challenge.', xp: 400, icon: '⚑', check: (s) => (s.ctfSolved || []).length >= 6 },
  { id: 'first-code', title: 'Hello, World', desc: 'Pass your first Code Lab test.', xp: 100, icon: '{ }', check: (s) => (s.labsSolved || []).length >= 1 },
  { id: 'five-code', title: 'Debugger', desc: 'Solve 5 coding exercises.', xp: 200, icon: '{ }', check: (s) => (s.labsSolved || []).length >= 5 },
  { id: 'all-code', title: 'Algorithm Adept', desc: 'Solve every coding exercise.', xp: 400, icon: '{ }', check: (s) => (s.labsSolved || []).length >= 12 },
  { id: 'powershell-pro', title: 'Blue Screen Wizard', desc: 'Use ten PowerShell cmdlets.', xp: 150, icon: 'W', check: (s) => (s.commands || []).filter((c) => /Get-|Set-|New-|Remove-|Select-|Where-|ForEach-|Sort-/.test(c)).length >= 10 },
  { id: 'scanner', title: 'Port Knocker', desc: 'Run nmap against a lab machine.', xp: 100, icon: '⌁', check: (s) => (s.commands || []).some((c) => /\bnmap\b/.test(c)) },
  { id: 'ethical', title: 'Read the Rules', desc: 'Finish the responsible-disclosure mission.', xp: 150, icon: '⚖', check: (s) => (s.missionsDone || []).some((m) => m.id === 'responsible-disclosure') },
  { id: 'level-5', title: 'Level 5', desc: 'Reach level 5.', xp: 100, icon: '5', check: (s) => levelForXp(s.xp || 0) >= 5 },
  { id: 'level-10', title: 'Level 10', desc: 'Reach level 10.', xp: 300, icon: '10', check: (s) => levelForXp(s.xp || 0) >= 10 },
];

/** XP needed to reach a given level: level n needs 250 * (n-1)^1.35 total XP. */
export function xpForLevel(level) {
  return Math.floor(250 * Math.pow(Math.max(0, level - 1), 1.35));
}

export function levelForXp(xp) {
  let level = 1;
  while (level < 50 && xp >= xpForLevel(level + 1)) level++;
  return level;
}

export function levelProgress(xp) {
  const level = levelForXp(xp);
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const pct = next === base ? 0 : ((xp - base) / (next - base)) * 100;
  return { level, base, next, pct: Math.max(0, Math.min(100, pct)), toNext: Math.max(0, next - xp) };
}

/** Returns the achievements newly unlocked by this state. */
export function evaluateAchievements(state, already = []) {
  const have = new Set(already);
  const fresh = [];
  for (const a of ACHIEVEMENTS) {
    if (have.has(a.id)) continue;
    let ok = false;
    try { ok = !!a.check(state); } catch { ok = false; }
    if (ok) fresh.push(a);
  }
  return fresh;
}