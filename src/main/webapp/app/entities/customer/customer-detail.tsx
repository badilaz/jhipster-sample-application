import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterSampleApplicationApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="jhipsterSampleApplicationApp.customer.name">Name</Translate>
            </span>
            <UncontrolledTooltip target="name">
              <Translate contentKey="jhipsterSampleApplicationApp.customer.help.name" />
            </UncontrolledTooltip>
          </dt>
          <dd>{customerEntity.name}</dd>
          <dt>
            <span id="piva">
              <Translate contentKey="jhipsterSampleApplicationApp.customer.piva">Piva</Translate>
            </span>
          </dt>
          <dd>{customerEntity.piva}</dd>
          <dt>
            <span id="codFisc">
              <Translate contentKey="jhipsterSampleApplicationApp.customer.codFisc">Cod Fisc</Translate>
            </span>
          </dt>
          <dd>{customerEntity.codFisc}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationApp.customer.location">Location</Translate>
          </dt>
          <dd>{customerEntity.location ? customerEntity.location.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
