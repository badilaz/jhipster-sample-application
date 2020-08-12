import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskDetail = (props: ITaskDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterSampleApplicationApp.task.detail.title">Task</Translate> [<b>{taskEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="jhipsterSampleApplicationApp.task.name">Name</Translate>
            </span>
            <UncontrolledTooltip target="name">
              <Translate contentKey="jhipsterSampleApplicationApp.task.help.name" />
            </UncontrolledTooltip>
          </dt>
          <dd>{taskEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="jhipsterSampleApplicationApp.task.code">Code</Translate>
            </span>
          </dt>
          <dd>{taskEntity.code}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="jhipsterSampleApplicationApp.task.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.startDate ? <TextFormat value={taskEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="jhipsterSampleApplicationApp.task.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.endDate ? <TextFormat value={taskEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="jhipsterSampleApplicationApp.task.duration">Duration</Translate>
            </span>
          </dt>
          <dd>{taskEntity.duration}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationApp.task.project">Project</Translate>
          </dt>
          <dd>{taskEntity.project ? taskEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
