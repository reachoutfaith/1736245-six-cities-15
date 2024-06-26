import {createAsyncThunk} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Endpoints } from '../../services/constants';
import { TOffer } from '../../services/types/offers';
import { TReview, TReviewForm } from '../../services/types/reviews';
import { TAppDispatch, TRootState } from '..';

export const fetchOffers = createAsyncThunk<TOffer[], void, {
    extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { extra: api }) => {
    const response = await api.get<TOffer[]>(Endpoints.Offers);
    return response.data;
  }
);

export const fetchCurrentOffer = createAsyncThunk<TOffer, string, {
  extra: AxiosInstance;
}>(
  'fetchCurrentOffer',
  async (id, { extra: api }) => {
    const response = await api.get<TOffer>(`${Endpoints.Offers}/${id}`);
    return response.data;
  }
);


export const fetchNearByOffers = createAsyncThunk<TOffer[], string, {
  extra: AxiosInstance;
}
>(
  'fetchNearByOffers',
  async (id, { extra: api }) => {
    const response = await api.get<TOffer[]>(`${Endpoints.Offers}/${id}/nearby`);
    return response.data;
  }
);


export const fetchReviews = createAsyncThunk<TReview[], string, {
  extra: AxiosInstance;
}
>(
  'fetchReviews',
  async (id, { extra: api }) => {
    const response = await api.get<TReview[]>(`${Endpoints.Comments}/${id}`);
    return response.data;
  }
);


export const sendReview = createAsyncThunk<void, { id: string; review: TReviewForm }, {
  dispatch: TAppDispatch;
  state: TRootState;
  extra: AxiosInstance;
}
>(
  'sendReview',
  async ({ id, review }, { dispatch, extra: api }) => {
    const response = await api.post<TReview>(`${Endpoints.Comments}/${id}`, review);
    if (response.status === 201) {
      dispatch(fetchReviews(id));
    } else {
      throw new Error('Failed to post review');
    }
  }
);


export const fetchFavorites = createAsyncThunk<TOffer[], undefined, {
  extra: AxiosInstance;
}
>(
  'fetchFavorites',
  async (_arg, { extra: api }) => {
    const response = await api.get<TOffer[]>(Endpoints.Favorite);
    return response.data;
  }
);


export const toggleFavorite = createAsyncThunk<TOffer, { id: string; isFavorite: boolean }, {
  dispatch: TAppDispatch;
  state: TRootState;
  extra: AxiosInstance;
}
>(
  'toggleFavorite',
  async ({ id, isFavorite }, {dispatch, extra: api }) => {
    try {
      const response = await api.post<TOffer>(`${Endpoints.Favorite}/${id}/${Number(isFavorite)}`);
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchFavorites());
        dispatch(fetchOffers());
        return response.data;
      } else {
        throw new Error('Failed to toggle');
      }
    } catch (error) {

      throw new Error('An error occurred while toggling favorite status');
    }
  }
);

