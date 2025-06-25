import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchCategories, fetchDetailCategories, createEstimateRequest, handleApiError } from '../../api/estimateApi';

export const useEstimateForm = (onSuccess) => {
  const { user } = useAuth(); 
  const [form, setForm] = useState({ due_date: '', detail: '' });
  const [items, setItems] = useState([{ id: 1, category_name: '', detail_category_name: '', product_id: null, specification: '', quantity: '' }]);
  const [selectedDetailCategories, setSelectedDetailCategories] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        else if (Array.isArray(data.data)) setCategories(data.data);
        else setError('카테고리 데이터 형식이 올바르지 않습니다.');
      })
      .catch((err) => handleApiError(err, setError, '카테고리 불러오기 실패'))
      .finally(() => setLoading(false));
  }, []);

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = async (itemId, categoryName) => {
    try {
      const detailList = await fetchDetailCategories(categoryName);
      const details = Array.isArray(detailList) ? detailList :
        (Array.isArray(detailList.data) ? detailList.data : []);

      setSelectedDetailCategories(prev => ({
        ...prev,
        [itemId]: details
      }));

      setItems(prev =>
        prev.map(item =>
          item.id === itemId ? {
            ...item,
            category_name: categoryName,
            detail_category_name: '',
            product_id: null
          } : item
        )
      );
    } catch (err) {
      handleApiError(err, setError, '세부 카테고리 불러오기 실패');
    }
  };

  const handleDetailCategoryChange = (itemId, detailCategoryName) => {
    const matched = selectedDetailCategories[itemId]?.find(
      item => item.detailCategoryName === detailCategoryName
    );

    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              detail_category_name: detailCategoryName,
              product_id: matched?.productId || null
            }
          : item
      )
    );
  };

  const handleItemChange = (itemId, field, value) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    setItems(prev => [...prev, {
      id: prev.length + 1,
      category_name: '',
      detail_category_name: '',
      product_id: null,
      specification: '',
      quantity: ''
    }]);
  };

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedDetailCategories(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }

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
      const result = await createEstimateRequest(payload);
      const requestId = result?.requestId || (Array.isArray(result) && result[0]?.requestId);
      if (!requestId) throw new Error('requestId를 찾을 수 없습니다.');
      onSuccess(requestId);
    } catch (err) {
      handleApiError(err, setError, '견적 요청 실패');
    }
  };

  return {
    form, items, categories, loading, error,
    selectedDetailCategories,
    handleFormChange,
    handleCategoryChange,
    handleDetailCategoryChange,
    handleItemChange,
    addItem,
    removeItem,
    handleSubmit
  };
};
