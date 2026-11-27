# Grizzly System Engineering | Public site and engineering portfolio

**[Caleb Clark’s engineering portfolio](https://grizzlyse.com/portfolio/) · [GitHub evidence index](https://github.com/cec406/Projects) · [Project catalog](https://grizzlyse.com/projects/)**

This repository is the source for [grizzlyse.com](https://grizzlyse.com/), including the Grizzly business site, Caleb Clark’s recruiter portfolio, and browser-based demos, learning apps, and games.

| Start here | What you’ll find | Source |
| --- | --- | --- |
| [Recruiter portfolio](https://grizzlyse.com/portfolio/) | Selected work: GrizzWorks, workplace infrastructure and VPN access, K3s/GitOps, Grizzly Range, local AI, Python, and delivery practices. | [`portfolio/`](portfolio/) |
| [Project catalog](https://grizzlyse.com/projects/) | Demos, runbooks, and project links organized by topic. | [`projects/`](projects/) |
| [Engineering Lab](https://grizzlyse.com/lab.html) | Lab hardware, private access notes, and interactive browser tools. | [`lab.html`](lab.html) |
| [GrizzWorks demo](https://grizzlyse.com/dashboard/?demo=1#/workorders) | Browser-only shop software with fictional data. The [separate application repository](https://github.com/cec406/applications/tree/main/dashboard) holds the Node server and packaging. | [`dashboard/`](dashboard/) |
| [Grizzly Range](https://grizzlyse.com/range/) | Browser desktop and progress adapters for five synthetic training apps. | [`range/`](range/) |
| [Grizzly client services](https://grizzlyse.com/) | Systems design, deployment, and support for shops and field teams. | [`index.html`](index.html) |

## Preview and deploy

From the repository root, run `python3 -m http.server --bind 127.0.0.1 8000` and open `http://127.0.0.1:8000/portfolio/`. Serve over HTTP so the ES modules and training frames can load. AFT Forge is a separate Vite build: follow the [app instructions](aft-forge/README.md) to preview it.

Run `python3 .github/scripts/check-portfolio.py .` to check local portfolio links and assets. The [GitHub Pages workflow](.github/workflows/deploy.yml) repeats this check against the assembled artifact after substituting the compiled AFT Forge bundle at `/aft-forge/`.

### Publish across repositories

1. Publish the evidence files and workflows in [Projects](https://github.com/cec406/Projects) first. The public portfolio links to paths on `Projects/main`; verify the migration reports, readiness reports, and Kubernetes validation notes resolve there.
2. Commit the site pages and all new assets and checker files, then publish this repository. Pages archives the committed tree, not changes left in the working directory. Review the public [portfolio](https://grizzlyse.com/portfolio/) and [catalog](https://grizzlyse.com/projects/) after Pages finishes.
3. Publish the README updates in the applications, Python, and Cyber repositories once the new site anchors are live. If using the [account profile draft](https://github.com/cec406/Projects/blob/main/GITHUB-PROFILE.md), publish it separately in `cec406/cec406`.

Pages currently publishes the tracked site tree except for the workflow directory and the replaced AFT Forge source. Unlisted routes and `noindex` are not access controls; don’t put private material in this repository. For manifests, deployment runbooks, and other code samples, see the [Projects repository](https://github.com/cec406/Projects).
