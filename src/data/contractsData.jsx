export const contractsData = [
  {
    contract_id: 1,
    response_id: 101,
    buyer_company_id: 1,
    supplier_company_id: 2,
    supplier_company_name: '예시 기업 1',
    item_description: '전자부품 (CPU, RAM, SSD 등)',
    contract_date: '2025-05-01',
    total_price: 50000000,
    status: 'PREPARING_DELIVERY',
    contract_file_url: 'https://example.com/contracts/contract1.pdf',
    tracking_number: null
  },
  {
    contract_id: 2,
    response_id: 102,
    buyer_company_id: 1,
    supplier_company_id: 3,
    supplier_company_name: '예시 기업 2',
    item_description: '반도체 (메모리 칩, 프로세서)',
    contract_date: '2025-05-03',
    total_price: 75000000,
    status: 'DELIVERING',
    contract_file_url: 'https://example.com/contracts/contract2.pdf',
    tracking_number: 'TRK123456789'
  },
  {
    contract_id: 3,
    response_id: 103,
    buyer_company_id: 1,
    supplier_company_id: 4,
    supplier_company_name: '예시 기업 3',
    item_description: 'PCB (메인보드, 그래픽카드용)',
    contract_date: '2025-05-06',
    total_price: 30000000,
    status: 'DELIVERED',
    contract_file_url: 'https://example.com/contracts/contract3.pdf',
    tracking_number: 'TRK987654321'
  },
  {
    contract_id: 4,
    response_id: 104,
    buyer_company_id: 1,
    supplier_company_id: 5,
    supplier_company_name: '예시 기업 4',
    item_description: '센서 부품',
    contract_date: '2025-05-10',
    total_price: 40000000,
    status: 'PREPARING_DELIVERY',
    contract_file_url: 'https://example.com/contracts/contract4.pdf',
    tracking_number: null
  },
  {
    contract_id: 5,
    response_id: 105,
    buyer_company_id: 1,
    supplier_company_id: 6,
    supplier_company_name: '예시 기업 5',
    item_description: '디스플레이 모듈',
    contract_date: '2025-05-12',
    total_price: 90000000,
    status: 'DELIVERING',
    contract_file_url: 'https://example.com/contracts/contract5.pdf',
    tracking_number: 'TRK20250512001'
  },
  {
    contract_id: 6,
    response_id: 106,
    buyer_company_id: 1,
    supplier_company_id: 7,
    supplier_company_name: '예시 기업 6',
    item_description: '배터리 셀',
    contract_date: '2025-05-14',
    total_price: 55000000,
    status: 'PREPARING_DELIVERY',
    contract_file_url: 'https://example.com/contracts/contract6.pdf',
    tracking_number: null
  },
  {
    contract_id: 7,
    response_id: 107,
    buyer_company_id: 1,
    supplier_company_id: 8,
    supplier_company_name: '예시 기업 7',
    item_description: '커넥터 및 케이블',
    contract_date: '2025-05-15',
    total_price: 20000000,
    status: 'DELIVERED',
    contract_file_url: 'https://example.com/contracts/contract7.pdf',
    tracking_number: 'TRK20250515002'
  },
  {
    contract_id: 8,
    response_id: 108,
    buyer_company_id: 1,
    supplier_company_id: 9,
    supplier_company_name: '예시 기업 8',
    item_description: '전원공급장치 (PSU)',
    contract_date: '2025-05-18',
    total_price: 35000000,
    status: 'DELIVERING',
    contract_file_url: 'https://example.com/contracts/contract8.pdf',
    tracking_number: 'TRK20250518003'
  },
  {
    contract_id: 9,
    response_id: 109,
    buyer_company_id: 1,
    supplier_company_id: 10,
    supplier_company_name: '예시 기업 9',
    item_description: '팬/열관리 시스템',
    contract_date: '2025-05-20',
    total_price: 15000000,
    status: 'DELIVERED',
    contract_file_url: 'https://example.com/contracts/contract9.pdf',
    tracking_number: 'TRK20250520004'
  },
  {
    contract_id: 10,
    response_id: 110,
    buyer_company_id: 1,
    supplier_company_id: 11,
    supplier_company_name: '예시 기업 10',
    item_description: 'LED 모듈',
    contract_date: '2025-05-22',
    total_price: 60000000,
    status: 'PREPARING_DELIVERY',
    contract_file_url: 'https://example.com/contracts/contract10.pdf',
    tracking_number: null
  },
  {
    contract_id: 11,
    response_id: 111,
    buyer_company_id: 1,
    supplier_company_id: 12,
    supplier_company_name: '예시 기업 11',
    item_description: '무선통신 모듈',
    contract_date: '2025-05-25',
    total_price: 70000000,
    status: 'DELIVERING',
    contract_file_url: 'https://example.com/contracts/contract11.pdf',
    tracking_number: 'TRK20250525005'
  },
  {
    contract_id: 12,
    response_id: 112,
    buyer_company_id: 1,
    supplier_company_id: 13,
    supplier_company_name: '예시 기업 12',
    item_description: '고성능 네트워크 칩셋',
    contract_date: '2025-05-29',
    total_price: 65000000,
    status: 'CONTRACTING',
    contract_file_url: null,
    tracking_number: null
  }
  
];

