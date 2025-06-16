export async function safeFetchJson(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  };

  const res = await fetch(endpoint, options);
  const contentType = res.headers.get('Content-Type');

  if (!contentType?.includes('application/json')) {
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || '요청 실패');
  }

  return result;
}
  
export function handleApiError(err, setError, defaultMsg = '요청 처리 중 오류가 발생했습니다.') {
  console.error(err);
  setError(err.message || defaultMsg);
}
  