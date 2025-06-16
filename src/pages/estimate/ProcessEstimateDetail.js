// import { useState, useEffect } from 'react';
import axios from 'axios';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';

export const getEstimateDetail = async (requestId, responseId) => {
  try {
    const url = responseId
      ? `http://localhost:8083/api/contracts/${requestId}/${responseId}`
      : `http://localhost:8083/api/contracts/${requestId}`;
    
    console.log('▶ API 호출:', { url });
    const response = await axios.get(url);

    const transformedData = transformEstimateData(response.data.data);
    console.log('▶ 변환된 데이터:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('견적 상세 정보를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

const transformEstimateData = (data) => {
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

export const formatCurrency = (amount) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
};

export const findMatchingRequestItem = (items, responseItem) => {
  return items.find(item => item.item_id === responseItem.item_id);
};

export const rejectEstimate = async (requestId, role, userId) => {
  try {
    let url;
    let method;
    if (role === 'BUYER') {
      url = `http://localhost:8083/api/estimates/reject-buyer/${requestId}`;
      method = 'patch';
    } else if (role === 'SUPPLIER') {
      url = `http://localhost:8083/api/estimates/reject-supplier/${requestId}?supplierUserId=${userId}`;
      method = 'put';
    }
    
    const response = await axios[method](url);
    return response.data;
  } catch (error) {
    console.error('견적 거절에 실패했습니다:', error);
    throw error;
  }
};

export const acceptEstimate = async (requestId) => {
  try {
    const response = await axios.patch(`http://localhost:8083/api/estimates/${requestId}/accept`);
    return response.data;
  } catch (error) {
    console.error('견적 수락에 실패했습니다:', error);
    throw error;
  }
}; 