// flat → nested 구조 변환
export function mapFlatToNested(flatList, role) {
  return flatList.map(e => {
    return {
      request: {
        request_id: e.requestId,
        status: e.requestStatus,
        created_at: e.requestCreatedAt,
        due_date: e.dueDate,
        detail: e.detail,
        buyer_company_id: e.buyerCompanyId,
        supplier_company_id: e.supplierCompanyId,
        company_name: role === 'buyer' ? e.supplierCompanyName : e.buyerCompanyName
      },
      response: e.responseId ? {
        response_id: e.responseId,
        status: e.responseStatus,
        total_price: e.totalPrice,
        created_at: e.responseCreatedAt
      } : null,
      items: (e.items||[]).map(it => ({
        detail_category_name: it.detailCategoryName,
        product_id: it.productId,
        quantity: it.quantity
      }))
    };
  });
}

// 상세 변환
export function transformEstimateData(data) {
  return {
    request: {
      request_id: data.requestId,
      status: data.requestStatus,
      due_date: data.dueDate,
      created_at: data.requestCreatedAt,
      detail: data.detail || '-',
      buyer_company_name: data.buyerCompanyName,
      supplier_company_name: data.supplierCompanyName
    },
    items: data.items.map(item => ({
      item_id: item.itemId,
      category_name: item.categoryName,
      detail_category_name: item.detailCategoryName,
      quantity: item.quantity,
      specification: item.specification
    })),
    response: data.responseId ? {
      response_id: data.responseId,
      status: data.responseStatus,
      payment_terms: data.paymentTerms || '-',
      warranty: data.warranty || '-',
      special_terms: data.specialTerms || '-',
      total_price: data.totalPrice,
      created_at: data.responseCreatedAt
    } : null,
    response_items: data.items
      .filter(item => item.responseItemId)
      .map(item => ({
        response_item_id: item.responseItemId,
        item_id: item.itemId,
        unit_price: item.unitPrice,
        delivery_days: item.deliveryDays
      }))
  };
};
// 화폐 포맷
export const formatCurrency = amount => {
  return amount != null
    ? new Intl.NumberFormat('ko-KR', { 
        style: 'currency', 
        currency: 'KRW' 
    }).format(amount)
    : '-';
};

// 아이템
export const findMatchingRequestItem = (items, responseItem) => {
  return items.find(item => item.item_id === responseItem.item_id);
};