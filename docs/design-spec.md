# Interview Questions Catalog: design spec

The design is direction **C** on the canvas ("Interview Questions Catalog — UI directions"):
https://claude.ai/artifact/MEjFc3JUe7Ms4qKyxwJf8H

Use the canvas for how things look and move. Use this file for the exact values.
The sample questions on the canvas are placeholders; the real ones come from the API.

---

## 1. Layout

### Desktop (wider than 900px)
- The page is exactly one screen tall (`height: 100vh`), with 8px padding and an 8px gap between columns.
- **Left column, 400px wide:** it scrolls on its own and its scrollbar is hidden. From top to bottom it holds:
  - the top row: a "Show all questions" pill and the theme switch
  - the header
  - the filter panel
  - the question cards (the card pile, section 5.1)
- **Right column, the rest of the width:** a rounded panel (radius 20px) that also scrolls on its own and holds the selected answer. Padding is `60px clamp(24px, 5vw, 80px) 28px`. The answer text is at most 72ch wide.
- Previous / next buttons sit at the bottom of the answer panel, in two equal columns (section 4).

### Phone (900px or narrower)
- One column, and the whole page scrolls.
- **List mode** (the default) shows only the top row, header, filters and cards. The answer panel is hidden.
- **Answer mode** opens after tapping a card. It shows the top row and header, then a "Show less" pill aligned right, then only the tapped card, then the answer panel. The filters and the other cards are hidden.
- "Show less" goes back to list mode. Both changes use the fade in 5.3.

### All questions view
- A full-width grid with a masonry layout made with CSS columns: `column-width: 300px; column-gap: 8px`.
- The top bar holds the search ("I was asked about…"), the topic chips, a result count, the theme switch and a round close button (44px).
- Clicking a grid card goes back to the list view and selects that question. On a phone it opens that question in answer mode.
- Loads 8 at a time, with the same "Load more" button centred under the grid (max 420px wide).
- In React these are two routes, for example `/` and `/all`. Search, filters and theme are shared state between them.

---

## 2. Colour tokens

Set them as CSS custom properties on the root element and switch the whole set with the theme.

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--bg` | `#0a0a0a` | `#ffffff` | Page background |
| `--panel` | `#151515` | `#f1f1f1` | Filter panel, answer panel |
| `--card` | `#1e1e1e` | `#e8e8e8` | Cards, chips, pills, search, switch track |
| `--hover` | `#282828` | `#dedede` | Hover on anything that uses `--card` |
| `--tilebg` | `#2a2a2a` | `#0a0a0a` | Icon tiles |
| `--ink` | `#ededed` | `#0a0a0a` | Main text, focus ring |
| `--soft` | `#c9c9c9` | `#2b2b2b` | Answer body paragraphs |
| `--muted` | `#9c9c9c` | `#575757` | Secondary text, card previews, counts |
| `--acc` | `#d4ff3a` | `#d4ff3a` | The one accent (see rules below) |
| `--code` | `#0f0f0f` | `#e8e8e8` | Code block background |

Code highlighting:

| Token | Dark | Light |
|---|---|---|
| keyword | `#d4ff3a` | `#4a6b00` |
| string, number | `#f0a985` | `#a8431d` |
| function, type | `#9ccbff` | `#1d5fa8` |
| comment | `#8a8a8a` | `#5f5f5f` |

**Accent rules.** Acid green is for state only. It marks the selected question card, the active topic chips, the dark-mode switch when it's on, the icons, and one of the three grid tile styles. Text on acid is always `#0a0a0a`, and secondary text on acid is `#2b2b2b`. Never use acid as text on a light background, because it fails contrast.

**No other colours.** Don't add violet or any other hues.

---

## 3. Typography

Load from Google Fonts: **Archivo** with the width axis, and **JetBrains Mono** for code only.
`family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500`

