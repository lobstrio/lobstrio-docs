export function getStatusBadgeClass(status: number): string {
  if (status >= 200 && status < 300) return 'badge-get';
  if (status >= 400 && status < 500) return 'badge-delete';
  if (status >= 500) return 'badge-delete';
  return 'badge-post';
}

export function getStatusText(status: number): string {
  const statusTexts: Record<number, string> = {
    100: 'Created',
    120: 'Synchronizing',
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };
  return statusTexts[status] || '';
}
