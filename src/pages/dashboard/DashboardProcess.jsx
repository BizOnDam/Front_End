import { supplierDetailData } from '../../data/supplierData';

export const getTopSuppliers = (maxRows) => {
  const suppliersToShow = [...supplierDetailData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxRows);
  while (suppliersToShow.length < maxRows) suppliersToShow.push(null);
  return suppliersToShow;
}; 