// 견적 요청 데이터
export const estimateRequestsData = [
  {
    request_id: 1,
    buyer_id: 1,
    category: '전자부품',
    quantity: 100,
    due_date: '2025-06-01', 
    detail: 'CPU, RAM, SSD 등 전자부품 구매',
    status: 'CLOSED',
    created_at: '2025-05-01 10:00:00'
  },
  {
    request_id: 2,
    buyer_id: 1,
    category: '반도체',
    quantity: 50,
    due_date: '2025-06-05', 
    detail: '메모리 칩, 프로세서 구매',
    status: 'CLOSED',
    created_at: '2025-05-02 14:30:00'
  },
  {
    request_id: 5,
    buyer_id: 1,
    category: '배터리',
    quantity: 120,
    due_date: '2025-06-18', 
    detail: '배터리 셀 대량 구매',
    status: 'CLOSED',
    created_at: '2025-05-08 10:20:00'
  },
  {
    request_id: 3,
    buyer_id: 1,
    category: '센서',
    quantity: 70,
    due_date: '2025-06-10', 
    detail: '각종 센서류 구매',
    status: 'CLOSED',
    created_at: '2025-05-04 09:15:00'
  },
  {
    request_id: 4,
    buyer_id: 1,
    category: '디스플레이',
    quantity: 40,
    due_date: '2025-06-15', 
    detail: 'LCD, OLED 디스플레이 모듈 구매',
    status: 'CLOSED',
    created_at: '2025-05-06 11:45:00'
  },
  {
    request_id: 6,
    buyer_id: 1,
    category: '커넥터',
    quantity: 500,
    due_date: '2025-06-20', 
    detail: '다양한 커넥터 및 케이블 구매',
    status: 'CLOSED',
    created_at: '2025-05-10 09:00:00'
  },
  {
    request_id: 7,
    buyer_id: 1,
    category: '전원공급장치',
    quantity: 30,
    due_date: '2025-06-24', 
    detail: '고출력 PSU 구매',
    status: 'CLOSED',
    created_at: '2025-05-12 15:00:00'
  },
  {
    request_id: 8,
    buyer_id: 1,
    category: '열관리시스템',
    quantity: 200,
    due_date: '2025-05-24', 
    detail: '팬 및 열 분산 장비 구매',
    status: 'CLOSED',
    created_at: '2025-05-13 11:30:00'
  },
  {
    request_id: 9,
    buyer_id: 1,
    category: 'LED',
    quantity: 1000,
    due_date: '2025-05-30', 
    detail: 'LED 조명 모듈',
    status: 'CLOSED',
    created_at: '2025-05-15 10:15:00'
  },
  {
    request_id: 10,
    buyer_id: 1,
    category: '무선통신',
    quantity: 80,
    due_date: '2025-06-06', 
    detail: 'Wi-Fi, BLE 모듈 구매',
    status: 'CLOSED',
    created_at: '2025-05-17 12:00:00'
  },
  {
    request_id: 11,
    buyer_id: 1,
    category: '센서',
    quantity: 90,
    due_date: '2025-06-25', 
    detail: '온습도, 적외선 센서 추가 구매',
    status: 'OPEN',
    created_at: '2025-05-20 16:00:00'
  },
  {
    request_id: 12,
    buyer_id: 1,
    category: '네트워크 장비',
    quantity: 60,
    due_date: '2025-06-28',
    detail: '고속 네트워크 칩셋 구매',
    status: 'OPEN',
    created_at: '2025-05-25 11:00:00'
  }
  
];


