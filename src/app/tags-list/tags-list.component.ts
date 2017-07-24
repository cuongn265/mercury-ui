import { Component, OnInit } from '@angular/core';
import { TagService } from './tag.service';
import { Tag } from '../article/tag';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  providers: [TagService]
})
export class TagsListComponent implements OnInit {

  tagsList: Tag[] = [];
  displayDialog: boolean;

  tag: Tag = new Tag();

  selectedTag: Tag;

  newTag: boolean;

  stacked: boolean = false;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.getTagsList().then(res => { this.tagsList = res; });
  }

  showDialogToAdd() {
    this.newTag = true;
    this.tag = new Tag();
    this.displayDialog = true;
  }

  save() {
    let tags = [...this.tagsList];
    if (this.newTag) {
      this.tagService.addTag(this.tag).then(res => {
        tags.push(this.tag);
        this.tagsList = tags;
        let self = this;
        this.refresh(self);
      })
    }
    else {
      this.tagService.updateTag(this.tag).then(res => {
        // tags.push(this.tag);
        // this.tagsList = tags ;
        let self = this;
        this.refresh(self);
      })
    }
    this.tagsList = tags;
    this.tag = null;
    this.displayDialog = false;
  }

  delete() {
    if (this.newTag == true) {
      this.displayDialog = false;
      return true;
    };

    let index = this.findSelectedTagIndex();
    this.tagService.deleteTag(this.tag._id).then(res => {
      this.tag = null;
      this.displayDialog = false;
      let self = this;
      this.refresh(self);
    })
  }

  onRowSelect(event) {
    this.newTag = false;
    this.tag = this.cloneTag(event.data);
    this.displayDialog = true;
  }

  cloneTag(t: Tag): Tag {
    let tag = new Tag();
    for (let prop in t) {
      tag[prop] = t[prop];
    }
    return tag;
  }

  findSelectedTagIndex() {
    return this.tagsList.indexOf(this.selectedTag);
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  refresh(self: any) {
    setTimeout(function () {
        self.tagService.getTagsList().then(
          (response) => {
            self.tagsList = response;
          }
        );
      }, 1);
  }

}
