import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environments';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    setHeaders: {
      api_key: environment.apiKey,
    },
  });

  return next(request);
};
