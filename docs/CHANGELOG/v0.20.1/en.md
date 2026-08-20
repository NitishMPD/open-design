---
title: Open Design 0.20.1 — Go Time
description: Go, the new entry plan, is live on the pricing page and in the app. Plan models keep working at zero balance, image generation tells you why it failed, and the first run you start from Home stays live from the first token to the last.
---

### 🌟 Codename: *Go Time*

🧭 **28 PRs · 10 contributors · 2 days** — **Go, the new entry plan, is live on
the pricing page and in the app. Plan models keep working at zero balance, image
generation tells you why it failed, and the first run you start from Home stays
live from the first token to the last.** 0.20.0 made the things you build hold
together; 0.20.1 is the patch that clears the small stops in front of them.

## 🔥 Highlights

- 🟢 **Go is here — a plan you can actually start on.** The new entry tier ships
  end to end: a Go column on the pricing page, a launch banner on the homepage,
  and in-app upgrade entries that take you straight to Pricing instead of a
  dead-end dialog. Plan names, order and copy now read the same in the app and on
  the site. (#7121, #7122, #7167)

- 🔋 **A zero balance no longer locks you out of the models you pay for.** If
  your plan includes unlimited use of a model, the picker keeps offering it even
  when your wallet reads 0 — the balance and the entitlement are two different
  things, and only one of them should gate the model list. (#7187)

- 🖼️ **When an image doesn't come back, you find out why.** Generation failures
  used to collapse into one generic message. Now the real reason comes through —
  a safety refusal, a provider error, a bad prompt — so you know whether to
  retry, rephrase, or switch models. (#7118)

- 💬 **The first thing you ask for on Home streams all the way through.** Starting
  a run from Home could leave the output frozen partway while the work continued
  in the background. The first run now stays live from the first token to the
  last. (#7071)

- ⏱️ **"How long did that take" finally means what it says.** Run timing is now
  anchored to the moment the model actually starts responding, so queueing and
  startup no longer inflate generation time in your history. (#7155)

- 🧩 **Handoff to OpenCode.** A new community plugin hands the current piece of
  work over to OpenCode, so a task started in Open Design can continue in the
  agent you prefer. (#6948) Thanks @ross-sec.

- 🏷️ **One name, everywhere: OpenDesign.** The product name, navigation and CTAs
  now read consistently across the app and the site, instead of drifting between
  two spellings. (#6983, #6998) Thanks @joeylee12629-star.

- ⚡ **Opening your conversation list stops doing unnecessary work.** The list no
  longer materializes full event logs just to draw itself, which shows up
  directly as a faster panel on projects with long histories. (#6978)
  Thanks @jiulongche.

## 🩹 Fixed

- The About panel's update row keeps its spacing, and the project frame no longer
  flashes twice when a project opens. (#7174)
- Deploy failures return specific error codes instead of one opaque 400, so a
  failed deploy says what went wrong. (#5897)
- Removing a skill clears it from the `@` mention picker instead of leaving a
  stale entry behind. (#6920) Thanks @T-sanjay-ram.
- Reattaching to a running conversation coalesces replay events instead of
  replaying them one by one. (#6926) Thanks @roian6.
- Agent runtimes start on Windows machines whose `PATHEXT` is malformed. (#6937)
  Thanks @github-lover-9999.
- `od media wait` and `od media generate` flush their output before exiting, so
  piped and scripted usage no longer loses the last lines. (#6800)
  Thanks @lorenzozanee.
- The artifact upsell only appears for Cloud models, not for models you already
  brought yourself. (#6995)
- Preview font stylesheets load without blocking the preview itself. (#7134)
- The DeepSeek Harness bootstrap version is derived from the installer bytes, so
  the reported version matches what actually installed. (#7107)

## 🌐 Website

- An image generation showcase on the landing page. (#6904)
- A DeepSeek Harness GUI guide that answers the search intent directly, with the
  steps 2–5 walkthrough split out. (#7073) Thanks @joeylee12629-star.
- DeepSeek curated plugin detail routes work again. (#6976) Thanks @roian6.

## 🙏 Thanks to everyone who shipped 0.20.1

@alchemistklk · @github-lover-9999 · @jiulongche · @joeylee12629-star ·
@lefarcen · @lorenzozanee · @roian6 · @ross-sec · @Siri-Ray · @T-sanjay-ram
