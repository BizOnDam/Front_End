import { safeFetchJson, handleApiError } from './apiUtils';

export async function handleSubmitEstimate(e, items, form, user, onSuccess, setError) {
  e.preventDefault();
  const payload = {
    buyerUserId: user.userId,
    buyerCompanyId: user.companyId,
    detail: form.detail,
    dueDate: form.due_date,
    items: items.map(item => ({
      itemId: item.id,
      productId: item.product_id,
      specification: item.specification,
      quantity: parseInt(item.quantity, 10)
    }))
  };
  try {
    const result = await safeFetchJson(
        '/estimate-service/api/estimates/create_request', 
        'POST', 
        payload
    );

    console.log('API Response:', result); // API 응답 확인

    if (!result) {
      throw new Error('서버로부터 응답을 받지 못했습니다.');
    }

    const requestId = result.requestId || (Array.isArray(result) && result[0]?.requestId);
    if (!requestId) {
      throw new Error('생성된 requestId를 찾을 수 없습니다.');
    }

    onSuccess(requestId);
  } catch (err) {
    handleApiError(err, setError, '견적 요청 생성 실패');
  }
}