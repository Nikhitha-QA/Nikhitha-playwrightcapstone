import { randomUUID } from 'node:crypto';
import type { Page } from '@playwright/test';

export function generateUniqueEmail(prefix: string, domain: string): string {
  return `${prefix}-${randomUUID()}${domain}`;
}

export async function submitAndAcceptDialog(
  page: Page,
  submit: () => Promise<void>,
): Promise<void> {
  let acceptedPromise: Promise<void> | undefined;
  page.once('dialog', (dialog) => {
    acceptedPromise = dialog.accept();
  });
  await submit();
  await acceptedPromise;
}