// 견적 응답 데이터
export const estimateResponsesData = [
  {
    response_id: 101,
    request_id: 1,
    supplier_id: 2,
    unit_price: 500000,
    delivery_days: 30,
    proposal_file_url: 'https://example.com/proposals/proposal1.pdf',
    created_at: '2025-05-01 12:00:00',
    is_read: 4 
  },
  {
    response_id: 102,
    request_id: 2,
    supplier_id: 3,
    unit_price: 1500000,
    delivery_days: 25,
    proposal_file_url: 'https://example.com/proposals/proposal2.pdf',
    created_at: '2025-05-03 15:00:00',
    is_read: 4 
  },
  {
    response_id: 103,
    request_id: 5,
    supplier_id: 4,
    unit_price: 450000,
    delivery_days: 20,
    proposal_file_url: 'https://example.com/proposals/proposal3.pdf',
    created_at: '2025-05-04 17:10:00',
    is_read: 4 
  },
  {
    response_id: 104,
    request_id: 3,
    supplier_id: 5,
    unit_price: 600000,
    delivery_days: 20,
    proposal_file_url: 'https://example.com/proposals/proposal4.pdf',
    created_at: '2025-05-05 10:20:00',
    is_read: 4 
  },
  {
    response_id: 105,
    request_id: 4,
    supplier_id: 6,
    unit_price: 2000000,
    delivery_days: 18,
    proposal_file_url: 'https://example.com/proposals/proposal5.pdf',
    created_at: '2025-05-07 13:40:00',
    is_read: 4 
  },
  {
    response_id: 106,
    request_id: 6,
    supplier_id: 7,
    unit_price: 40000,
    delivery_days: 15,
    proposal_file_url: 'https://example.com/proposals/proposal6.pdf',
    created_at: '2025-05-08 10:00:00',
    is_read: 4 
  },
  {
    response_id: 107,
    request_id: 7,
    supplier_id: 8,
    unit_price: 1200000,
    delivery_days: 22,
    proposal_file_url: 'https://example.com/proposals/proposal7.pdf',
    created_at: '2025-05-09 14:00:00',
    is_read: 4 
  },
  {
    response_id: 108,
    request_id: 8,
    supplier_id: 9,
    unit_price: 150000,
    delivery_days: 10,
    proposal_file_url: 'https://example.com/proposals/proposal8.pdf',
    created_at: '2025-05-11 09:20:00',
    is_read: 4 
  },
  {
    response_id: 109,
    request_id: 9,
    supplier_id: 10,
    unit_price: 5000,
    delivery_days: 12,
    proposal_file_url: 'https://example.com/proposals/proposal9.pdf',
    created_at: '2025-05-13 11:11:00',
    is_read: 4 
  },
  {
    response_id: 110,
    request_id: 10,
    supplier_id: 11,
    unit_price: 900000,
    delivery_days: 17,
    proposal_file_url: 'https://example.com/proposals/proposal10.pdf',
    created_at: '2025-05-15 15:30:00',
    is_read: 3 
  },
  {
    response_id: 111,
    request_id: 11,
    supplier_id: 12,
    unit_price: 700000,
    delivery_days: 14,
    proposal_file_url: 'https://example.com/proposals/proposal11.pdf',
    created_at: '2025-05-18 10:45:00',
    is_read: 2 
  },
  {
    response_id: 112,
    request_id: 12,
    supplier_id: 13,
    unit_price: 1083333,
    delivery_days: 12,
    proposal_file_url: 'https://example.com/proposals/proposal12.pdf',
    created_at: '2025-05-26 10:00:00',
    is_read: 1 
  }
];
