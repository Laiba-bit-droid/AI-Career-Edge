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

## Application rules
- Keep all career simulation logic in the browser-safe career engine module; the product processes user content entirely client-side.
- Use the index route for the single-page career workspace and global CSS semantic tokens for its dark glass visual system; this keeps presentation consistent.
- Resume templates must only rephrase supplied experience without inventing achievements, metrics, or qualifications; this prevents misleading application content.