| Role | Size / line height | Weight | Other |
|---|---|---|---|
| Display: header "Questions I got asked" | 76px / 0.84 | 800 | `font-stretch: 62%`, uppercase |
| Display: answer title | `clamp(44px, 5vw, 76px)` / 0.9 | 800 | `font-stretch: 62%`, uppercase, `text-wrap: balance` |
| Display: grid tile word | `clamp(48px, 4.4vw, 66px)` / 0.86 | 800 | `font-stretch: 62%`, uppercase |
| Lead (short answer) | 22px / 1.42 | 450 | `text-wrap: pretty` |
| Body | 17px / 1.62 | 400 | colour `--soft` |
| Card title | 16px / 1.28 | 650 | |
| Card preview | 14px / 1.4 | 400 | colour `--muted`, clamped to 2 lines |
| UI labels (chips, pills) | 13–14px | 600 | |
| Small caps labels (Any / All, Previous / Next) | 12px | 700 | uppercase, `letter-spacing: .04–.06em` |
| Code | 13.5px / 1.7 | 400 | JetBrains Mono |

Use `font-variant-numeric: tabular-nums` everywhere, so counts don't jump around.

---

## 4. Components

Shapes: pills and chips are fully round (`999px`), cards 18px, panels 20px, icon tiles 12px, code blocks 16px.

**Every button needs these states:** default, hover, `:focus-visible` (a 2px `--ink` outline, offset 2px) and, where it applies, pressed or selected. Use real `<button>` and `<a>` elements.

### Pill button
- 44px tall, padding `0 18px`, background `--card`, 14px/600.
- Hover: background `--hover`.
- Used for "Show all questions", "Show less" (with a chevron-up icon) and "Clear filters".

### Theme switch
- A `<button role="switch" aria-checked>`, 52×32px, track `--card`, white knob of 26px.
- **On** (dark mode): the track turns `--acc`, the knob turns `#0a0a0a`, and the knob moves 20px.
- Motion: `transform .22s cubic-bezier(.2,.8,.2,1)`.

### Search
- 44px tall pill, background `--card`, no border, placeholder colour `--muted`.
- Focus: `box-shadow: 0 0 0 2px var(--ink)`.
- Give it a real `<label>`; it can be visually hidden.

### Topic chip
- 36px tall (44px on touch screens via `@media (pointer: coarse)`), background `--card`.
- Shows the tag name plus its count in `--muted`.
- Active: background `--acc`, text `#0a0a0a`, and `aria-pressed="true"`.
- The counts come from `GET /tags`.

### Difficulty chip
- Three chips after the topic chips: Easy, Medium and Hard. Each shows its emote's head in a 26px round dark tile (`--tilebg`; `#0a0a0a` when active), plus the name and a count.
- They work like topic chips: you can pick more than one, active ones are acid green, and they use `aria-pressed`.
- **Combining filters:** a question must match one of the selected difficulties, and also the topic filter.
- They appear in the list's filter panel and in the All questions top bar.

### Any / All toggle
- A segmented control: a `--card` track with 3px padding, holding two buttons.
- The active one has background `--ink` and text `--bg`.
- It maps to the API's match-any / match-all filter.

### Question card (list)
- A full-width `<button>`: flex row, 14px gap, 14px padding, radius 18px, background `--card`.
- Shadow: `0 1px 0 rgba(0,0,0,.04), 0 8px 24px -12px rgba(0,0,0,.35)`.
- Inside: the icon tile (48px), then the title and a 2-line preview of the short answer.
- **Difficulty emote:** a 42×42 tile (radius 11px, `--tilebg`) in the top-right corner, 13px from the top and right edges. It holds the emote's head crop at exactly 2× (`difficulty-<level>-head.svg`). Give the card `padding-right: 64px` so the text never runs under it. The tile has `role="img"` and `aria-label="Difficulty: Hard"`.
- Selected: background `--acc` with dark text, and both tiles turn `#0a0a0a`. Set `aria-current="true"`.
- Hover: background `--hover` with a fast transition (.18s). The selected state fades in slowly (.5s), see 5.3.

