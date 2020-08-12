import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskUpdate = (props: ITaskUpdateProps) => {
  const [projectId, setProjectId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { taskEntity, projects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getProjects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...taskEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplicationApp.task.home.createOrEditLabel">
            <Translate contentKey="jhipsterSampleApplicationApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="task-name">
                  <Translate contentKey="jhipsterSampleApplicationApp.task.name">Name</Translate>
                </Label>
                <AvField id="task-name" type="text" name="name" />
                <UncontrolledTooltip target="nameLabel">
                  <Translate contentKey="jhipsterSampleApplicationApp.task.help.name" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="task-code">
                  <Translate contentKey="jhipsterSampleApplicationApp.task.code">Code</Translate>
                </Label>
                <AvField id="task-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="task-startDate">
                  <Translate contentKey="jhipsterSampleApplicationApp.task.startDate">Start Date</Translate>
                </Label>
                <AvField id="task-startDate" type="date" className="form-control" name="startDate" />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="task-endDate">
                  <Translate contentKey="jhipsterSampleApplicationApp.task.endDate">End Date</Translate>
                </Label>
                <AvField id="task-endDate" type="date" className="form-control" name="endDate" />
              </AvGroup>
              <AvGroup>
                <Label id="durationLabel" for="task-duration">
                  <Translate contentKey="jhipsterSampleApplicationApp.task.duration">Duration</Translate>
                </Label>
                <AvField id="task-duration" type="string" className="form-control" name="duration" />
              </AvGroup>
              <AvGroup>
                <Label for="task-project">
                  <Translate contentKey="jhipsterSampleApplicationApp.task.project">Project</Translate>
                </Label>
                <AvInput id="task-project" type="select" className="form-control" name="project.id">
                  <option value="" key="0" />
                  {projects
                    ? projects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/task" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  projects: storeState.project.entities,
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess,
});

const mapDispatchToProps = {
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpdate);
