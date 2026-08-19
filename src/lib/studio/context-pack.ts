import type { Project, ProjectDocument } from "@/lib/studio/types";

export function buildContextPack(project: Project, documents: ProjectDocument[]) {
  const files = documents.map((document) => ({
    path: `context/${document.title || `${document.slug}.md`}`,
    content: document.content.endsWith("\n") ? document.content : `${document.content}\n`,
  }));

  const list = documents.map((document) => `- \`context/${document.title}\``).join("\n");

  files.unshift({
    path: "README.md",
    content: `# ${project.name}

Pacote interno da Bensi Labs Studio. Não publicar. Não usar como página do site.

Este zip é o Project Context: a fonte de verdade para começar o desenvolvimento no Cursor.

## Como usar

1. Extraia o zip.
2. Abra a pasta extraída no Cursor (File → Open Folder).
3. Trate \`context/\` como requisitos do projeto.
4. Não invente o que estiver marcado como \`PENDING\` ou \`NOT DEFINED\`.
5. Decisões novas devem ser registradas em \`context/DECISIONS.md\` e, quando possível, de volta no Studio.

## Arquivos

${list || "- (nenhum documento)"}

## Fluxo

\`\`\`text
Studio → este pacote → Cursor → código
\`\`\`
`,
  });

  return files;
}
