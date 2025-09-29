// src/app/shared/services/publications.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { marked } from 'marked';

export interface Publication {
  id: number;
  title: string;
  description?: string;
  date: string;
  image: string;
  category: string;
  link?: string;
  author?: string;
  readTime?: number;
  featured?: boolean;
  content?: string;
  contentType?: 'html' | 'markdown'; // Specify content type from server
}

@Injectable({
  providedIn: 'root',
})
export class PublicationsService {
  constructor() {
    // Configure marked for consistent rendering
    marked.setOptions({
      breaks: true, // Convert line breaks to <br>
      gfm: true, // GitHub Flavored Markdown
    });
  }

  /**
   * Get all publications
   */
  getPublications(): Observable<Publication[]> {
    // In a real app, this would be an HTTP call to your API
    // return this.http.get<Publication[]>('/api/publications');

    // For now, return mock data
    return of([]).pipe(delay(300));
  }

  /**
   * Get a single publication by ID
   */
  getPublicationById(id: number): Observable<Publication | null> {
    // In a real app, this would be an HTTP call to your API
    // return this.http.get<Publication>(\`/api/publications/\${id}\`);

    // For now, return null to indicate using local mock data
    return of(null).pipe(delay(300));
  }

  /**
   * Process content based on its type (HTML or Markdown)
   */
  processContent(content: string, contentType?: 'html' | 'markdown'): string {
    if (!content) return '';

    // If content type is explicitly specified, use it
    if (contentType === 'markdown') {
      return marked(content) as string;
    } else if (contentType === 'html') {
      return content;
    }

    // If not specified, try to detect markdown
    if (this.isMarkdown(content)) {
      return marked(content) as string;
    }

    // Default to treating as HTML
    return content;
  }

  /**
   * Detect if content is markdown based on common patterns
   */
  private isMarkdown(content: string): boolean {
    const markdownPatterns = [
      /^#{1,6}\s+/m, // Headers
      /\*\*.*?\*\*/, // Bold
      /\*.*?\*/, // Italic
      /^[\s]*[-\*\+]\s+/m, // Unordered lists
      /^[\s]*\d+\.\s+/m, // Ordered lists
      /\[.*?\]\(.*?\)/, // Links
      /```[\s\S]*?```/, // Code blocks
      /`.*?`/, // Inline code
      /^>.+/m, // Blockquotes
    ];

    return markdownPatterns.some((pattern) => pattern.test(content));
  }

  /**
   * Example method for future server integration
   * This shows how you might handle markdown content from a server
   */
  processServerContent(publication: Publication): Publication {
    const processedPublication = { ...publication };

    if (publication.content) {
      processedPublication.content = this.processContent(publication.content, publication.contentType);
    }

    return processedPublication;
  }
}
