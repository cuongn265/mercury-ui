import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ArticleService } from '../../article/article.service';
import { Article } from '../../article/article';
import { Category } from '../../category';
@Component({
  selector: 'app-category-timeline',
  templateUrl: './category-timeline.component.html',
  styleUrls: ['./category-timeline.component.scss'],
  providers: [ArticleService]
})
export class CategoryTimelineComponent implements OnInit, OnChanges {
  @Input() articleType: any;
  @Input() category: Category
  articles: Article[];

  constructor(private articleService: ArticleService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.articleType == "latest") {
      this.articleService.getTrendingLatestArticles(this.category._id, true).then(res => this.articles = res);  
    } else {
      this.articleService.getTrendingLatestArticles(this.category._id, false).then(res => this.articles = res);
    }
  }

  ngOnChanges() {
    this.ref.detectChanges();
    if (this.articleType == 'latest') {
      this.articleService.getTrendingLatestArticles(this.category._id, true).then(res => this.articles = res);  
    } else {
      this.articleService.getTrendingLatestArticles(this.category._id, false).then(res => this.articles = res);
    }
  }
}
