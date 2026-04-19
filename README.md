# Nadav Ami
My little blog & personal site.

## PDF Resume

Generates a PDF version of the web resume using Jekyll and Playwright (headless Chromium).

### Setup

Requires Ruby/Bundler (same as the main site) and Node.js 18+.

```
cd resume-pdf
npm install
```

### Usage

```
npm run generate [-- --data <path>] [-- --out <path>] [-- --keep-build]
```

**Options:**

- `--data <path>`, path to a JSON Resume YAML file. If omitted, uses `_data/resume.yml`.
- `--out <path>`, output PDF path. Defaults to `resume-pdf/out/resume-<name>-<YYYYMMDD>.pdf`.
- `--keep-build`, keep the temporary Jekyll build directory for debugging.

**Examples:**

```
# Default resume
npm run generate

# Variant resume
npm run generate -- --data ../variants/company-x.yml

# Custom output path
npm run generate -- --out ~/Desktop/resume.pdf
```

### How it works

1. Runs `jekyll build` with a config overlay (`resume-pdf/_config.yml`) that enables the PDF-only resume page and stylesheet. Both are excluded from normal site builds.
2. If `--data` is provided, sets a `RESUME_DATA` environment variable. A Jekyll plugin (`_plugins/resume_data_override.rb`) picks this up and swaps the resume data at build time, with no file modifications.
3. Serves the built site on a local ephemeral port (needed for absolute font paths to resolve correctly).
4. Opens the PDF resume page in headless Chromium, waits for web fonts to load, and prints to PDF with US Letter page size.

## License
The content on this site is licensed under a [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/). The code is licensed under the [MIT license](https://opensource.org/licenses/MIT) unless otherwise noted.
