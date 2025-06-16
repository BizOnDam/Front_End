import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Table, Badge, Button, Spinner } from 'react-bootstrap';
import processMatchingData from './ProcessMatchingPage';

const MatchingPage = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchingData, setMatchingData] = useState(null);

  useEffect(() => {
    const fetchMatchingData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recommend/${requestId}`);
        console.log('API Response:', response.data.data); // API 응답 데이터 확인
        
        // API 응답 데이터 구조 확인 및 변환
        const apiData = response.data.data;
        if (apiData) {
          // API 응답 데이터를 processMatchingData가 기대하는 형식으로 변환
          const formattedData = {
            summary: apiData.summary || "",
            commonSuppliers: apiData.commonSuppliers || [],
            perItemSuppliers: apiData.perItemSuppliers || {}
          };
          console.log('Formatted Data:', formattedData); // 변환된 데이터 확인
          setMatchingData(formattedData);
          setError(null);
        } else {
          setError('데이터가 없습니다.');
        }
      } catch (err) {
        console.error('매칭 데이터 조회 중 오류:', err);
        if (err.response) {
          // 서버가 응답을 반환한 경우
          console.error('Error response:', err.response.data);
          setError(err.response.data.message || '데이터를 불러오는 중 오류가 발생했습니다.');
        } else if (err.request) {
          // 요청이 전송되었지만 응답을 받지 못한 경우
          console.error('Error request:', err.request);
          setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
        } else {
          // 요청 설정 중 오류가 발생한 경우
          console.error('Error message:', err.message);
          setError('요청을 처리하는 중 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchMatchingData();
    } else {
      setError('요청 ID가 없습니다.');
      setLoading(false);
    }
  }, [requestId]);

  // 기업 선택 후 다음 페이지로
  const handleCompanySelect = async (companyName, businessNumber) => {
    try {
      const response = await axios.patch(`http://localhost:8083/api/estimates/${requestId}/assign-supplier`, 
      null,
      { params: { businessNumber: businessNumber } }
    );

      if (response.data.success) {
        alert(`${companyName}에 견적 요청이 발송되었습니다!`);
        navigate('/estimateList');
      }
    } catch (error) {
      console.error('견적 요청 발송 중 오류:', error);
      alert('견적 요청 발송 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">데이터를 불러오는 중입니다...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Card className="border-danger">
          <Card.Body>
            <h4 className="text-danger">오류 발생</h4>
            <p>{error}</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (!matchingData) {
    return null;
  }

  const { summary, companyDetails } = processMatchingData(matchingData);

  return (
    <Container className="py-4">
      {/* 메인 추천 섹션 */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="text-center">
          <h2 className="mb-3">추천 공급기업</h2>
          <p className="lead text-primary fw-bold">
            {summary}
          </p>
        </Card.Body>
      </Card>

      {/* 기업별 상세 정보 */}
      <Card className="shadow-sm">
        <Card.Header as="h5">기업별 상세 정보</Card.Header>
        <Card.Body>
          {companyDetails.map((company, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>{company.companyName}</h4>
                <Button
                  variant="primary"
                  onClick={() => handleCompanySelect(company.companyName, company.businessNumber)}
                >
                  선택하기
                </Button>
              </div>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>제품명</th>
                    <th>거래 횟수</th>
                    <th>리드타임 (일)</th>
                    <th>거래 수량</th>
                  </tr>
                </thead>
                <tbody>
                  {company.products.map((product, pIndex) => (
                    <tr key={pIndex}>
                      <td>{product.name}</td>
                      <td>{product.transactionCount}회</td>
                      <td>{product.leadTime}일</td>
                      <td>{product.matchedQuantity.toLocaleString()}개</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MatchingPage;
