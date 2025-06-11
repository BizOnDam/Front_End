// 임시 카테고리 데이터 (나중에 API로 교체)
export const categories = [
  { code: "12345678", name: "전자부품" },
  { code: "23456789", name: "기계부품" },
  { code: "34567890", name: "사무용품" },
  { code: "45678901", name: "공구" }
];

export const detailCategories = {
  "12345678": [
    { code: "1234567890", name: "CPU" },
    { code: "1234567891", name: "케이블" },
    { code: "1234567892", name: "전원공급장치" }
  ],
  "23456789": [
    { code: "2345678901", name: "모터" }
  ],
  "34567890": [
    { code: "3456789002", name: "프린터 토너" }
  ],
  "45678901": [
    { code: "4567890103", name: "드릴" }
  ]
};

export const createInitialItem = (id) => ({
  id,
  category_code: '',
  category_name: '',
  detail_category_code: '',
  detail_category_name: '',
  specification: '',
  quantity: ''
});

export const handleCategoryChange = (itemId, categoryCode, items, setItems, setSelectedDetailCategories) => {
  const selectedCategory = categories.find(cat => cat.code === categoryCode);
  setSelectedDetailCategories(prev => ({
    ...prev,
    [itemId]: detailCategories[categoryCode] || []
  }));

  setItems(prev => prev.map(item => 
    item.id === itemId 
      ? {
          ...item,
          category_code: categoryCode,
          category_name: selectedCategory ? selectedCategory.name : '',
          detail_category_code: '',
          detail_category_name: ''
        }
      : item
  ));
};

export const handleDetailCategoryChange = (itemId, detailCategoryCode, items, setItems, selectedDetailCategories) => {
  const selectedDetailCategory = selectedDetailCategories[itemId]?.find(
    cat => cat.code === detailCategoryCode
  );

  setItems(prev => prev.map(item => 
    item.id === itemId 
      ? {
          ...item,
          detail_category_code: detailCategoryCode,
          detail_category_name: selectedDetailCategory ? selectedDetailCategory.name : ''
        }
      : item
  ));
};

export const handleItemChange = (itemId, field, value, items, setItems) => {
  setItems(prev => prev.map(item => 
    item.id === itemId 
      ? { ...item, [field]: value }
      : item
  ));
};

export const addItem = (items, setItems) => {
  setItems(prev => [
    ...prev,
    createInitialItem(prev.length + 1)
  ]);
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

export const handleSubmit = (e, items, form) => {
  e.preventDefault();
  const requestData = {
    items: items.map(item => ({
      category_code: item.category_code,
      category_name: item.category_name,
      detail_category_code: item.detail_category_code,
      detail_category_name: item.detail_category_name,
      specification: item.specification,
      quantity: parseInt(item.quantity)
    })),
    due_date: form.due_date,
    detail: form.detail
  };
  console.log('견적 요청 데이터:', requestData);
  alert('견적 요청이 완료되었습니다.');
  return requestData;
}; 