// Test driver: runs inside the same scope as the game script.
const REALPRINT = globalThis.__stdout;   // -> printerr (test log)
const ORIGPRINT = print;                 // game's DOM print
let CAPTURE = [];
print = function(text, cls){ CAPTURE.push(String(text)); return ORIGPRINT(text, cls); };

let failures = 0, passes = 0;
function check(name, cond, extra){
  if (cond){ passes++; REALPRINT("  PASS  " + name); }
  else { failures++; REALPRINT("  FAIL  " + name + (extra ? "  [" + extra + "]" : "")); }
}

function setup(idx){
  Game.current = MISSIONS[idx];
  Game.state.mission = idx;
  Game.state.completed = {};
  Game.awaitingNext = false;
  busy = false;
  CAPTURE = [];
  $("#ps1").textContent = Game.current.prompt;
}
async function run(line){ CAPTURE = []; await handleInput(line); return CAPTURE.join("\n"); }

async function suite(){
  REALPRINT("\n== tokenizer ==");
  check("tokenize respects quotes",
    JSON.stringify(tokenize('grep -o "a b" f')) === JSON.stringify(["grep","-o","a b","f"]));
  check("tokenize basic",
    JSON.stringify(tokenize("cat users.txt")) === JSON.stringify(["cat","users.txt"]));

  REALPRINT("\n== mission 1: password cracking ==");
  setup(0);
  let o = await run("cat notes.txt");
  check("notes.txt readable", o.indexOf("current year") !== -1, o.slice(0,40));
  o = await run("crack admin");
  check("plain crack fails", o.indexOf("No match") !== -1);
  o = await run("crack admin --rules");
  check("rules crack finds sunshine2024", o.indexOf("sunshine2024") !== -1);
  o = await run("login admin sunshine2024");
  check("login completes mission 1", Game.state.completed.breach === true, o.slice(-60));

  REALPRINT("\n== mission 2: recon ==");
  setup(1);
  o = await run("scan 192.168.1.42");
  check("scan shows ftp port", o.indexOf("vsftpd") !== -1);
  await run("ftp 192.168.1.42 anonymous");
  o = await run("get config.txt");
  check("get downloads config", o.indexOf("Transfer complete") !== -1);
  o = await run("cat config.txt");
  check("config has db creds", o.indexOf("Tr0ub4dor") !== -1);
  check("mission 2 completes", Game.state.completed.recon === true, o.slice(-60));

  REALPRINT("\n== mission 3: log forensics (pipelines) ==");
  setup(2);
  o = await run('grep Failed auth.log | head -n 2');
  check("grep through pipe works", o.indexOf("Failed password") !== -1);
  o = await run('grep -o "[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+" auth.log | sort | uniq -c | sort -nr | head -n 1');
  check("pipeline finds top attacker IP", o.indexOf("203.0.113.45") !== -1, o);
  o = await run("report 203.0.113.45");
  check("report completes mission 3", Game.state.completed.forensics === true, o.slice(-60));

  REALPRINT("\n== mission 4: steganography ==");
  setup(3);
  const meta = MISSIONS[3].commands.exiftool.run(["evidence.jpg"]);
  const comment = meta.find(l => l.indexOf("Comment") === 0).split(":").slice(1).join(":").trim();
  check("exiftool yields base64 comment", comment.length > 40);
  o = await run("base64 -d " + comment);
  check("base64 decodes to FLAG", o.indexOf("FLAG{") !== -1, o.slice(0,40));
  await new Promise(r => setTimeout(r, 600));
  check("decode completes mission 4", Game.state.completed.stego === true, JSON.stringify(Game.state.completed));

  REALPRINT("\n== mission 5: sql injection ==");
  setup(4);
  o = await run('inject admin "\' OR \'1\'=\'1\' -- "');
  check("classic bypass works", o.indexOf("BYPASSED") !== -1, o.slice(0,60));
  o = await run('inject x "\' UNION SELECT 1,2,password FROM users -- "');
  check("union leaks final flag", o.indexOf(FINAL_FLAG) !== -1, o.slice(0,80));
  check("mission 5 completes", Game.state.completed.vault === true);

  REALPRINT("\n== hints & scoring ==");
  setup(0);
  MISSIONS[0].hintsThisMission = 0;
  Game.state.score = 0;
  await run("hint");
  await run("hint");
  o = await run("login admin sunshine2024");
  check("hint penalty applied (1000 -> 800)", Game.state.score === 800, "score=" + Game.state.score);

  REALPRINT("\n== strings & partial flag ==");
  setup(3);
  o = await run("strings recovered.bin");
  check("strings finds partial flag", o.indexOf("m3t4d4t4") !== -1, o.slice(0, 60));

  REALPRINT("\n== victory ==");
  MAX_SCORE = MISSIONS.reduce((s, m) => s + m.points, 0);
  Game.state.completed = {};
  MISSIONS.forEach(m => { Game.state.completed[m.id] = true; });
  Game.state.score = MAX_SCORE;
  CAPTURE = [];
  await Game.victory();
  o = CAPTURE.join("\n");
  check("victory shows final flag", o.indexOf(FINAL_FLAG) !== -1, o.slice(0, 80));
  check("victory shows top rank", o.indexOf("RANGE CHAMPION") !== -1);

  REALPRINT("\n== misc ==");
  setup(0);
  o = await run("help");
  check("help lists crack", o.indexOf("crack") !== -1);
  o = await run("totallybogus");
  check("unknown command errors", o.indexOf("command not found") !== -1);
  o = await run("cat nonexistent.txt");
  check("missing file errors", o.indexOf("No such file") !== -1);
}

const loop = GLib.MainLoop.new(null, false);
suite().then(() => { globalThis.__clearAllTimers(); loop.quit(); })
       .catch(e => { REALPRINT("SUITE ERROR: " + e + "\n" + (e.stack||"")); globalThis.__clearAllTimers(); loop.quit(); });
GLib.timeout_add(GLib.PRIORITY_DEFAULT, 60000, () => { REALPRINT("!! TIMEOUT"); loop.quit(); return GLib.SOURCE_REMOVE; });
loop.run();
REALPRINT("\n========================================");
REALPRINT(failures === 0 ? ("ALL " + passes + " CHECKS PASSED") : (passes + " passed, " + failures + " FAILED"));
REALPRINT("========================================");
