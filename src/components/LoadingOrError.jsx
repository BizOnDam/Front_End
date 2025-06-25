import { Container, Spinner, Card } from 'react-bootstrap';

const LoadingOrError = ({ loading, error }) => {
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

  return null;
};

export default LoadingOrError;
