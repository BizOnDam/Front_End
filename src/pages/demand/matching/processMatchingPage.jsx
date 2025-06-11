// 매칭 데이터 처리 함수
const processMatchingData = (matchingData) => {
  if (!matchingData) {
    return {
      summary: "데이터를 불러오는 중입니다.",
      companyDetails: []
    };
  }

  const { summary, commonSuppliers, perItemSuppliers } = matchingData;

  // 공급업체 데이터 추출 및 정리
  let allSuppliers = [];

  // commonSuppliers가 있는 경우
  if (commonSuppliers && commonSuppliers.length > 0) {
    allSuppliers = commonSuppliers;
  } 
  // perItemSuppliers만 있는 경우
  else if (perItemSuppliers) {
    Object.values(perItemSuppliers).forEach(suppliers => {
      if (suppliers && suppliers.length > 0) {
        allSuppliers = [...allSuppliers, ...suppliers];
      }
    });
  }

  // 공급업체가 없는 경우
  if (allSuppliers.length === 0) {
    return {
      summary: summary || "추천 가능한 공급업체가 없습니다.",
      topCompany: {
        name: "데이터 없음",
        businessNumber: ""
      },
      companyDetails: []
    };
  }

  // 공급업체별로 데이터 그룹화
  const supplierGroups = allSuppliers.reduce((acc, supplier) => {
    const key = supplier.supplierBizno;
    if (!acc[key]) {
      acc[key] = {
        businessNumber: supplier.supplierBizno,
        companyName: supplier.supplierName,
        products: []
      };
    }
    acc[key].products.push({
      detailCategoryName: supplier.detailCategoryName,
      matchedQuantity: supplier.matchedQuantity,
      transactionCount: supplier.transactionCount,
      leadTime: supplier.leadTimeDays
    });
    return acc;
  }, {});

  // 기업별 상세 정보 구성
  const companyDetails = Object.values(supplierGroups).map(supplier => ({
    companyName: supplier.companyName,
    businessNumber: supplier.businessNumber,
    products: supplier.products.map(product => ({
      name: product.detailCategoryName,
      transactionCount: product.transactionCount,
      leadTime: product.leadTime,
      matchedQuantity: product.matchedQuantity
    }))
  }));

  return {
    summary,
    companyDetails
  };
};

export default processMatchingData; 