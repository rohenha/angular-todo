import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { beforeAll } from 'vitest';

// Angular's JIT compiler cannot fetch templateUrl/styleUrl under Vitest.
// Resolve them from the sources bundled by Vite (`?raw`).
const rawResources = import.meta.glob('./**/*.{html,css,scss}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const resourcesByName = new Map(
  Object.entries(rawResources).map(([path, content]) => [path.split('/').pop()!, content]),
);

beforeAll(async () => {
  await resolveComponentResources(async (url) => {
    const name = url.split('/').pop() ?? url;
    const content = resourcesByName.get(name);

    if (content === undefined) {
      throw new Error(`Unknown Angular component resource: ${url}`);
    }

    return content;
  });

  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});
