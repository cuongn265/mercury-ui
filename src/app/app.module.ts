import { Ng2OrderModule } from 'ng2-order-pipe';
import { UserComponent } from './user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';

import { MaterialModule } from '@angular/material';

import { TagInputModule } from "ngx-chips";


import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { AppRoutes } from './app.routing';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth-guard.service';
import { UsersListComponent } from './users-list/users-list.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';

import { UserService } from "./user/user.service";
import { SocketIOService } from './socket.io/socket-io.service';
import { LocalStorageService } from './technical/local-storage.service';

import {
  DataTableModule, ButtonModule, InputTextModule, DialogModule,
  DataGridModule, MenuModule, ContextMenuModule, PanelModule, ChartModule
} from 'primeng/primeng';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ModifyCommentDialogComponent } from './comment-dialog/modify-comment-dialog/modify-comment-dialog.component';
import { RemoveCommentDialogComponent } from './comment-dialog/remove-comment-dialog/remove-comment-dialog.component';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ReversePipe } from './reverse.pipe';
import { ArticleEditorComponent } from './articles-list/article-editor/article-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageCropperModule } from 'ng2-img-cropper';
import { CommentComponent } from './article-detail/comment/comment.component';
import { MentionModule } from 'angular2-mentions/mention';
import { SwiperModule } from 'angular2-useful-swiper';
import { SwiperComponent } from './swiper/swiper.component';
import { LandingComponent } from './landing/landing.component';
import { CategoryTimelineComponent } from './landing/category-timeline/category-timeline.component';
import {MomentModule} from 'angular2-moment';
import {ScrollToModule} from 'ng2-scroll-to';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ComponentInteractionService } from './component-interaction.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleDetailComponent,
    AdminComponent,
    UserComponent,
    UsersListComponent,
    ArticlesListComponent,
    DashboardComponent,
    ModifyCommentDialogComponent,
    RemoveCommentDialogComponent,
    DashboardComponent,
    ReversePipe,
    ArticleEditorComponent,
    ConfirmDialogComponent,
    CommentComponent,
    SwiperComponent,
    LandingComponent,
    CategoryTimelineComponent,
    BookmarkComponent,
    TagsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(AppRoutes, { useHash: true} ),
    ShareButtonsModule,
    DataTableModule,
    ButtonModule,
    InputTextModule,
    TagInputModule,
    DialogModule,
    DataGridModule,
    MenuModule,
    ContextMenuModule,
    PanelModule,
    ChartModule,
    CKEditorModule,
    Ng2PaginationModule,
    BrowserAnimationsModule,
    MentionModule,
    SwiperModule,
    Ng2OrderModule,
    MomentModule,
    ShareButtonsModule.forRoot(),
    ScrollToModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    FlexLayoutModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    ImageCropperModule,
  ],
  providers: [AuthGuard, AuthService, SocketIOService, LocalStorageService, ComponentInteractionService],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    RemoveCommentDialogComponent,
    ModifyCommentDialogComponent
  ],
})
export class AppModule { }
