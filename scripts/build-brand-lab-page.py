#!/usr/bin/env python3
"""Build out/brand-lab/brand-lab.html from src/brand-lab/samples.tsx plus the
remotion-reel storyboard review kit. Run after scripts/render-brand-lab.mjs."""
import html, re, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "src/brand-lab/samples.tsx").read_text()
kit = (root / ".claude/skills/remotion-reel/components/storyboard-review.html").read_text()
pat = re.compile(r'\{ n: (\d+), group: "([^"]+)", title: "([^"]+)", note: "([^"]+)", frames: (\d+)')
samples = [dict(n=int(a), group=b, title=c, note=d, frames=int(e)) for a, b, c, d, e in pat.findall(src)]
assert len(samples) == 20, len(samples)

DECIDES = {
    "Captions": "Your default caption style in BRAND.md.",
    "Hooks": "Your default on-screen hook.",
    "Title type": "How headlines and title cards move.",
    "Data": "How numbers and lists are shown.",
    "Explain": "How processes and screenshots are explained.",
    "Transitions": "How the reel moves from your face to a graphic.",
    "Lower third": "Name and role on screen.",
    "CTA": "How videos end.",
}

cards, last = [], None
for s in samples:
    if s["group"] != last:
        last = s["group"]
        cards.append(f'<div class="group"><h2>{html.escape(last)}</h2><p>{html.escape(DECIDES[last])}</p></div>')
    n2 = f'{s["n"]:02d}'
    secs = s["frames"] / 30
    cards.append(f'''<article class="beat" id="s{n2}">
  <div class="clip"><video src="clips/sample{n2}.mp4" poster="clips/sample{n2}.jpg" muted loop playsinline autoplay preload="metadata" aria-label="Sample {s["n"]}: {html.escape(s["title"])}"></video></div>
  <div class="info">
    <div class="meta"><span class="bnum">{s["n"]}</span><span class="tag">{html.escape(s["group"])}</span><span class="dur">{secs:.1f}s</span></div>
    <h3>{html.escape(s["title"])}</h3>
    <p class="note">{html.escape(s["note"])}</p>
  </div>
</article>''')

