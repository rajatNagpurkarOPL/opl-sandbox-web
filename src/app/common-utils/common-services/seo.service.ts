import { Injectable, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { from } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }

  genrateTags(config) {
    config = {
      keywords: 'Hii Patel',
      description: ' my seo Working  in angular project',
      slug: '',
      ...config
    }

    this.meta.updateTag({ name: 'psb:keywords', content: config.keywords });
    this.meta.updateTag({ name: 'psb:description', content: config.description });
    this.meta.updateTag({ name: 'psb:url', content: `http://localhost:6585/${config.slug}` });


    // this.meta.updateTag({ property: 'og:type', content: 'article' });
    // this.meta.updateTag({ property: 'og:site_Name', content: 'article' });
    // this.meta.updateTag({ property: 'og:keywords', content: config.keywords });
    // this.meta.updateTag({ property: 'og:description', content: config.description });
    // this.meta.updateTag({ property: 'og:url', content: `http://localhost:6585/${config.slug}` });
  }
}
