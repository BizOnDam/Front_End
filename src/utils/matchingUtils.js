export const processMatchingData = (matchingData) => {
    if (!matchingData) {
    console.log("매칭 데이터 없음. 로딩 중...");
    return { summary: "데이터를 불러오는 중입니다.", companyDetails: [] };
  }

  const { summary, commonSuppliers, perItemSuppliers } = matchingData;
  console.log("매칭 요약 정보:", summary);
  console.log("공통 추천 기업:", commonSuppliers);
  console.log("품목별 추천 기업:", perItemSuppliers);

  let allSuppliers = [];

  if (commonSuppliers?.length > 0) {
    allSuppliers = commonSuppliers;
  } else if (perItemSuppliers) {
    Object.values(perItemSuppliers).forEach(suppliers => {
      if (Array.isArray(suppliers)) allSuppliers.push(...suppliers);
    });
  }

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

  return { summary, companyDetails };
};