page = f'''<title>Brand Lab</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
<style>
/* Layout: blueprint paper; a header like the site's, then a card grid of 9:16 clips grouped by what each group decides. */
:root {{
  --bg: #ffffff; --surface: #ffffff; --fg: #21170f; --muted: #62544a;
  --accent: #c4470a; --accent-deep: #a93b06; --line: #e8b596; --rule: #f0dccf;
  --grid-minor: rgba(196,71,10,.06); --grid-major: rgba(196,71,10,.15); --tag-bg: rgba(196,71,10,.08);
  --clip-bg: #1f1610; --shadow: 0 10px 28px rgba(33,23,15,.12);
  --body: "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif;
  --hand: "Architects Daughter", "Comic Sans MS", "Segoe Print", cursive;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
  --bg: #1a130e; --surface: #231a14; --fg: #f6ede6; --muted: #bfaa9b;
  --accent: #e0662a; --accent-deep: #f08a52; --line: #5a3a26; --rule: #3a2a1f;
  --grid-minor: rgba(224,102,42,.07); --grid-major: rgba(224,102,42,.16); --tag-bg: rgba(224,102,42,.14);
  --clip-bg: #0f0a07; --shadow: 0 10px 28px rgba(0,0,0,.45); color-scheme: dark; }} }}
:root[data-theme="dark"] {{
  --bg: #1a130e; --surface: #231a14; --fg: #f6ede6; --muted: #bfaa9b;
  --accent: #e0662a; --accent-deep: #f08a52; --line: #5a3a26; --rule: #3a2a1f;
  --grid-minor: rgba(224,102,42,.07); --grid-major: rgba(224,102,42,.16); --tag-bg: rgba(224,102,42,.14);
  --clip-bg: #0f0a07; --shadow: 0 10px 28px rgba(0,0,0,.45); color-scheme: dark; }}
body {{
  background: var(--bg); color: var(--fg); font: 400 15px/1.55 var(--body);
  background-image:
    linear-gradient(var(--grid-major) 1px, transparent 1px), linear-gradient(90deg, var(--grid-major) 1px, transparent 1px),
    linear-gradient(var(--grid-minor) 1px, transparent 1px), linear-gradient(90deg, var(--grid-minor) 1px, transparent 1px);
  background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
}}
body::before {{ content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 30; background: var(--bg); }}
.wrap {{ max-width: 1180px; margin: 0 auto; padding-block: 40px 80px;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }}
header {{ display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center; margin-bottom: 28px; }}
.mono {{ position: relative; width: 64px; height: 64px; display: grid; place-items: center; border: 2px solid var(--accent);
  color: var(--accent-deep); background: var(--surface); font: 800 26px/1 var(--body); letter-spacing: -.02em; }}
.mono::before, .mono::after {{ content: ""; position: absolute; width: 12px; height: 12px; border: 0 solid var(--accent); }}
.mono::before {{ top: -8px; left: -8px; border-width: 2px 0 0 2px; }}
.mono::after {{ bottom: -8px; right: -8px; border-width: 0 2px 2px 0; }}
h1 {{ margin: 0; font: 800 clamp(40px, 7vw, 72px)/0.98 var(--body); letter-spacing: -.03em; text-wrap: balance; }}
.hand {{ font-family: var(--hand); color: var(--accent-deep); }}
.lede {{ max-width: 62ch; margin: 0 0 8px; font-size: 17px; }}
.lede + .hand {{ margin: 0 0 30px; font-size: 18px; }}
.how {{ display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 0 0 28px; padding: 0; list-style: none; color: var(--muted); font-size: 14px; }}
.how b {{ color: var(--fg); }}
.beats {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 22px; align-items: start; }}
.group {{ grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; padding-top: 18px; border-top: 2px solid var(--accent); }}
.group h2 {{ margin: 0; font: 800 28px/1.1 var(--body); letter-spacing: -.02em; }}
.group p {{ margin: 0; font-family: var(--hand); color: var(--accent-deep); font-size: 17px; }}
article.beat {{ min-width: 0; background: var(--surface); border: 1px solid var(--line); border-radius: 2px; box-shadow: var(--shadow); display: flex; flex-direction: column; }}
.clip {{ background: var(--clip-bg); aspect-ratio: 9 / 16; max-width: 100%; }}
.clip video {{ width: 100%; height: 100%; display: block; object-fit: cover; cursor: pointer; }}
.info {{ padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 6px; min-width: 0; }}
.meta {{ display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }}
.bnum {{ display: inline-grid; place-items: center; min-width: 26px; height: 26px; padding: 0 6px; border: 1.5px solid var(--accent); color: var(--accent-deep); font-weight: 800; font-size: 13px; }}
.tag {{ background: var(--tag-bg); color: var(--accent-deep); padding: 2px 8px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; font-size: 11px; }}
.dur {{ margin-left: auto; }}
h3 {{ margin: 2px 0 0; font: 700 19px/1.25 var(--body); }}
.note {{ margin: 0; color: var(--muted); font-size: 14px; }}
.foot {{ margin-top: 26px; color: var(--muted); font-size: 13px; }}
@media (max-width: 560px) {{ .beats {{ grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }} .info {{ padding: 10px 10px 12px; }} h3 {{ font-size: 16px; }} .note {{ font-size: 13px; }} }}
@media (max-width: 380px) {{ .beats {{ grid-template-columns: 1fr; }} }}
@media (prefers-reduced-motion: reduce) {{ .clip video {{ cursor: default; }} }}
</style>
<div class="wrap">
  <header>
    <div class="mono" aria-hidden="true">WY</div>
    <h1>Brand Lab</h1>
  </header>
  <p class="lede">Twenty three-second samples in your sohweiyu.com look: blueprint paper, burnt orange, Plus Jakarta Sans. Rate each one so I know which styles go into your brand sheet and which never show up in a reel.</p>
  <p class="hand">The brown silhouette is stand-in footage. Your real take replaces it.</p>
  <ul class="how">
    <li><b>Keep</b> use it as is</li>
    <li><b>Maybe</b> change it, and say how in the notes</li>
    <li><b>Drop</b> never use it</li>
    <li>Tap a clip to pause it</li>
  </ul>
  <div class="beats" data-round="1">
{chr(10).join(cards)}
  </div>
  <p class="foot">Samples 11 and 12 use placeholder numbers. Sample 16 uses the ApplyWise details from your site.</p>
</div>
<script>
(() => {{
  const vids = [...document.querySelectorAll(".clip video")];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  vids.forEach((v) => {{
    if (reduce) {{ v.removeAttribute("autoplay"); v.pause(); v.controls = true; return; }}
    v.addEventListener("click", () => (v.paused ? v.play().catch(() => {{}}) : v.pause()));
  }});
  if (!reduce && "IntersectionObserver" in window) {{
    const io = new IntersectionObserver((es) => es.forEach((e) => {{
      if (e.isIntersecting) e.target.play().catch(() => {{}}); else e.target.pause();
    }}), {{ threshold: 0.25 }});
    vids.forEach((v) => io.observe(v));
  }}
}})();
</script>
'''
out = root / "out/brand-lab/brand-lab.html"
out.write_text(page + "\n" + kit)
print(f"wrote {out.relative_to(root)} ({len(samples)} samples)")
