import { useEffect, useState } from 'react';
import { getEstimateDetail, createEstimateResponse } from '../../api/estimateApi';

export function useEstimateResponseForm(requestId, user, navigate) {
  const [estimate, setEstimate] = useState(null);
  const [formData, setFormData] = useState({
    payment_terms: '',
    warranty: '',
    special_terms: '',
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getEstimateDetail(requestId);
        setEstimate(data);
        setFormData((prev) => ({
          ...prev,
          items: data.items.map((item) => ({
            item_id: item.item_id,
            unit_price: '',
            delivery_days: '',
          })),
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [requestId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 총 가격 계산
    const totalPrice = formData.items.reduce((sum, item) => {
      return sum + (Number(item.unit_price) * Number(estimate.items.find(i => i.item_id === item.item_id).quantity));
    }, 0);

    const responseData = {
      requestId, 
      supplierUserId: user.userId,
      paymentTerms: formData.payment_terms,
      totalPrice: totalPrice,
      warranty: formData.warranty,
      specialTerms: formData.special_terms,
      responseItems: formData.items.map(item => ({
        itemId: Number(item.item_id),
        unitPrice: Number(item.unit_price),
        deliveryDays: Number(item.delivery_days)
      }))
   };

    try {
      const response = await createEstimateResponse(responseData);
      alert(`${response.companyName}에 견적 응답이 발송되었습니다!`);
      navigate('/estimateList');
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    estimate,
    formData,
    loading,
    error,
    handleInputChange,
    handleItemChange,
    handleSubmit,
  };
}
