export const ESTIMATE_REQUEST_STATUS = {
  1: { label: '미확인', badgeColor: 'secondary' },   // 회색
  2: { label: '승인대기', badgeColor: 'success'  },   // 초록색
  3: { label: '수정요청', button: true, badgeColor: 'warning'  },   // 확인/승인 버튼 노출, 노란색
  4: { label: '계약체결', badgeColor: 'primary' },    // 파란색
  5: { label: '계약미체결', badgeColor: 'danger' }        // 빨간색
}; 

export const ESTIMATE_RESPONSE_STATUS = {
    1: { label: '제안됨', badgeColor: 'success'  },   // 초록색
    2: { label: '역제안', button: true, badgeColor: 'warning'  },   // 확인/승인 버튼 노출, 노란색
    3: { label: '계약체결', badgeColor: 'primary' },    // 파란색
    4: { label: '계약미체결', badgeColor: 'danger' }        // 빨간색
  }; 