import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { ChallengeCategory } from 'src/app/_models';
import { ChallengeService } from 'src/app/_services';


@Component({
    templateUrl: './administration.component.html'
})
export class AdministrationComponent {
  categoryForm: FormGroup;
  loading = false;
  categorySubmitted = false;
  categorySuccess = false;
  categoryError = '';

  challengeForm: FormGroup;
  challengeSubmitted = false;
  challengeSuccess = false;
  challengeError = '';

  public categories$!: Observable<ChallengeCategory[]>;
  public updateParentUser!: Function;

  JSON = JSON;

  constructor(
    private formBuilder: FormBuilder,
    private challengeService: ChallengeService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{3,40}$/)]],
    });

    this.challengeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_\s]{3,40}$/)]],
      description: [''],
      category: ['', Validators.required],
      difficulty: ['EASY', Validators.required],
      flag: ['', Validators.required],
      points: [0, Validators.required],
      hint: [''],
      resourceType: ['link', Validators.required],
      resourceUrl: [''],
      resourceFile: [''],
      resourceFileSource: ['']
    });

    this.updateCategoriesObservable();
  }

  updateCategoriesObservable() {
    this.categories$ = this.challengeService.getChallengeCategories();
  }

  get categoryName() { return this.categoryForm.get('name')!; }

  get challengeTitle() { return this.challengeForm.get('title')!; }
  get challengeDescription() { return this.challengeForm.get('description')!; }
  get challengeCategory() { return this.challengeForm.get('category')!; }
  get challengeDifficulty() { return this.challengeForm.get('difficulty')!; }
  get challengeFlag() { return this.challengeForm.get('flag')!; }
  get challengePoints() { return this.challengeForm.get('points')!; }
  get challengeHint() { return this.challengeForm.get('hint')!; }
  get challengeResourceType() { return this.challengeForm.get('resourceType')!; }
  get challengeResourceUrl() { return this.challengeForm.get('resourceUrl')!; }
  get challengeResourceFile() { return this.challengeForm.get('resourceFile')!; }

  onCategorySubmit() {
    this.categorySubmitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    this.loading = true;
    this.categorySuccess = false;
    this.categoryError = '';
    this.challengeService.createChallengeCategory(this.categoryName.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.categorySuccess = true;
          this.loading = false;
          this.updateCategoriesObservable();
        },
        error: (error) => {
          console.log(error);
          this.categoryError = error;
          this.loading = false;
        }
      });
  }

  onChallengeSubmit() {
    this.challengeSubmitted = true;

    if (this.challengeForm.invalid) {
      return;
    }

    const resourceType = this.challengeResourceType.value;
    const resourceUrl = this.challengeResourceUrl.value;
    const resourceFile = this.challengeResourceFile.value;
    const resourceFileSource = this.challengeForm.get('resourceFileSource')!.value

    if (resourceType === 'link' && resourceUrl.length === 0) {
      return;
    }
    if (resourceType === 'file' && resourceFile.length === 0) {
      return;
    }

    this.loading = true;
    this.challengeSuccess = false;
    this.challengeError = '';
    this.challengeService.createChallenge(
      this.challengeTitle.value,
      this.challengeDescription.value,
      this.challengeCategory.value,
      this.challengeDifficulty.value,
      this.challengeFlag.value,
      this.challengePoints.value,
      this.challengeHint.value,
      resourceType,
      resourceUrl,
      resourceFileSource
    ).pipe(first()).subscribe({
      next: () => {
        this.challengeSuccess = true;
        this.loading = false;
        if (this.updateParentUser) {
          this.updateParentUser();
        }
      },
      error: (error) => {
        console.log(error);
        this.challengeError = error;
        this.loading = false;
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.challengeForm.patchValue({
        resourceFileSource: file
      });
    }
  }
}
