/* ============================================================
   Cyber Aware - content.js
   Registry for tracks/modules, plus the final assessment bank.
   ============================================================ */
(function (CY) {
  'use strict';

  CY.TRACKS = [];
  CY.track = function (o) { CY.TRACKS.push(o); return o; };

  CY.moduleById = function (id) {
    for (var i = 0; i < CY.TRACKS.length; i++) {
      var t = CY.TRACKS[i];
      for (var j = 0; j < t.modules.length; j++) if (t.modules[j].id === id) return t.modules[j];
    }
    return null;
  };
  CY.trackById = function (id) {
    for (var i = 0; i < CY.TRACKS.length; i++) if (CY.TRACKS[i].id === id) return CY.TRACKS[i];
    return null;
  };
  CY.trackOfModule = function (id) {
    for (var i = 0; i < CY.TRACKS.length; i++) {
      var t = CY.TRACKS[i];
      for (var j = 0; j < t.modules.length; j++) if (t.modules[j].id === id) return t;
    }
    return null;
  };
  CY.coreModules = function () { var t = CY.trackById('core'); return t ? t.modules : []; };
  CY.coreMinutes = function () { var n = 0; CY.coreModules().forEach(function (m) { n += (m.minutes || 4); }); return n; };

  /* ---------- CompTIA Security+ alignment ----------
     This is awareness training, not a certification course, but the
     modules build the same foundational knowledge. Each module is
     tagged with the Security+ (SY0-701) domains it touches. */
  CY.SECPLUS = [
    { n: 1, name: 'General Security Concepts' },
    { n: 2, name: 'Threats, Vulnerabilities & Mitigations' },
    { n: 3, name: 'Security Architecture' },
    { n: 4, name: 'Security Operations' },
    { n: 5, name: 'Security Program Management & Oversight' }
  ];
  CY.SECPLUS_MAP = {
    why: [1, 5], passwords: [1], mfa: [1], phishing: [2, 4], social: [2], browsing: [2, 4],
    data: [5, 1], device: [3, 4], incident: [4], policy: [5],
    crypto: [1], iam: [1, 3], cloud: [3], appsec: [2, 3], vuln: [2], detection: [4]
  };
  CY.spFor = function (id) { return CY.SECPLUS_MAP[id] || []; };
  CY.spName = function (n) { for (var i = 0; i < CY.SECPLUS.length; i++) if (CY.SECPLUS[i].n === n) return CY.SECPLUS[i].name; return ''; };
  CY.spCoverage = function () {
    var counts = {};
    CY.TRACKS.forEach(function (t) { t.modules.forEach(function (m) { CY.spFor(m.id).forEach(function (n) { counts[n] = (counts[n] || 0) + 1; }); }); });
    return counts;
  };
  CY.totalModules = function () { var n = 0; CY.TRACKS.forEach(function (t) { n += t.modules.length; }); return n; };
  CY.totalMinutes = function () { var n = 0; CY.TRACKS.forEach(function (t) { t.modules.forEach(function (m) { n += (m.minutes || 4); }); }); return n; };

  /* ---------- final assessment ---------- */
  CY.ASSESSMENT = {
    id: 'final', title: 'Final Assessment', passPct: 80,
    intro: 'A short check across everything in the core training. You need 80% to earn your certificate. You can retake it as many times as you like.',
    questions: [
      { q: 'The "CIA triad" stands for…', options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Control, Identity, Access', 'Compliance, Insurance, Auditing'], a: 1, why: 'The three core goals of information assurance.' },
      { q: 'Which password is the strongest?', options: ['P@ssw0rd1!', 'Summers2024', 'purple-tractor-singing-moon', 'qwerty123'], a: 2, why: 'A long multi-word passphrase is both strong and memorable.' },
      { q: 'The single best extra step to protect an account is…', options: ['Changing the password monthly', 'Turning on multi-factor authentication', 'Using the same password everywhere', 'Writing it on a sticky note'], a: 1, why: 'MFA blocks attackers who already have your password.' },
      { q: 'An email from your CEO urgently asks you to buy gift cards. You should…', options: ['Buy them quickly to help', 'Reply asking for more detail', 'Verify by another channel and report it', 'Forward it to colleagues'], a: 2, why: 'This is classic CEO-fraud / BEC. Confirm through a known phone number and report it.' },
      { q: 'The safest way to check if a link is genuine is…', options: ['Trust the sender name', 'Hover/read the real domain before the first single slash', 'Click it and see', 'Check the logo'], a: 1, why: 'Displayed link text can differ from where it actually goes.' },
      { q: 'You should classify a customer list containing names and addresses as…', options: ['Public', 'Internal', 'Confidential or Restricted', 'Nothing special'], a: 2, why: 'Personal data is sensitive and often legally protected.' },
      { q: 'A suspicious USB drive is on the floor in the car park. You should…', options: ['Plug it in to find the owner', 'Hand it to security/IT and never plug it in', 'Take it home', 'Leave it'], a: 1, why: 'Drop attacks rely on curiosity; a USB can auto-run malware.' },
      { q: 'Which is the first thing to do if you clicked a phishing link and entered your password?', options: ['Delete the email and forget it', 'Wait and see', 'Change the password and report it immediately', 'Blame IT'], a: 2, why: 'Fast reporting and a password change limit the damage. Never hide it.' },
      { q: 'Using public café Wi-Fi for work is safest when…', options: ['You are quick', 'You use a VPN (or the site is HTTPS and you avoid sensitive tasks)', 'It is free', 'Nobody is watching'], a: 1, why: 'A VPN shields your traffic from others on the network.' },
      { q: 'Ransomware mainly attacks which part of the CIA triad?', options: ['Confidentiality', 'Integrity and Availability', 'Only Confidentiality', 'None'], a: 1, why: 'Files are encrypted (availability) and can be altered (integrity).' },
      { q: 'MFA using SMS codes is weaker than an app or hardware key because…', options: ['SMS is slow', 'SMS can be intercepted or SIM-swapped', 'It costs money', 'It is not weaker'], a: 1, why: 'SIM-swap and interception attacks target SMS.' },
      { q: 'Software updates matter because they…', options: ['Add features only', 'Patch known security holes attackers actively exploit', 'Slow the device', 'Are optional'], a: 1, why: 'Unpatched known vulnerabilities are the most common way in.' },
      { q: 'The right response to social engineering is to…', options: ['Be helpful and give what is asked', 'Verify identity through an independent channel, then follow policy', 'Ignore all requests forever', 'Forward the details'], a: 1, why: 'Verify, then act. Attackers count on politeness and urgency.' },
      { q: 'A good rule for sharing work data is…', options: ['Share to anyone who asks', 'Share on a need-to-know basis with the right classification', 'Email it to your personal account', 'Post it in a public channel'], a: 1, why: 'Least privilege and correct classification protect the data.' },
      { q: 'If you are unsure whether an email is a phish, the best move is…', options: ['Guess', 'Report it using the report button and let IT check', 'Reply asking "is this you?"', 'Open the attachment to look'], a: 1, why: 'Reporting is always safe and helps protect everyone.' }
    ]
  };

  /* ---------- helper for lesson blocks ---------- */
  CY._vizQueue = [];
  CY.renderBlock = function (b) {
    var t = b[0], v = b[1];
    switch (t) {
      case 'p': return '<p>' + CY.m(v) + '</p>';
      case 'list': return '<ul class="lesson-list">' + v.map(function (x) { return '<li>' + CY.m(x) + '</li>'; }).join('') + '</ul>';
      case 'note': return '<div class="callout note">' + CY.m(v) + '</div>';
      case 'warn': return '<div class="callout warn">&#9888;&#65039; ' + CY.m(v) + '</div>';
      case 'tip': return '<div class="callout tip">&#128161; ' + CY.m(v) + '</div>';
      case 'danger': return '<div class="callout danger">&#128680; ' + CY.m(v) + '</div>';
      case 'code': return CY.code(v);
      case 'table': return '<div class="tablewrap"><table class="lesson-table"><thead><tr>' + v.head.map(function (h) { return '<th>' + CY.m(h) + '</th>'; }).join('') + '</tr></thead><tbody>' + v.rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + CY.m(x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      case 'email': return CY.emailHTML(v);
      case 'do': return '<div class="do-list"><h4>&#9989; Do this</h4><ul>' + v.map(function (x) { return '<li>' + CY.m(x) + '</li>'; }).join('') + '</ul></div>';
      case 'dont': return '<div class="dont-list"><h4>&#10060; Avoid this</h4><ul>' + v.map(function (x) { return '<li>' + CY.m(x) + '</li>'; }).join('') + '</ul></div>';
      case 'viz': CY._vizQueue.push({ name: v, opts: b[2] || {} }); return '<div class="viz-host" data-viz-idx="' + (CY._vizQueue.length - 1) + '"></div>';
      default: return '';
    }
  };
})(window.CY);
