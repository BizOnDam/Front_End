import { useEffect, useState } from 'react';
import { safeFetchJson, handleApiError } from '../../utils/api';

// 카테고리명만 가져오기
export function useCategoryData(setError) {
  const [categories, setCategories] = useState([]); // string[]만 저장됨
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching categories...');
    safeFetchJson('http://localhost:8083/api/product-meta/categories')
      .then((data) => { 
        console.log('Categories API response:', data);
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else if (data && data.data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error('Unexpected categories data format:', data);
          setCategories([]);
          setError('카테고리 데이터 형식이 올바르지 않습니다.');
        }
      })
      .catch(err => {
        console.error('Categories API error:', err);
        handleApiError(err, setError, '카테고리 불러오기 실패');
      })
      .finally(() => setLoading(false));
  }, [setError]);

  console.log('Current categories state:', categories);
  return { categories, loading };
}

export const createInitialItem = (id) => ({
  id,
  category_name: '',
  detail_category_name: '',
  product_id: null,
  specification: '',
  quantity: ''
});

// 카테고리 선택 시, 서버에서 detail 목록 요청
export const handleCategoryChange = async (
  itemId,
  categoryName,
  items,
  setItems,
  setSelectedDetailCategories,
  setError
) => {
  try {
    console.log('Fetching details for category:', categoryName);
    const detailList = await safeFetchJson(
      `http://localhost:8083/api/product-meta/details?category=${encodeURIComponent(categoryName)}`,
      'GET'
    );    

    console.log('Details API response:', detailList);

    // detailList가 배열이 아닌 경우 처리
    const details = Array.isArray(detailList) ? detailList : 
                   (detailList?.data && Array.isArray(detailList.data)) ? detailList.data :
                   (detailList?.details && Array.isArray(detailList.details)) ? detailList.details :
                   [];

    setSelectedDetailCategories(prev => ({
      ...prev,
      [itemId]: details
    }));

    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              category_name: categoryName,
              detail_category_name: '',
              product_id: null
            }
          : item
      )
    );
  } catch (err) {
    console.error('Error fetching details:', err);
    handleApiError(err, setError, '세부 카테고리 불러오기 실패');
  }
};

// 세부 카테고리 선택
export const handleDetailCategoryChange = (
  itemId,
  selectedDetailCategoryName,
  items,
  setItems,
  selectedDetailCategories
) => {
  const matched = selectedDetailCategories[itemId]?.find(
    item => item.detailCategoryName === selectedDetailCategoryName
  );

  setItems(prev =>
    prev.map(item =>
      item.id === itemId
        ? {
            ...item,
            detail_category_name: selectedDetailCategoryName,
            product_id: matched?.productId || null
          }
        : item
    )
  );
};

export const handleItemChange = (itemId, field, value, items, setItems) => {
  setItems(prev => 
    prev.map(item => item.id === itemId ? { ...item, [field]: value } : item
  ));
};

export const addItem = (items, setItems) => {
  setItems(prev => [...prev, createInitialItem(prev.length + 1)]);
};

export const removeItem = (itemId, items, setItems, setSelectedDetailCategories) => {
  if (items.length > 1) {
    setItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedDetailCategories(prev => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
  }
};

/**
 * @param {Event} e 
 * @param {Array} items 
 * @param {{due_date:string, detail:string}} form 
 * @param {function} setError 
 * @param {function} onSuccess  — 생성된 requestId를 받을 콜백
 * @param {Object} user - 현재 로그인한 사용자 정보
 */
export const handleSubmit = async (e, items, form, setError, onSuccess, user) => {
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
      'http://localhost:8083/api/estimates/create_request',
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
};