### Icon tile
- 48×48, radius 12px, background `--tilebg`, and the icon drawn in `--acc` (`fill` or `stroke: currentColor`).
- Brand logos are about 28–30px. They come from Simple Icons (CC0): JavaScript, React, PostgreSQL (for SQL), Node.js and Prisma.
- Topics without a logo get a 1.7px line icon at 26px: Security (shield), API (curly braces), Networking (globe).
- Each question shows the icon of its main tag. Store that as a tag→icon map on the frontend.

### Answer panel
- From top to bottom: the title, the tag pills (30px, `--card`), the difficulty block, the short answer (lead style), the body paragraphs, then the code block.
- **Difficulty block:** a 96×96 tile (radius 20px, `--tilebg`) holding the full emote scene at exactly 3× (`difficulty-<level>.svg`). The drawing fills the tile to its edges, with no padding. Next to it, the level name (16/650) and its line in `--muted`: Easy "Coffee's still warm", Medium "Starting to sweat", Hard "This is fine".
- The code block has a language pill above it (`--ink` background), and the code is rendered from Markdown with syntax highlighting (INT-24).
- At the bottom are previous / next buttons:
  - **Layout:** a grid with two equal columns, `grid-template-columns: repeat(2, minmax(0, 1fr))`. Next always goes in column 2 (`grid-column: 2`), so a button on its own keeps half the width. At 520px or narrower they stack in one column.
  - **Background:** each button's box is a `::before` layer in `--card` (radius 16px, `--hover` on hover) with a mask that fades it towards the middle. Previous uses `mask-image: linear-gradient(to right, #000, transparent)`, so it's solid on the left and invisible on the right. Next uses `linear-gradient(to left, #000, transparent)`. Only the background fades; the text stays fully opaque.
  - **Content:** a small uppercase label with an arrow ("Previous" / "Next"), then the question title.

### Grid card (All questions)
- A `<button>` holding a tile (radius 18px, padding `16px 18px 18px`), with the icon tile at the top left, the difficulty emote tile at the top right (the same 42px tile as on the cards) and the big word at the bottom. On acid tiles both small tiles turn `#0a0a0a`.
- Under it sit the full question (16/650) and its tags (13px, `--muted`).
- The tile styles rotate in order: `--ink` background with `--bg` text, then `--acc` with dark text, then `--card` with `--ink` text.
- Tile heights vary, and that variation is what makes the masonry work. Give each question a short "key" word for the tile, such as "Event loop", "Joins" or "useEffect".

### Empty state
- When the filters match nothing, show "No match" in display type, one sentence on how to fix it, and a "Clear filters" pill.

### Loading states (INT-25)
Canvas: "C · Loading". Skeletons have the same shapes as the real content, so nothing jumps when data arrives. Never use a spinner.
- **Skeleton blocks:** background `--card` (or `--hover` inside a card), pulsing opacity 1 → .45 → 1 over 1.6s `ease-in-out`, infinite. No pulse with reduced motion.
- **Chips:** 8 round bars, 36px tall, 52–90px wide.
- **Question cards:** a real card shell holding a 48px rounded tile and 3 bars (12px, 10px, 10px tall). Show 6 of them.
- **Answer panel:** two 58px title bars, two tag pills, three 16px text lines and a 170px code block.
- **Grid:** tiles of varying heights, each with two caption bars.
- **Header line:** "Loading questions…".
- **Accessibility:** `aria-busy="true"` on the loading list.

### Error states (INT-25)
Canvas: "C · Error: the list didn't load" and "C · Error: one answer, and Load more". Each error appears once, where it happened, with one way to recover.
- **The list failed (initial load):**
  - In the list column, a `--panel` box (radius 18px) with an alert icon, "The questions didn't load" (16/650), "The API didn't answer. Check your connection, then try again." (`--muted`) and a "Try again" pill.
  - The topics row reads "Topics didn't load."
  - The answer side shows "Nothing loaded yet" in muted display type, with no second button.
  - The header line reads "Questions didn't load".
