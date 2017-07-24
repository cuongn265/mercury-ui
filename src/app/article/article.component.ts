import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth.service';
import { Article } from './article';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})


export class ArticleComponent implements OnInit, OnDestroy {

  articlesList: Article[];
  categoryName: string;
  publishedArticles: Article[] = [];
  array = [];
  infiniteArticles: Article[] = [];
  sum = 10;
  throttle = 400;
  scrollDistance = 0;
  articleIndex = 4;
  isLoading = false;
  isFinish = false;
  private sub: any;
  isBookmark: boolean = false;
  bookmarkedArticles: Article[] = [];
  idList = [];

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private userService: UserService, private authService: AuthService) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.articleIndex = 4;
      this.infiniteArticles = [];
      this.categoryName = params['categoryName'];
      this.publishedArticles = [];
      this.infiniteArticles = [];
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.articlesList = response;
          this.articlesList.forEach(article => {
            if (article.date) {
              this.publishedArticles.push(article);
            }
          }, this);
          this.addItems(4, this.sum);
        }
      );
    });

    if (this.authService.authenticated()) {
      this.userService.getBookmarks(this.authService.userProfile.identities[0].user_id).then(res => {
        this.bookmarkedArticles = res
        this.bookmarkedArticles.map((article) => this.idList.push(article._id));
      });
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addItems(startIndex, endIndex) {
    if (this.sum >= this.publishedArticles.length) {
      this.sum = this.publishedArticles.length
    }

    for (let i = this.articleIndex; i < this.sum; ++i) {
      let length = this.publishedArticles.length
      this.articleIndex++;
      this.infiniteArticles.push(this.publishedArticles[length - 1 - i]);
      if (this.sum == this.publishedArticles.length) {
        this.isFinish = true;
      }
    }
  }
  onScrollDown() {
    this.sum += 6;
    this.isLoading = true;
    let self = this;
    setTimeout(function() {
      self.addItems(this.articleIndex, this.sum);
      self.isLoading = false;
    }, 1000);
  }

  toggleBookmark(articleId: string) {
    let userId = this.authService.userProfile.identities[0].user_id;
    this.userService.toggleBookmark(userId, articleId).then((res) => {
      if (res.status == 202) {
        this.checkBookmarked(articleId, userId);
      }
    });
  }

  checkBookmarked(articleId: string, userId: string): Promise<any> {
    return this.userService.getBookmarks(userId).then((res) => {
      this.bookmarkedArticles = res;
      this.idList = [];
      this.bookmarkedArticles.map((article) => this.idList.push(article._id));
    })
  }
}
