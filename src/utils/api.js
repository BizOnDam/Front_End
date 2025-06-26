// export async function safeFetchJson(endpoint, method = 'GET', body = null) {
//   const options = {
//     method,
//     headers: { 'Content-Type': 'application/json' },
//     ...(body && { body: JSON.stringify(body) }),
//   };

//   const res = await fetch(endpoint, options);
//   const contentType = res.headers.get('Content-Type');

//   if (!contentType?.includes('application/json')) {
//     throw new Error('서버 응답 형식이 올바르지 않습니다.');
//   }

//   const result = await res.json();

//   if (!res.ok) {
//     throw new Error(result.message || '요청 실패');
//   }

//   return result;
// }

// export function handleApiError(error) {
//   console.error('API 에러:', error);
//   alert(error.message || '알 수 없는 오류가 발생했습니다.');
// }