- **One answer failed:** the answer panel shows "This answer didn't load" in display type, "The list is fine, only this answer failed. Try again, or pick another question.", and a "Try again" pill. The list stays usable. A question that doesn't exist (404) uses the same layout, saying "This question doesn't exist" with a "See all questions" pill.
- **Load more failed:** an inline row in `--panel` (radius 18px): "Couldn't load more questions." plus a "Try again" pill. The cards already loaded stay.
- **Accessibility:** `role="alert"` on each error.

### Pagination (INT-26)
- **Page size:** 8 questions, using `GET /questions?page&limit=8`.
- **Load more button:** at the end of the list, full width, 56px tall, radius 18px, background `--panel` (`--hover` on hover). On the left, a down-arrow icon and "Load N more", where N is the smaller of 8 and what's left. On the right, "8 of 12" in `--muted`.
- **While loading:** the button is replaced by N skeleton cards.
- **At the end:** when everything has loaded, the button becomes "That's all 12 questions." (13px, `--muted`, centred).
- **Filters:** changing a filter, the match mode or the search goes back to the first 8.
- **No numbered pages.** The card pile assumes one continuous scrolling list.
- **Phone answer mode:** the pagination is hidden, along with the rest of the list.

---

### Difficulty emotes (assets)
Original pixel art: a developer with headphones and a coffee mug, on a 32×32 grid in the design's palette (`#0a0a0a`, greys, `#ededed`, and acid green for the fire). Files, in `src/assets/difficulty/`:

| Level | Card / chip (head crop) | Answer panel (full scene) | Mood |
|---|---|---|---|
| Easy | `difficulty-easy-head.svg` | `difficulty-easy.svg` | relaxed, coffee steaming |
| Medium | `difficulty-medium-head.svg` | `difficulty-medium.svg` | worried brows, sweat drop |
| Hard | `difficulty-hard-head.svg` | `difficulty-hard.svg` | "this is fine", room on fire |

- Always show them at whole-number scales: 1×, 2× or 3×. Keep `shape-rendering="crispEdges"`, so the pixels stay sharp.
- The full scenes are shifted 2px right compared with the head crops, so the developer sits centred in the square tile.
- Their colours are fixed, so they look the same in both themes. They always sit on a dark tile.

## 5. Motion

### 5.1 The card pile (scroll-driven, like portorocha.com)
Cards that reach the bottom edge of the list shrink and stack up instead of being cut off.

- **The scroller:** on desktop it's the left column. On a phone it's the window. Whichever one scrolls sets the bottom edge.
- **When to run:** on scroll and resize, throttled to one run per animation frame (`requestAnimationFrame`).
- **For each card:**
  - `top` = where the card would be with no transform, worked out from `offsetTop` minus the scroll position. Don't use `getBoundingClientRect`, because that includes the transform you're setting.
  - `h` = the card's height.
  - `limit` = `edge - h - 26`, the furthest down a card may sit.
  - If `top <= limit`, clear all styles and stop.
  - Otherwise `d = (top - limit) / (h + 8)` is how deep the card is in the pile, and `k = min(d, 3)`.
  - `transform: translateY(limit - top + k*8 px) scale(1 - k*0.05)` with `transform-origin: 50% 100%`.
  - `filter: brightness(1 - k*0.1)`, so deeper layers get darker.
  - When `k >= 0.85`, hide the card's contents with opacity 0 (.2s), so only the edge shows.
  - When `d > 4`, set `visibility: hidden`.
  - When `d > 0.5`, set `pointer-events: none`.
  - `z-index = 200 - index`, so earlier cards sit on top.
- **Keep cards fully opaque.** Never fade a whole card, or the text of the cards behind shows through.

