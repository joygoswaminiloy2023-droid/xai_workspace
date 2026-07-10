<div align="center">

# ⚡ Xai — Intelligence Workspace

**A scroll-driven interface that turns raw operational data into structured intelligence, actionable insight, and running automations.**

`Raw Data` → `Structured Intelligence` → `Actionable Insight` → `AI Automations`

[![Live Prototype](https://img.shields.io/badge/live-prototype-3E63DD?style=for-the-badge)](https://xai-workspace-red.vercel.app/)
[![Figma](https://img.shields.io/badge/design-figma-1B2340?style=for-the-badge)](https://www.figma.com/design/4KDFQP0w9qGdV31tCm9mHv/XAI_WORKSPACE?node-id=0-1)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

</div>

---

## 🧠 What is Xai?

Most operational tools stop at reporting — a support platform shows ticket counts, a database shows rows, a chart shows a trend. Someone still has to **notice the pattern, decide what it means, and decide what to do about it.**

**Xai** is an intelligence workspace built on the idea that this last mile — noticing, reasoning, deciding — is exactly the part that should be automated, while staying visible and reviewable to the person in charge. Instead of another dashboard to read, Xai watches your data, reasons about it, and proposes the next action.

> Built for teams already running tools like **Zendesk**, **Postgres**, and call-recording software — but with no layer connecting them.

---

## 🎯 The Core Idea

The entire interface is architected around a single four-stage pipeline, and scrolling the page *is* moving through that pipeline:

| Stage | What Happens |
|---|---|
| 🌫️ **Raw Data** | Logs, records, and conversations most businesses already have, sitting unstructured |
| 🧩 **Structured Intelligence** | Cross-referencing entities, connecting sources, spotting patterns |
| 📊 **Actionable Insight** | Ranked signals, confidence scores, evidence-backed decisions |
| 🤖 **AI Automations** | Self-organizing automations that run without waiting on a person |

No paragraph of marketing copy explains this — **the structure of the page is the argument.**

---

## 🖥️ Page Structure

A single, continuous scroll experience — not a multi-page site. Navigation jumps to anchors within one page because the pipeline has to be experienced in sequence.

```
┌─────────────────────────────────────────────────────────┐
│  HERO            #hero        → Raw, unstructured data   │
│  THE PATH        #flow        → Ingest / Analyze /       │
│                                  Generate, explained      │
│  THE WORKSPACE   #dashboard   → The live product itself  │
│  AUTOMATIONS     #signature   → Draggable 3D node cluster │
│  FOOTER          —            → Status & attribution     │
└─────────────────────────────────────────────────────────┘
```

### 01 · Hero — *"Raw data, given structure."*
A full-viewport `DataField.jsx` particle field rendered in Three.js, deliberately unordered at rest. A live-looking readout (`NODE_84 · PROCESSING LOG STREAM · STABILITY 99.8%`) sits on top so the scene reads as an active system, not decoration.

### 02 · The Path — *"From input to action, in three moves."*
Three plain-language stages — **Ingest → Analyze → Generate** — that name the pipeline in words before the interface proves it.

### 03 · Inside the Workspace — *"One place to watch it happen."*
The functional heart of the product: `Dashboard.jsx`.

- Sidebar — Overview / Signals / Automations / Sources / Model status
- 4 stat cards — Sources connected, Signals this week, Automations live, Avg. confidence
- Signals-over-time chart
- Ranked signal list with confidence percentages
- Connected-sources table with record counts + sync status

### 04 · Automations — *"Every automation finds its own shape."*
A GSAP-driven, **draggable 3D node cluster** (`NodeCluster.jsx`) that reorganizes live:

| Shape | Represents |
|---|---|
| 🔵 Sphere | Even coverage |
| ▦ Grid | Scheduled jobs |
| 🪢 Knot | Interdependent triggers |
| 🧬 Helix | Sequenced steps |

### 05 · Footer — *"All systems operational."*
A deliberately quiet close: status line, product/company links, challenge attribution — landing calmly after the automations section.

---

## 🎨 Design Decisions

- **Scroll as the primary interaction** — Framer Motion + GSAP scroll-triggers turn the pipeline into something physically moved through, not read as a list.
- **3D used in exactly two places** — the hero's particle field and the automations cluster — so it carries narrative weight (disorder → organized motion) instead of becoming decoration.
- **A real dashboard, not an illustrated one** — concrete data (18,204 Zendesk records, 94% confidence on an EU refund spike, a 12-account churn cluster) instead of Lorem-ipsum placeholders.
- **Restrained navigation** — exactly 3 links, matching the 3 pipeline-carrying sections. No dropdowns, no sprawl.
- **Systems-readout typography** — monospace-leaning labels (`NODE_84`, `SRC-0231`) reinforce that this is a live operational tool.
- **Motion with restraint** — used to guide reading order, never as constant background animation.

---

## 🗺️ Narrative Mapping

| Pipeline Stage | Interface Section | Representation |
|---|---|---|
| **Raw Data** | Hero | Unordered particle field + live "processing" readout |
| **Structured Intelligence** | The Path | Plain-language ingest/analyze copy |
| **Actionable Insight** | Inside the Workspace | Ranked signals, sources table, stat cards |
| **AI Automations** | Automations Cluster | Draggable, self-organizing node cluster |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Motion | [Framer Motion](https://www.framer.com/motion/) · [GSAP](https://gsap.com/) |
| 3D | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / Three.js |

---

## 📦 Links & Deliverables

| Resource | Link |
|---|---|
| 🚀 Live Prototype | [xai-workspace-red.vercel.app](https://xai-workspace-red.vercel.app/) |
| 🎨 Figma (high-fidelity UI, Auto Layout, components) | [Open in Figma](https://www.figma.com/design/4KDFQP0w9qGdV31tCm9mHv/XAI_WORKSPACE?node-id=0-1) |

---

<div align="center">

**Xai — Intelligence Workspace**
Prototype built for the **RacoAI Frontend Challenge**
by **Joy Goswami Niloy** — Frontend / Full-Stack Developer

</div>
