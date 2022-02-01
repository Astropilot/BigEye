import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from  'rxjs';

import { environment } from './../../environments/environment';
import { Challenge, ChallengeCategory, ChallengeResolve } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  constructor(private http: HttpClient) { }

  getChallengeCategories(): Observable<ChallengeCategory[]> {
    return this.http.get<ChallengeCategory[]>(`${environment.apiUrl}/api/challenges/categories`);
  }

  createChallengeCategory(name: string): Observable<ChallengeCategory> {
    const payload = new HttpParams().set('name', name);

    return this.http.post<ChallengeCategory>(`${environment.apiUrl}/api/challenges/categories`, payload);
  }

  getChallenges(category_id: number | string): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${environment.apiUrl}/api/categories/${category_id}/challenges`);
  }

  getChallenge(challenge_id: number | string): Observable<Challenge> {
    return this.http.get<Challenge>(`${environment.apiUrl}/api/challenges/${challenge_id}`);
  }

  createChallenge(title: string, description: string, category_id: string | number, difficulty: string, flag: string, points: string, hint: string, resourceType: string, resourceUrl: string, resourceFileSource: any): Observable<Challenge> {
    const formData = new FormData();

    formData.append('title', title);

    if (description.length > 0)
      formData.append('description', description);

    formData.append('difficulty', difficulty);
    formData.append('flag', flag);
    formData.append('points', points);

    if (hint.length > 0)
      formData.append('hint', hint);

    if (resourceType === 'link')
      formData.append('link', resourceUrl);
    else if (resourceType === 'file')
      formData.append('file', resourceFileSource);

    return this.http.post<Challenge>(`${environment.apiUrl}/api/categories/${category_id}/challenges`, formData);
  }

  resolveChallenge(challenge_id: number | string, flag: string): Observable<ChallengeResolve> {
    const payload = new HttpParams().set('flag', flag);

    return this.http.post<ChallengeResolve>(`${environment.apiUrl}/api/challenges/${challenge_id}/resolve`, payload);
  }
}
