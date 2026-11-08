<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Site is strictly static: no backend, database or server functions. Why: owner requirement.
- All business details/links live in src/config/siteConfig.ts and menu in src/config/menuData.ts; components read only from there. Why: owner edits one place.
- Empty config values must hide their buttons; never invent contact details. Why: no fake info.
- Generate menu QR codes with qrcode.react using the central public menu URL; never encode an editor preview address. Why: printed codes must work for visitors.
