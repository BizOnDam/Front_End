export const mockEstimateRequests = [
  {
    request: {
      request_id: 1,
      buyer_id: 101,
      supplier_id: 201,
      status: 1,
      detail: "전원공급장치, 프린터 토너, 케이블, CPU 구매 요청",
      due_date: "2025-05-17",
      created_at: "2025-05-02 00:00:00"
    },
    items: [
      {
        item_id: 10,
        request_id: 1,
        category_code: "12345678",
        category_name: "전자부품",
        detail_category_code: "1234567892",
        detail_category_name: "전원공급장치",
        specification: "개",
        quantity: 86
      },
      {
        item_id: 11,
        request_id: 1,
        category_code: "34567890",
        category_name: "사무용품",
        detail_category_code: "3456789002",
        detail_category_name: "프린터 토너",
        specification: "개",
        quantity: 65
      },
      {
        item_id: 12,
        request_id: 1,
        category_code: "12345678",
        category_name: "전자부품",
        detail_category_code: "1234567891",
        detail_category_name: "케이블",
        specification: "개",
        quantity: 35
      },
      {
        item_id: 13,
        request_id: 1,
        category_code: "12345678",
        category_name: "전자부품",
        detail_category_code: "1234567890",
        detail_category_name: "CPU",
        specification: "개",
        quantity: 60
      }
    ],
    response: {
      response_id: 1,
      request_id: 1,
      status: 2,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 17869691,
      proposal_file_url: "https://example.com/proposal/1.pdf",
      created_at: "2025-05-04 00:00:00",
      supplier_id: 201
    },
    response_items: [
      {
        response_item_id: 10,
        response_id: 1,
        item_id: 10,
        unit_price: 87581,
        delivery_days: 10
      },
      {
        response_item_id: 11,
        response_id: 1,
        item_id: 11,
        unit_price: 69991,
        delivery_days: 3
      },
      {
        response_item_id: 12,
        response_id: 1,
        item_id: 12,
        unit_price: 49702,
        delivery_days: 6
      },
      {
        response_item_id: 13,
        response_id: 1,
        item_id: 13,
        unit_price: 67479,
        delivery_days: 5
      }
    ]
  },
  {
    request: {
      request_id: 2,
      buyer_id: 102,
      supplier_id: 202,
      status: 2,
      detail: "프린터 토너, 드릴, CPU 구매 요청",
      due_date: "2025-05-20",
      created_at: "2025-05-03 00:00:00"
    },
    items: [
      {
        item_id: 20,
        request_id: 2,
        category_code: "34567890",
        category_name: "사무용품",
        detail_category_code: "3456789002",
        detail_category_name: "프린터 토너",
        specification: "개",
        quantity: 77
      },
      {
        item_id: 21,
        request_id: 2,
        category_code: "45678901",
        category_name: "공구",
        detail_category_code: "4567890103",
        detail_category_name: "드릴",
        specification: "개",
        quantity: 78
      },
      {
        item_id: 22,
        request_id: 2,
        category_code: "12345678",
        category_name: "전자부품",
        detail_category_code: "1234567890",
        detail_category_name: "CPU",
        specification: "개",
        quantity: 73
      }
    ]
  },
  {
    request: {
      request_id: 3,
      buyer_id: 103,
      supplier_id: 203,
      status: 4,
      detail: "모터, 프린터 토너, 케이블, CPU 구매 요청",
      due_date: "2025-05-17",
      created_at: "2025-05-04 00:00:00"
    },
    items: [
      {
        item_id: 30,
        request_id: 3,
        category_code: "23456789",
        category_name: "기계부품",
        detail_category_code: "2345678901",
        detail_category_name: "모터",
        specification: "개",
        quantity: 54
      },
      {
        item_id: 31,
        request_id: 3,
        category_code: "34567890",
        category_name: "사무용품",
        detail_category_code: "3456789002",
        detail_category_name: "프린터 토너",
        specification: "개",
        quantity: 47
      },
      {
        item_id: 32,
        request_id: 3,
        category_code: "12345678",
        category_name: "전자부품",
        detail_category_code: "1234567891",
        detail_category_name: "케이블",
        specification: "개",
        quantity: 64
      },
      {
        item_id: 33,
        request_id: 3,
        category_code: "12345678",
        category_name: "전자부품",
        detail_category_code: "1234567890",
        detail_category_name: "CPU",
        specification: "개",
        quantity: 37
      }
    ],
    response: {
      response_id: 3,
      request_id: 3,
      status: 4,
      payment_terms: null,
      warranty: null,
      special_terms: null,
      total_price: null,
      proposal_file_url: null,
      created_at: "2025-05-06 00:00:00",
      supplier_id: 203
    }
  },
  {
    request: {
      request_id: 4,
      buyer_id: 104,
      supplier_id: 204,
      status: 3,
      detail: "CPU, 프린터 토너 구매 요청",
      due_date: "2025-05-21",
      created_at: "2025-05-05 00:00:00"
    },
    items: [
      {
        item_id: 40,
        request_id: 4,
        category_code: "12345678",
        category_name: "전자부품",
        detail_category_code: "1234567890",
        detail_category_name: "CPU",
        specification: "개",
        quantity: 92
      },
      {
        item_id: 41,
        request_id: 4,
        category_code: "34567890",
        category_name: "사무용품",
        detail_category_code: "3456789002",
        detail_category_name: "프린터 토너",
        specification: "개",
        quantity: 34
      }
    ],
    response: {
      response_id: 4,
      request_id: 4,
      status: 3,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 5944958,
      proposal_file_url: "https://example.com/proposal/4.pdf",
      created_at: "2025-05-07 00:00:00",
      supplier_id: 204
    },
    response_items: [
      {
        response_item_id: 40,
        response_id: 4,
        item_id: 40,
        unit_price: 29717,
        delivery_days: 5
      },
      {
        response_item_id: 41,
        response_id: 4,
        item_id: 41,
        unit_price: 94441,
        delivery_days: 14
      }
    ],
    contract: {
      contract_id: 1,
      response_id: 4,
      buyer_company_id: 104,
      supplier_company_id: 204,
      buyer_user_id: 104,
      supplier_user_id: 204,
      status: 2,
      contract_file_url: 'https://example.com/contracts/1.pdf',
      tracking_number: 'TRK-1001',
      created_at: '2025-05-07 00:00:00',
      updated_at: '2025-05-07 00:00:00'
    }
  },
  {
    request: {
      request_id: 5,
      buyer_id: 105,
      supplier_id: 205,
      status: 1,
      detail: "모터, 케이블 구매 요청",
      due_date: "2025-05-20",
      created_at: "2025-05-06 00:00:00"
    },
    items: [{
      item_id: 50,
      request_id: 5,
      category_code: "23456789",
      category_name: "기계부품",
      detail_category_code: "2345678901",
      detail_category_name: "모터",
      specification: "개",
      quantity: 48
    }, {
      item_id: 51,
      request_id: 5,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567891",
      detail_category_name: "케이블",
      specification: "개",
      quantity: 55
    }],
    response: {
      response_id: 5,
      request_id: 5,
      status: 2,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 4881897,
      proposal_file_url: "https://example.com/proposal/5.pdf",
      created_at: "2025-05-08 00:00:00",
      supplier_id: 205
    },
    response_items: [{
      response_item_id: 50,
      response_id: 5,
      item_id: 50,
      unit_price: 71989,
      delivery_days: 11
    }, {
      response_item_id: 51,
      response_id: 5,
      item_id: 51,
      unit_price: 25935,
      delivery_days: 3
    }]
  },
  {
    request: {
      request_id: 6,
      buyer_id: 106,
      supplier_id: 206,
      status: 3,
      detail: "CPU, 프린터 토너, 드릴, 전원공급장치 구매 요청",
      due_date: "2025-05-16",
      created_at: "2025-05-07 00:00:00"
    },
    items: [{
      item_id: 60,
      request_id: 6,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567890",
      detail_category_name: "CPU",
      specification: "개",
      quantity: 77
    }, {
      item_id: 61,
      request_id: 6,
      category_code: "34567890",
      category_name: "사무용품",
      detail_category_code: "3456789002",
      detail_category_name: "프린터 토너",
      specification: "개",
      quantity: 38
    }, {
      item_id: 62,
      request_id: 6,
      category_code: "45678901",
      category_name: "공구",
      detail_category_code: "4567890103",
      detail_category_name: "드릴",
      specification: "개",
      quantity: 25
    }, {
      item_id: 63,
      request_id: 6,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567892",
      detail_category_name: "전원공급장치",
      specification: "개",
      quantity: 45
    }],
    response: {
      response_id: 6,
      request_id: 6,
      status: 3,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 8025160,
      proposal_file_url: "https://example.com/proposal/6.pdf",
      created_at: "2025-05-09 00:00:00",
      supplier_id: 206
    },
    response_items: [{
      response_item_id: 60,
      response_id: 6,
      item_id: 60,
      unit_price: 47607,
      delivery_days: 3
    }, {
      response_item_id: 61,
      response_id: 6,
      item_id: 61,
      unit_price: 45552,
      delivery_days: 13
    }, {
      response_item_id: 62,
      response_id: 6,
      item_id: 62,
      unit_price: 19060,
      delivery_days: 14
    }, {
      response_item_id: 63,
      response_id: 6,
      item_id: 63,
      unit_price: 47821,
      delivery_days: 9
    }],
    contract: {
      contract_id: 2,
      response_id: 6,
      buyer_company_id: 106,
      supplier_company_id: 206,
      buyer_user_id: 106,
      supplier_user_id: 206,
      status: 2,
      contract_file_url: 'https://example.com/contracts/2.pdf',
      tracking_number: 'TRK-1002',
      created_at: '2025-05-09 00:00:00',
      updated_at: '2025-05-09 00:00:00'
    },
  },
  {
    request: {
      request_id: 7,
      buyer_id: 107,
      supplier_id: 207,
      status: 2,
      detail: "드릴, 케이블, CPU, 프린터 토너 구매 요청",
      due_date: "2025-05-30",
      created_at: "2025-05-08 00:00:00"
    },
    items: [{
      item_id: 70,
      request_id: 7,
      category_code: "45678901",
      category_name: "공구",
      detail_category_code: "4567890103",
      detail_category_name: "드릴",
      specification: "개",
      quantity: 16
    }, {
      item_id: 71,
      request_id: 7,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567891",
      detail_category_name: "케이블",
      specification: "개",
      quantity: 69
    }, {
      item_id: 72,
      request_id: 7,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567890",
      detail_category_name: "CPU",
      specification: "개",
      quantity: 64
    }, {
      item_id: 73,
      request_id: 7,
      category_code: "34567890",
      category_name: "사무용품",
      detail_category_code: "3456789002",
      detail_category_name: "프린터 토너",
      specification: "개",
      quantity: 49
    }],
    response: {
      response_id: 7,
      request_id: 7,
      status: 1,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 9828659,
      proposal_file_url: "https://example.com/proposal/7.pdf",
      created_at: "2025-05-10 00:00:00",
      supplier_id: 207
    },
    response_items: [{
      response_item_id: 70,
      response_id: 7,
      item_id: 70,
      unit_price: 37717,
      delivery_days: 11
    }, {
      response_item_id: 71,
      response_id: 7,
      item_id: 71,
      unit_price: 13055,
      delivery_days: 11
    }, {
      response_item_id: 72,
      response_id: 7,
      item_id: 72,
      unit_price: 71581,
      delivery_days: 7
    }, {
      response_item_id: 73,
      response_id: 7,
      item_id: 73,
      unit_price: 76392,
      delivery_days: 6
    }]
  },
  {
    request: {
      request_id: 8,
      buyer_id: 108,
      supplier_id: 208,
      status: 3,
      detail: "프린터 토너, 케이블, 전원공급장치 구매 요청",
      due_date: "2025-06-06",
      created_at: "2025-05-09 00:00:00"
    },
    items: [{
      item_id: 80,
      request_id: 8,
      category_code: "34567890",
      category_name: "사무용품",
      detail_category_code: "3456789002",
      detail_category_name: "프린터 토너",
      specification: "개",
      quantity: 11
    }, {
      item_id: 81,
      request_id: 8,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567891",
      detail_category_name: "케이블",
      specification: "개",
      quantity: 77
    }, {
      item_id: 82,
      request_id: 8,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567892",
      detail_category_name: "전원공급장치",
      specification: "개",
      quantity: 21
    }],
    response: {
      response_id: 8,
      request_id: 8,
      status: 3,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 4711491,
      proposal_file_url: "https://example.com/proposal/8.pdf",
      created_at: "2025-05-11 00:00:00",
      supplier_id: 208
    },
    response_items: [{
      response_item_id: 80,
      response_id: 8,
      item_id: 80,
      unit_price: 18958,
      delivery_days: 9
    }, {
      response_item_id: 81,
      response_id: 8,
      item_id: 81,
      unit_price: 32489,
      delivery_days: 3
    }, {
      response_item_id: 82,
      response_id: 8,
      item_id: 82,
      unit_price: 95300,
      delivery_days: 9
    }],
    contract: {
      contract_id: 3,
      response_id: 8,
      buyer_company_id: 108,
      supplier_company_id: 208,
      buyer_user_id: 108,
      supplier_user_id: 208,
      status: 2,
      contract_file_url: 'https://example.com/contracts/3.pdf',
      tracking_number: 'TRK-1003',
      created_at: '2025-05-11 00:00:00',
      updated_at: '2025-05-11 00:00:00'
    },
  },
  {
    request: {
      request_id: 9,
      buyer_id: 109,
      supplier_id: 209,
      status: 3,
      detail: "모터, 케이블 구매 요청",
      due_date: "2025-05-17",
      created_at: "2025-05-10 00:00:00"
    },
    items: [{
      item_id: 90,
      request_id: 9,
      category_code: "23456789",
      category_name: "기계부품",
      detail_category_code: "2345678901",
      detail_category_name: "모터",
      specification: "개",
      quantity: 60
    }, {
      item_id: 91,
      request_id: 9,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567891",
      detail_category_name: "케이블",
      specification: "개",
      quantity: 70
    }],
    response: {
      response_id: 9,
      request_id: 9,
      status: 3,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 9372170,
      proposal_file_url: "https://example.com/proposal/9.pdf",
      created_at: "2025-05-12 00:00:00",
      supplier_id: 209
    },
    response_items: [{
      response_item_id: 90,
      response_id: 9,
      item_id: 90,
      unit_price: 63440,
      delivery_days: 3
    }, {
      response_item_id: 91,
      response_id: 9,
      item_id: 91,
      unit_price: 79511,
      delivery_days: 14
    }],
    contract: {
      contract_id: 5,
      response_id: 9,
      buyer_company_id: 109,
      supplier_company_id: 209,
      buyer_user_id: 109,
      supplier_user_id: 209,
      status: 1,
      contract_file_url: 'https://example.com/contracts/5.pdf',
      tracking_number: 'TRK-1005',
      created_at: '2025-05-12 00:00:00',
      updated_at: '2025-05-12 00:00:00'
    }
  },
  {
    request: {
      request_id: 10,
      buyer_id: 110,
      supplier_id: 210,
      status: 2,
      detail: "드릴, 프린터 토너 구매 요청",
      due_date: "2025-05-18",
      created_at: "2025-05-11 00:00:00"
    },
    items: [{
      item_id: 100,
      request_id: 10,
      category_code: "45678901",
      category_name: "공구",
      detail_category_code: "4567890103",
      detail_category_name: "드릴",
      specification: "개",
      quantity: 22
    }, {
      item_id: 101,
      request_id: 10,
      category_code: "34567890",
      category_name: "사무용품",
      detail_category_code: "3456789002",
      detail_category_name: "프린터 토너",
      specification: "개",
      quantity: 79
    }],
  },
  {
    request: {
      request_id: 11,
      buyer_id: 111,
      supplier_id: 211,
      status: 3,
      detail: "드릴, 프린터 토너, 전원공급장치, 모터 구매 요청",
      due_date: "2025-05-30",
      created_at: "2025-05-12 00:00:00"
    },
    items: [{
      item_id: 110,
      request_id: 11,
      category_code: "45678901",
      category_name: "공구",
      detail_category_code: "4567890103",
      detail_category_name: "드릴",
      specification: "개",
      quantity: 46
    }, {
      item_id: 111,
      request_id: 11,
      category_code: "34567890",
      category_name: "사무용품",
      detail_category_code: "3456789002",
      detail_category_name: "프린터 토너",
      specification: "개",
      quantity: 26
    }, {
      item_id: 112,
      request_id: 11,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567892",
      detail_category_name: "전원공급장치",
      specification: "개",
      quantity: 74
    }, {
      item_id: 113,
      request_id: 11,
      category_code: "23456789",
      category_name: "기계부품",
      detail_category_code: "2345678901",
      detail_category_name: "모터",
      specification: "개",
      quantity: 93
    }],
    response: {
      response_id: 11,
      request_id: 11,
      status: 3,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 5708892,
      proposal_file_url: "https://example.com/proposal/11.pdf",
      created_at: "2025-05-14 00:00:00",
      supplier_id: 211
    },
    response_items: [{
      response_item_id: 110,
      response_id: 11,
      item_id: 110,
      unit_price: 13360,
      delivery_days: 8
    }, {
      response_item_id: 111,
      response_id: 11,
      item_id: 111,
      unit_price: 72979,
      delivery_days: 4
    }, {
      response_item_id: 112,
      response_id: 11,
      item_id: 112,
      unit_price: 17895,
      delivery_days: 10
    }, {
      response_item_id: 113,
      response_id: 11,
      item_id: 113,
      unit_price: 20136,
      delivery_days: 9
    }],
    contract: {
      contract_id: 4,
      response_id: 11,
      buyer_company_id: 111,
      supplier_company_id: 211,
      buyer_user_id: 111,
      supplier_user_id: 211,
      status: 1,
      contract_file_url: 'https://example.com/contracts/4.pdf',
      tracking_number: null,
      created_at: '2025-05-14 00:00:00',
      updated_at: '2025-05-14 00:00:00'
    },
  },
  {
    request: {
      request_id: 12,
      buyer_id: 112,
      supplier_id: 212,
      status: 4,
      detail: "드릴, 전원공급장치 구매 요청",
      due_date: "2025-05-25",
      created_at: "2025-05-13 00:00:00"
    },
    items: [{
      item_id: 120,
      request_id: 12,
      category_code: "45678901",
      category_name: "공구",
      detail_category_code: "4567890103",
      detail_category_name: "드릴",
      specification: "개",
      quantity: 32
    }, {
      item_id: 121,
      request_id: 12,
      category_code: "12345678",
      category_name: "전자부품",
      detail_category_code: "1234567892",
      detail_category_name: "전원공급장치",
      specification: "개",
      quantity: 29
    }],
    response: {
      response_id: 12,
      request_id: 12,
      status: 4,
      payment_terms: "계약금 30%, 납품 시 70%",
      warranty: "1년",
      special_terms: "지연 시 위약금 발생",
      total_price: 3756947,
      proposal_file_url: "https://example.com/proposal/12.pdf",
      created_at: "2025-05-15 00:00:00",
      supplier_id: 212
    },
    response_items: [{
      response_item_id: 120,
      response_id: 12,
      item_id: 120,
      unit_price: 86564,
      delivery_days: 12
    }, {
      response_item_id: 121,
      response_id: 12,
      item_id: 121,
      unit_price: 34031,
      delivery_days: 12
    }]
  }
];
