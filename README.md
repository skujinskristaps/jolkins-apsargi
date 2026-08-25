# RE Drošība

Vienas lapas uzņēmuma mājaslapa RE Drošība zīmolam.

## Lokāla palaišana

```bash
npm install
npm run dev
```

## Cloudflare Pages

Savieno GitHub repozitoriju ar Cloudflare Pages un izmanto:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 18 vai jaunāks

Kontaktforma sagatavo e-pastu uz `pasts@redrosiba.lv` ar lietotāja pasta programmu. Pirms publiskas palaišanas nomaini pagaidu kontaktus un pārbaudi juridisko tekstu.

## Drošības uzturēšana

- Ievainojamību ziņošanas kontaktinformācija ir publicēta vietnē [/.well-known/security.txt](https://www.redrosiba.lv/.well-known/security.txt). Pārbaudi, lai `Contact` vienmēr būtu aktuāls un `Expires` būtu nākotnē.
- Cloudflare panelī ieslēdz Bot Fight Mode un AI Labyrinth. Pirmajās 24–72 stundās pārskati **Security > Events**, lai pārliecinātos, ka netiek ietekmēti reāli apmeklētāji, kontaktforma vai meklētājprogrammu roboti.
- Pēc publicēšanas pārbaudi, ka `https://www.redrosiba.lv/.well-known/security.txt` atgriež HTTP 200 un `robots.txt` joprojām norāda uz vietnes karti.
- Mainoties drošības kontaktam, atjauno `public/.well-known/security.txt` un pārbaudi arī Cloudflare Security Insights ieteikumus.
