import * as Reactstrap from 'reactstrap';
import AvApi from '@availity/api-axios';
import loadable from '@loadable/component';
import AppIcon from '@availity/app-icon';
import Authorize from '@availity/authorize';
import Breadcrumbs from '@availity/breadcrumbs';
// import './index.scss';
import '@availity/mock';
import {
  Form,
  FormGroup,
  Input,
  Field,
  Feedback as FormFeedback,
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
} from '@availity/form';
import Select, { SelectField, ResourceSelect } from '@availity/select';
import {
  AvOrganizationSelect,
  AvRegionSelect,
} from '@availity/select/resources';
import Feedback, { FeedbackForm } from '@availity/feedback';
import Icon from '@availity/icon';
import AvLink from '@availity/link';
import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';
import Progress from '@availity/progress';
import Wizard, {
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
} from '@availity/step-wizard';
import TrainingLink from '@availity/training-link';
import { Disclaimer, Agreement } from '@availity/typography';
import * as yup from 'yup';
import moment from 'moment';
// import '@availity/favorites/style.scss';
import { avDate, dateRange } from '@availity/yup';
import { Phone, validatePhone } from '@availity/phone';
import MockData from '../MockData';

const scopes = {
  Wrapper: loadable(() => import('./Wrapper')),
  ...Reactstrap,
  AppIcon,
  Authorize,
  MockData,
  Avatar: loadable(() => import('@availity/avatar')),
  Breadcrumbs,
  Date: loadable(() => import('@availity/date')),
  DateField: loadable(() => import('@availity/date')),
  DateRangeField: loadable(() => import('@availity/date')),
  DateRange: loadable(() => import('@availity/date')),
  // DateField,
  // DateRange,
  // DateRangeField,
  Favorites: loadable.lib(() => import('@availity/favorites')),
  FormFeedback,
  Select,
  SelectField,
  ResourceSelect,
  AvOrganizationSelect,
  AvRegionSelect,
  PageHeader: loadable(() => import('@availity/page-header')),
  Feedback,
  FeedbackForm,
  Radio,
  RadioGroup,
  avCustomResource: new AvApi({ name: 'my-custom-resource' }),
  Checkbox,
  CheckboxGroup,
  Icon,
  AvLink,
  ListGroup,
  ListGroupItem,
  ListGroupItemStatus,
  Progress,
  Wizard,
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
  TrainingLink,
  Disclaimer,
  Agreement,
  Form,
  FormGroup,
  Input,
  Field,
  yup,
  avDate,
  dateRange,
  moment,
  Phone,
  validatePhone,
};

export default scopes;
