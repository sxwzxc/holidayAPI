# China Holiday Query (EdgeOne Template Refactor)

This project is a holiday query website + API built on top of the EdgeOne template.

All holiday data comes from `config/holidayAPI.json`.

## Features

- Show current month holiday arrangements on the homepage.
- Provide a direct API endpoint: `/today`.
- Return plain text: `放假` or `上班`.

## Rule Engine

For a given date:

1. If the date is inside any holiday range (`StartDate` ~ `EndDate`) → `放假`
2. Else if the date is in any `CompDays` → `上班`
3. Else weekend (Saturday/Sunday) → `放假`
4. Else weekday (Monday-Friday) → `上班`

## API

### `GET /today`

- **Response type**: `text/plain; charset=utf-8`
- **Response body**: `放假` or `上班`

## Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

## Data Source

- Local file: `config/holidayAPI.json`
- Upstream source: `https://github.com/lanceliao/china-holiday-calender`
- Holiday notices: official announcements from `gov.cn` (stored per holiday item in `URL` field)

## License

MIT
