const url = chrome?.runtime.getURL("pages/page.html");

export function PageLink() {
  if (!url) return null;
  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Open Todo Sync Extension Page
      </a>
    </div>
  );
}