### 5.2 Hover on grid cards
- The tile rises 5px and gains a shadow `0 22px 40px -22px rgba(0,0,0,.55)`. The icon tile rises another 2px.
- Both use `.6s cubic-bezier(.22,1,.36,1)`.
- The title gets an underline that draws in: a `linear-gradient` background on an inline span. Its `background-size` goes from `0% 1px` to `100% 1px` and its `background-position` from right to left, over `.5s` on the same curve. Add `box-decoration-break: clone` so it works on two-line titles.
- Apply the same effect on `:focus-visible`.

### 5.3 Content changes (fade out, swap, fade in)
This is the reference's page transition, and it is opacity only.
- **Selecting a question on desktop:** the selected card highlight changes immediately and fades over .5s. The answer panel fades out over .4s, the content swaps, the panel scrolls to the top, and it fades in over .5s with `ease`.
- **List ↔ All questions:** the whole page fades the same way.
- **Phone, list ↔ answer mode:** everything under the header fades the same way and the window scrolls to the top. The header stays visible.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, skip the fades and swap instantly. Also turn off transitions in that mode.

**Other transitions.** Small UI changes (hover, chips, switch) take .16–.22s. Don't animate anything when the page loads.

---

## 6. Details that are easy to forget
- Theme the parts browsers draw: `::selection` (acid background, dark text), `caret-color`, thin scrollbars on the answer panel, and the focus ring.
- **CSS resets:** when you reset buttons (`background: none; border: 0`), wrap the selector in `:where(...)`. Otherwise the reset outranks your component classes and wipes their backgrounds. This exact bug made the pile's cards see-through during the design.
- Tap targets are 44px on touch screens.
- The answer area should be `aria-live="polite"`, so screen readers hear the new question.

---

## 7. Where each part goes (Linear)

| Ticket | Part of this spec |
|---|---|
| INT-27 Responsive layout and base styling | 1, 2, 3, the switch, section 6 |
| INT-21 API client and TanStack Query | `GET /questions` with tags and match, `GET /tags` for chip counts |
| INT-22 Question list page | Question card, icon tile, 5.1 card pile |
| INT-23 Tag filter chips synced with the URL | Search, chips, Any/All (keep the selected tags and match mode in the URL) |
| INT-24 Question detail with Markdown + syntax highlighting | Answer panel, code tokens, 5.3 |
| INT-25 Loading, error and empty states | Empty state, loading states, error states |
| INT-26 Pagination UI | Pagination |
| INT-39 Card pile on the question list | 5.1 |
| INT-40 Fade transitions between questions and views | 5.3 |
| INT-41 All questions view (masonry grid) | 1 (All questions view), Grid card, 5.2 |
| INT-42 Phone answer mode with "Show less" | 1 (Phone), 5.3 |
| INT-43 Theme switch with saved preference | Theme switch |
| INT-37 Text search on GET /questions (backend) | 8 (Search) |
| INT-38 Optional short label on Question (backend) | 8 (Grid tile word) |
| INT-44 Difficulty filter on GET /questions (backend) | 8 (Difficulty), Difficulty chip |

---

## 8. Data the design needs from the API
- **Short answer (the lead paragraph and card preview):** the first paragraph of the Markdown `answer`. The rest of the answer is the body. Work this out on the frontend; no schema change is needed.
- **Grid tile word:** a new optional `label` on `Question`, at most about 20 characters ("Event loop", "Joins"). When it's missing, fall back to the main tag's name.
- **Search:** a new `q` parameter on `GET /questions` that searches the title and answer and works together with tags, match mode and pagination.
- **Main tag / icon:** the first tag that has an icon in the frontend's icon map, so no API change is needed.
- **Difficulty:** `easy`, `medium` or `hard`, shown as the emotes. It's also filterable through a new `difficulty` parameter on `GET /questions` (comma-separated, e.g. `difficulty=medium,hard`), which works together with tags, match, `q` and pagination.
