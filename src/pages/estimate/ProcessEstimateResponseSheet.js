import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const createEstimateResponse = async (responseData) => {
  try {
    const response = await axios.post(
      'http://localhost:8083/api/estimates/create_response',
      responseData
    );

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error(response.data.message || '견적 응답 생성에 실패했습니다.');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || '견적 응답 생성 중 오류가 발생했습니다.');
  }
};

export const processEstimateResponse = async (formData, requestId, user, estimate) => {
  try {
    // 총 가격 계산
    const totalPrice = formData.items.reduce((sum, item) => {
      return sum + (Number(item.unit_price) * Number(estimate.items.find(i => i.item_id === item.item_id).quantity));
    }, 0);

    const responseData = {
      requestId: Number(requestId),
      supplierUserId: Number(user.userId),
      totalPrice: totalPrice,
      paymentTerms: formData.payment_terms,
      warranty: formData.warranty,
      specialTerms: formData.special_terms,
      responseItems: formData.items.map(item => ({
        itemId: Number(item.item_id),
        unitPrice: Number(item.unit_price),
        deliveryDays: Number(item.delivery_days)
      }))
    };

    const response = await createEstimateResponse(responseData);
    return {
      success: true,
      data: response.data,
      companyName: estimate.request.buyer_company_name
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

function ProcessEstimateResponseSheet({ user, itemsFromDetail, buyerCompanyName }) {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState(
    itemsFromDetail.map((item) => ({
      ...item,
      unitPrice: '',
      deliveryDays: ''
    }))
  );

  const [form, setForm] = useState({
    paymentTerms: '',
    warranty: '',
    specialTerms: ''
  });

  const [error, setError] = useState('');

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalPrice = items.reduce((sum, item) => sum + Number(item.unitPrice || 0), 0);

      const responseData = {
        requestId: Number(requestId),
        supplierUserId: user.userId,
        totalPrice,
        paymentTerms: form.paymentTerms,
        warranty: form.warranty,
        specialTerms: form.specialTerms,
        responseItems: items.map((item) => ({
          itemId: item.itemId,
          unitPrice: Number(item.unitPrice),
          deliveryDays: Number(item.deliveryDays)
        }))
      };

      const response = await createEstimateResponse(responseData);
      if (response.success) {
        alert(`${buyerCompanyName}에 견적 응답이 발송되었습니다!`);
        navigate('/estimateList');
      } else {
        setError(response.data);
      }
    } catch (err) {
      console.error(err);
      setError('서버 오류가 발생했습니다.');
    }
  };
}

export default ProcessEstimateResponseSheet;
