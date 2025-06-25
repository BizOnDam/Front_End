import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Table, Button } from 'react-bootstrap';
import { useMatchingData } from '../../../hooks/matching/useMatchingData';
import { assignSupplier } from '../../../api/matchingApi';
import LoadingOrError from '../../../components/LoadingOrError';

const MatchingPage = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { matchingData, loading, error } = useMatchingData(requestId);

  // 기업 선택 후 다음 페이지로
  const handleCompanySelect = async (companyName, businessNumber) => {
    try {
      const response = await assignSupplier(requestId, businessNumber);

      if (response.success) {
        alert(`${companyName}에 견적 요청이 발송되었습니다!`);
        navigate('/estimateList');
      }
    } catch (error) {
      console.error('견적 요청 발송 중 오류:', error);
      alert('견적 요청 발송 중 오류가 발생했습니다.');
    }
  };

  const loadingOrError = <LoadingOrError loading={loading} error={error} />;
  if (loading || error) return loadingOrError;

  if (!matchingData) {
    return null;
  }

  const { summary, companyDetails } = matchingData;

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
