declare module 'mth-htm' {
  export function markdownToHtml(markdown: string): Promise<string>;
  export function htmlToMarkdown(html: string): string;
}
