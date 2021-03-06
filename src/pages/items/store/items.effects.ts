/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-10-2017
 */

 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs';
 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import * as Item from './items.actions';
 import { ItemsService } from '../items.service';

 @Injectable()
 export class ItemsEffects {

   constructor(
     private action$: Actions,
     private _database: ItemsService
   ) {
   }

   @Effect() loadAction$ = this.action$
       .ofType(Item.ItemsActions.LOAD)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => this._database.get())
       .take(1)
       .switchMap(result=> Observable.of(new Item.LoadSuccessAction(result)))
       .catch(err => Observable.of(new Item.ErrorAction(err)))

  /**
  * ::: Currently not working :::
  * Start Observable data on Todo added (realTime database)
  */
  //  @Effect() addedSubscriptionAction$ = this.action$
  //      .ofType(Item.ItemsActions.LOAD_SUCCESS)
  //      .map<Action, any>(toPayload)
  //      .switchMap((payload:any) => this._database.subscribAdded())
  //      .switchMap(result=> Observable.of(new Item.CreateSuccessAction(result)))
  //      .catch(err => Observable.of(new Item.ErrorAction({message:`addedSubscriptionAction Error: ${err.toString()}`})))

   @Effect() updateAction$ = this.action$
       .ofType(Item.ItemsActions.UPDATE)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => this._database.put(payload))
       .switchMap(result=> Observable.of(new Item.UpdateSuccessAction(result)))
       .catch(err => Observable.of(new Item.ErrorAction(err)))

   @Effect() removeAction$ = this.action$
       .ofType(Item.ItemsActions.REMOVE)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => this._database.delete(payload))
       .switchMap(result=> Observable.of(new Item.RemoveSuccessAction(result)))
       .catch(err => Observable.of(new Item.ErrorAction(err)))

   @Effect() createAction$ = this.action$
       .ofType(Item.ItemsActions.CREATE)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => this._database.post(payload))
       .switchMap(result=> Observable.of(new Item.CreateSuccessAction(result)))
       .catch(err => Observable.of(new Item.ErrorAction(err)))

 }
